# Mini SIEM Project

## 📌 About the Project
This is a mini project based on **SIEM (Security Information and Event Management)**.  
The main idea is to understand how security systems collect logs, detect suspicious activities, and show insights using a dashboard.

In this project, I built a simple system that:
- collects logs
- detects failed login attempts
- generates alerts
- identifies anomalies
- shows everything in a dashboard

---

## 🚀 Features

- 📄 Log Collection  
  Stores logs with IP address, message, and status

- 🚨 Alerts  
  Creates alerts when multiple failed logins are detected

- ⚠️ Anomalies  
  Detects suspicious activity and marks it as high risk

- 📊 Dashboard  
  Shows total logs, failed logins, alerts, and anomalies

- 📈 Analytics  
  Displays charts for better understanding of data

- 🔥 Attack Simulator  
  Generates fake attacks to test the system

---

## 🛠️ Tech Used

Frontend:
- React (Vite)

Backend:
- Flask (Python)

Database:
- SQLite

Charts:
- Recharts

---

## 🔄 How It Works
Logs are added to the system
If login fails → alert is created
Repeated failures → anomaly detected
Data is shown in dashboard and charts
Simulator helps test attack scenarios

---

## 📚 What I Learned
Basics of SIEM systems
How logs are processed
Detecting suspicious activity
Connecting frontend with backend
Working with APIs and databases

## 🔧 Future Improvements
Add login system
Improve anomaly detection using ML
Deploy project online
Real-time updates using sockets

## 👩‍💻 Author
Dhanashree |
MCA [Specialization: Cyber Security and Ethical Hacking] |
Interested in Cybersecurity

## ▶️ How to Run

### Backend
```bash
cd backend
python app.py
