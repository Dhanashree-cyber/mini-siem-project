import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SeverityChart = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/alerts")
      .then(res => res.json())
      .then(data => setAlerts(data));
  }, []);

  const severityCount = alerts.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(severityCount),
    datasets: [
      {
        data: Object.values(severityCount),
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px", width: "400px" }}>
      <h2>Severity Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export default SeverityChart;
