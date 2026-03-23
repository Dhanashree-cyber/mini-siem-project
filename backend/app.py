import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = "siem.db"


# -------------------------
# Init DB
# -------------------------
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Logs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        ip TEXT,
        status TEXT
    )
    """)

    # Alerts table (NO duplicates per IP)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT UNIQUE,
        message TEXT,
        severity TEXT
    )
    """)

    # Anomalies table (NO duplicates per IP)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS anomalies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT UNIQUE,
        status TEXT,
        risk_level TEXT
    )
    """)

    conn.commit()
    conn.close()


# -------------------------
# ADD LOG
# -------------------------
@app.route("/logs", methods=["POST"])
def add_log():
    data = request.json

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Insert log
    cursor.execute(
        "INSERT INTO logs (message, ip, status) VALUES (?, ?, ?)",
        (data["message"], data["ip"], data["status"])
    )

    # 🚨 ANOMALY DETECTION
    if "fail" in data["status"].lower():

        print("⚠️ Anomaly Detected from IP:", data["ip"])

        # Insert/Update anomaly
        cursor.execute("""
        INSERT OR REPLACE INTO anomalies (ip, status, risk_level)
        VALUES (?, ?, ?)
        """, (data["ip"], data["status"], "HIGH"))

        # Insert/Update alert
        cursor.execute("""
        INSERT OR REPLACE INTO alerts (ip, message, severity)
        VALUES (?, ?, ?)
        """, (data["ip"], f"Failed login from {data['ip']}", "HIGH"))

    conn.commit()
    conn.close()

    return jsonify({"status": "log processed"})


# -------------------------
# GET LOGS
# -------------------------
@app.route("/logs", methods=["GET"])
def get_logs():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM logs ORDER BY id ASC")
    rows = cursor.fetchall()

    conn.close()

    return jsonify([
        {
            "id": r[0],
            "message": r[1],
            "ip": r[2],
            "status": r[3]
        }
        for r in rows
    ])


# -------------------------
# GET ALERTS
# -------------------------
@app.route("/alerts", methods=["GET"])
def get_alerts():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM alerts")
    rows = cursor.fetchall()

    conn.close()

    return jsonify([
        {
            "ip": r[1],
            "message": r[2],
            "severity": r[3]
        }
        for r in rows
    ])


# -------------------------
# GET ANOMALIES
# -------------------------
@app.route("/anomalies", methods=["GET"])
def get_anomalies():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM anomalies")
    rows = cursor.fetchall()

    conn.close()

    return jsonify([
        {
            "ip": r[1],
            "status": r[2],
            "risk_level": r[3]
        }
        for r in rows
    ])


@app.route("/analytics", methods=["GET"])
def get_analytics():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # 📊 Severity (Alerts)
    cursor.execute("""
    SELECT severity, COUNT(*) FROM alerts GROUP BY severity
    """)
    severity_data = cursor.fetchall()

    # 📊 Failed logins per IP
    cursor.execute("""
    SELECT ip, COUNT(*) FROM logs 
    WHERE status LIKE '%FAIL%' 
    GROUP BY ip
    """)
    failed_ip_data = cursor.fetchall()

    # 📊 Success vs Failed
    cursor.execute("SELECT COUNT(*) FROM logs WHERE status='FAILED'")
    failed = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM logs WHERE status='SUCCESS'")
    success = cursor.fetchone()[0]

    conn.close()

    return jsonify({
        "severity": [
            {"severity": r[0], "count": r[1]} for r in severity_data
        ],
        "failed_ips": [
            {"ip": r[0], "count": r[1]} for r in failed_ip_data
        ],
        "status": [
            {"name": "Failed", "value": failed},
            {"name": "Success", "value": success}
        ]
    })
# -------------------------
# RUN APP
# -------------------------
if __name__ == "__main__":
    init_db()
    app.run(debug=True)