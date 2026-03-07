import React from "react";

function Dashboard() {
  return (
    <div className="dashboard-home">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="main-heading">Security Monitoring System</h1>
        <div className="table-card" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px" }}>
          <h2>What is a SIEM System?</h2>
          <p>
            Security Information and Event Management (SIEM) is a cybersecurity
            solution that collects, analyzes, and monitors security events from
            various sources in real time. It acts as the "brain" of your security operations.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "#38bdf8" }}>Key Features</h2>
      <div className="info-cards">
        <div className="info-card">
          <h3>Log Collection</h3>
          <p>Aggregating data from multiple systems into a single source of truth.</p>
        </div>
        <div className="info-card">
          <h3>Real-time Monitoring</h3>
          <p>Continuous oversight of network traffic and user behavior.</p>
        </div>
        <div className="info-card">
          <h3>Threat Detection</h3>
          <p>Instant alerting based on suspicious patterns and severity levels.</p>
        </div>
        <div className="info-card">
          <h3>Analytics</h3>
          <p>Deep dive into security trends through visual charts and reporting.</p>
        </div>
      </div>

      {/* Project Scope Section */}
      <div className="table-row" style={{ marginTop: "60px" }}>
        <div className="chart-card" style={{ textAlign: "left" }}>
          <h2 style={{ color: "#00f5d4" }}>Project Overview</h2>
          <p style={{ color: "#e2e8f0", lineHeight: "1.8" }}>
            This Mini SIEM Project demonstrates a full security pipeline:
          </p>
          <ul style={{ color: "#f1f5f9", listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>🛡️ <strong>Collection:</strong> Ingesting system logs.</li>
            <li style={{ marginBottom: "10px" }}>⚠️ <strong>Alerting:</strong> Categorizing risks (Low to Critical).</li>
            <li style={{ marginBottom: "10px" }}>📊 <strong>Visualization:</strong> Interactive dashboards for rapid response.</li>
          </ul>
        </div>
        
        {/* Placeholder for a future visual or graphic */}
        <div className="chart-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(56, 189, 248, 0.05)" }}>
          <div style={{ fontSize: "60px" }}>🚀</div>
          <p style={{ marginLeft: "20px", fontSize: "20px" }}>System Ready & Secured</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;