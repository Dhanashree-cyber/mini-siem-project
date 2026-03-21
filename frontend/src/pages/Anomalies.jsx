import { useEffect, useState } from "react";

function Anomalies() {
  const [anomalies, setAnomalies] = useState([]);

  const fetchAnomalies = async () => {
    const res = await fetch("http://127.0.0.1:5000/anomalies");
    const data = await res.json();
    setAnomalies(data);
  };

  useEffect(() => {
    fetchAnomalies();
    const interval = setInterval(fetchAnomalies, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      
      {/* 🔥 Heading */}
      <h1 style={{ 
        fontSize: "32px", 
        marginBottom: "20px", 
        color: "#f59e0b" 
      }}>
        ⚠️ Detected Anomalies
      </h1>

      {/* 🔥 Anomaly Cards */}
      {anomalies.length === 0 ? (
        <p style={{ fontSize: "18px" }}>No anomalies detected</p>
      ) : (
        anomalies.map((a) => (
          <div
            key={a.id}
            style={{
              background: "#1f2937",
              borderLeft: "6px solid orange",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              fontSize: "18px",
              color: "#f9fafb",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            <div><strong>IP:</strong> {a.ip}</div>
            <div><strong>Status:</strong> {a.status}</div>
            <div style={{ color: "#fbbf24", marginTop: "5px" }}>
              Risk Level: {a.risk_level}
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Anomalies;