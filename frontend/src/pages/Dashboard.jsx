import React, { useEffect, useState } from "react";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const l = await fetch("http://127.0.0.1:5000/logs").then(res => res.json());
      const a = await fetch("http://127.0.0.1:5000/alerts").then(res => res.json());
      const an = await fetch("http://127.0.0.1:5000/anomalies").then(res => res.json());

      setLogs(l);
      setAlerts(a);
      setAnomalies(an);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Calculate failed logs
  const failedLogs = logs.filter(log =>
    log.status.toLowerCase().includes("fail")
  ).length;

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard-home">

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-heading">Security Monitoring System</h1>

        <div className="table-card" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px" }}>
          <h2>What is a SIEM System?</h2>
          <p>
            Security Information and Event Management (SIEM) collects and analyzes
            logs in real time to detect suspicious activity and improve system security.
          </p>
        </div>
      </section>

      {/* 🔥 LIVE STATS */}
      <div className="info-cards" style={{ marginTop: "40px" }}>

        <div className="info-card">
          <h3>Total Logs</h3>
          <p style={{ fontSize: "26px" }}>{logs.length}</p>
        </div>

        <div className="info-card">
          <h3>Failed Logins</h3>
          <p style={{ fontSize: "26px", color: "#f87171" }}>{failedLogs}</p>
        </div>

        <div className="info-card">
          <h3>Alerts</h3>
          <p style={{ fontSize: "26px", color: "red" }}>{alerts.length}</p>
        </div>

        <div className="info-card">
          <h3>Anomalies</h3>
          <p style={{ fontSize: "26px", color: "orange" }}>{anomalies.length}</p>
        </div>

      </div>

      {/* Features */}
      <h2 style={{ fontSize: "32px", margin: "40px 0 20px", color: "#38bdf8" }}>
        Key Features
      </h2>

      <div className="info-cards">
        <div className="info-card">
          <h3>Log Collection</h3>
          <p>Collects logs from multiple sources into one place.</p>
        </div>

        <div className="info-card">
          <h3>Real-time Monitoring</h3>
          <p>Updates automatically every few seconds.</p>
        </div>

        <div className="info-card">
          <h3>Threat Detection</h3>
          <p>Detects failed logins and suspicious activities.</p>
        </div>

        <div className="info-card">
          <h3>Analytics</h3>
          <p>Visual insights using charts and dashboards.</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="table-row" style={{ marginTop: "60px" }}>

        <div className="chart-card">
          <h2 style={{ color: "#00f5d4" }}>Project Overview</h2>

          <ul style={{ color: "#f1f5f9", listStyle: "none", padding: 0 }}>
            <li>🛡️ Log Collection from systems</li>
            <li>⚠️ Alert generation on suspicious activity</li>
            <li>📊 Real-time dashboard visualization</li>
          </ul>
        </div>

        <div className="chart-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "60px" }}>🚀</div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;