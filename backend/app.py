import re
import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE = "siem.db"


# -------------------------
# Function to initialize DB
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
        ip TEXT,
        attempts INTEGER,
        severity TEXT
    )
    """)

    conn.commit()
    conn.close()


# -------------------------
# Endpoint: /logs
# -------------------------
@app.route("/logs", methods=["GET"])
def get_logs():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM logs")
    rows = cursor.fetchall()

    conn.close()

    logs = []
    for row in rows:
        logs.append({
            "id": row[0],
            "ip": row[1],
            "status": row[2]
        })

    return jsonify(logs)


# -------------------------
# Endpoint: /alerts
# -------------------------
@app.route("/alerts", methods=["GET"])
def get_alerts():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM alerts")
    rows = cursor.fetchall()

    conn.close()

    alerts = []
    for row in rows:
        alerts.append({
            "id": row[0],
            "ip": row[1],
            "attempts": row[2],
            "severity": row[3]
        })

    return jsonify(alerts)


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
