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

    # Alerts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        severity TEXT
    )
    """)

    # Anomalies table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS anomalies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT,
        status TEXT,
        risk_level TEXT
    )
    """)

    conn.commit()
    conn.close()


# -------------------------
# ADD LOG (MAIN LOGIC)
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

        # Insert anomaly
        cursor.execute(
            "INSERT INTO anomalies (ip, status, risk_level) VALUES (?, ?, ?)",
            (data["ip"], data["status"], "HIGH")
        )

        # Insert alert
        cursor.execute(
            "INSERT INTO alerts (message, severity) VALUES (?, ?)",
            (f"Failed login from {data['ip']}", "HIGH")
        )

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

    cursor.execute("SELECT * FROM logs")
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
            "id": r[0],
            "message": r[1],
            "severity": r[2]
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
            "id": r[0],
            "ip": r[1],
            "status": r[2],
            "risk_level": r[3]
        }
        for r in rows
    ])


# -------------------------
# RUN APP
# -------------------------
if __name__ == "__main__":
    init_db()
    app.run(debug=True)