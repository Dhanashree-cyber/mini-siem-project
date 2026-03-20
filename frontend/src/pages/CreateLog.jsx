import React, { useState } from "react";

function CreateLog() {

  const [ip, setIp] = useState("");
  const [event, setEvent] = useState("Login Attempt");
  const [status, setStatus] = useState("FAILED");

  const generateLog = async () => {

    const logData = { ip, event, status };

    await fetch("http://127.0.0.1:5000/add-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });

    alert("Log Generated!");
    setIp("");
  };

  return (

    <div className="dashboard-container">

      <div className="header">
        <h1>Security Monitoring System</h1>
        <h2 className="page-subtitle">Create Logs</h2>
      </div>

      <div className="page-container">

        <div className="log-card">

          <div className="form-group">
            <label>Source IP</label>
            <input
              type="text"
              placeholder="Enter Source IP"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Event</label>
            <select onChange={(e) => setEvent(e.target.value)}>
              <option>Login Attempt</option>
              <option>File Access</option>
              <option>System Change</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option>FAILED</option>
              <option>SUCCESS</option>
            </select>
          </div>

          <button className="log-btn" onClick={generateLog}>
            Generate Log
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateLog;