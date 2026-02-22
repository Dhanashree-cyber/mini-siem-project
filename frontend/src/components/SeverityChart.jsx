import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SeverityChart = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) =>
        console.error("Error fetching alerts:", err)
      );
  }, []);

  // Count severity
  const severityCount = alerts.reduce((acc, alert) => {
    const level = alert.severity?.toUpperCase();
    if (!level) return acc;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(severityCount);
  const values = Object.values(severityCount);

  const severityColors = {
    HIGH: "#e74c3c",
    MEDIUM: "#f1c40f",
    LOW: "#2ecc71",
  };

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map(
          (label) => severityColors[label] || "#888"
        ),
        borderWidth: 2,
        borderColor: "#12243c",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.raw} alerts`,
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <h2 style={{ marginBottom: "20px" }}>
        Severity Distribution
      </h2>

      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default SeverityChart;