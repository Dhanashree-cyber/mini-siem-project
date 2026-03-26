import { useState } from "react";

function Simulator() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const simulateAttack = () => {
    setLoading(true);
    setMessage("");

    fetch("http://127.0.0.1:5000/simulate", {
      method: "POST"
    })
      .then(res => res.json())
      .then(() => {
        setMessage("🔥 Attack Simulated Successfully!");
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Error simulating attack");
        setLoading(false);
      });
  };

  return (
    <div className="section">
    <div className="page-container">
      <h1 className="page-title">🔥 Attack Simulator</h1>
      <p className="page-desc">
       Generate simulated cyber attacks to test system detection
      </p>
    
      {/* Button Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <button
          onClick={simulateAttack}
          disabled={loading}
          style={{
            padding: "15px 40px",
            fontSize: "18px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          {loading ? "Simulating..." : "🔥 Simulate Attack"}
        </button>

        {message && (
          <p style={{ marginTop: "20px", fontSize: "18px" }}>
            {message}
          </p>
        )}
      </div>

      {/* Theory Section */}
      <div className="table-card" style={{ marginBottom: "40px" }}>
        <h2>📘 What is Attack Simulation?</h2>
        <p style={{ lineHeight: "1.8", color: "#e2e8f0" }}>
          Attack simulation is a cybersecurity technique used to generate
          artificial threats in a controlled environment. It helps in testing
          how effectively a SIEM system detects, analyzes, and responds to
          malicious activities.
        </p>

        <ul style={{ marginTop: "20px", lineHeight: "1.8" }}>
          <li>⚡ Simulates real-world cyber attacks</li>
          <li>🛡️ Tests detection and alert mechanisms</li>
          <li>📊 Helps improve monitoring accuracy</li>
        </ul>
      </div>

      {/* Attack Types */}
      <div className="info-cards">

        <div className="info-card">
          <h3>Brute Force Attack</h3>
          <p>Repeated login attempts using different passwords.</p>
        </div>

        <div className="info-card">
          <h3>DDoS Attack</h3>
          <p>Flooding system with massive traffic to crash it.</p>
        </div>

        <div className="info-card">
          <h3>Suspicious Login</h3>
          <p>Login attempts from unusual IP addresses.</p>
        </div>

        <div className="info-card">
          <h3>Privilege Abuse</h3>
          <p>Unauthorized access to sensitive resources.</p>
        </div>

      </div>

    </div>
    </div>
  );
}

export default Simulator;