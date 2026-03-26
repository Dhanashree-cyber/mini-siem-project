import sqlite3

# connect both DBs
source_conn = sqlite3.connect('../linux-monitoring/linux_siem.db')
target_conn = sqlite3.connect('siem.db')

source_cursor = source_conn.cursor()
target_cursor = target_conn.cursor()

# fetch logs
source_cursor.execute("SELECT * FROM logs")
rows = source_cursor.fetchall()

# insert into new logs table
for row in rows:
    target_cursor.execute(
        "INSERT INTO logs (timestamp, log_level, message, source) VALUES (?, ?, ?, ?)",
        (row[1], row[2], row[3], "linux")
    )

target_conn.commit()

print("✅ Logs merged successfully!")