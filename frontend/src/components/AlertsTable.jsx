import React, { useEffect, useState } from "react";

const AlertsTable = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/alerts")
      .then(res => res.json())
      .then(data => setAlerts(data))
      .catch(err => console.error("Error fetching alerts:", err));
  }, []);

  return (
    <div className="alerts-section">
      <h2>Security Alerts</h2>
      <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Source IP</th>
      <th>Failed Attempts</th>
      <th>Severity</th>
    </tr>
  </thead>

  <tbody>
    {alerts.map(alert => (
      <tr key={alert.id}>
        <td>{alert.id}</td>
        <td>{alert.ip}</td>
        <td>{alert.attempts}</td>
        <td>
          <span className={`severity ${alert.severity.toLowerCase()}`}>
          {alert.severity}
          </span>
        </td>
      </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default AlertsTable;
