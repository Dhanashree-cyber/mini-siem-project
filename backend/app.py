import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
from ml_model import predict_attack

app = Flask(__name__)
CORS(app)

DATABASE = "siem.db"


# -------------------------
# Init DB
# -------------------------
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT,
        status TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT UNIQUE,
        attempts INTEGER,
        severity TEXT
        )
    """)

    conn.commit()
    conn.close()


# -------------------------
# ADD LOG
# -------------------------
@app.route("/add-log", methods=["POST"])
def add_log():
    data = request.json
    ip = data.get("ip")
    status = data.get("status")

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    # Insert log
    cursor.execute(
        "INSERT INTO logs (ip, status) VALUES (?, ?)",
        (ip, status)
    )

    # Count failed attempts
    cursor.execute(
        "SELECT COUNT(*) FROM logs WHERE ip=? AND status='FAILED'",
        (ip,)
    )

    attempts = cursor.fetchone()[0]

    prediction = predict_attack(attempts)

    print(f"IP: {ip}, Attempts: {attempts}, Prediction: {prediction}")

    if attempts >= 5:
        severity = "HIGH"

        cursor.execute("""
        INSERT OR REPLACE INTO alerts (ip, attempts, severity)
        VALUES (?, ?, ?)
        """, (ip, attempts, severity))

    conn.commit()
    conn.close()

    return jsonify({"message": "Log added successfully"})

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
        {"id": r[0], "ip": r[1], "status": r[2]}
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
        {"id": r[0], "ip": r[1], "attempts": r[2], "severity": r[3]}
        for r in rows
    ])


if __name__ == "__main__":
    init_db()
    app.run(debug=True)