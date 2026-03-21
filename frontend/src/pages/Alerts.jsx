import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await fetch("http://127.0.0.1:5000/alerts");
    const data = await res.json();
    setAlerts(data);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      
      {/* 🔥 Heading */}
      <h1 style={{ 
        fontSize: "32px", 
        marginBottom: "20px", 
        color: "#ef4444" 
      }}>
        🚨 Security Alerts
      </h1>

      {/* 🔥 Alerts List */}
      {alerts.length === 0 ? (
        <p style={{ fontSize: "18px" }}>No alerts detected</p>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              background: "#1f2937",
              borderLeft: "6px solid red",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              fontSize: "18px",
              color: "#f9fafb",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {alert.message}
            </div>

            <div style={{ marginTop: "5px", color: "#f87171" }}>
              Severity: {alert.severity}
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Alerts;