import re
import requests
import time

LOG_FILE = "sample_logs.txt"
API_URL = "http://127.0.0.1:5000/logs"   # ✅ FIXED

last_position = 0


def process_logs():
    global last_position

    with open(LOG_FILE, "r") as file:
        file.seek(last_position)

        for line in file:

            # Extract IP
            match = re.search(r'from (\d+\.\d+\.\d+\.\d+)', line)

            if match:
                ip = match.group(1)

                # 🔥 Detect status
                if "Failed password" in line:
                    status = "FAILED"
                elif "Accepted password" in line:
                    status = "SUCCESS"
                else:
                    continue   # skip unknown logs

                data = {
                    "message": "SSH Login Attempt",
                    "ip": ip,
                    "status": status
                }

                try:
                    response = requests.post(API_URL, json=data)
                    print(f"Sent log: {ip} → {status}, Response: {response.status_code}")
                except Exception as e:
                    print("Error:", e)

        last_position = file.tell()

if __name__ == "__main__":
    while True:
        process_logs()
        time.sleep(5)