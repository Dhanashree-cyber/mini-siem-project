import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LoginChart = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

// Aggregate attempts per IP
const aggregatedData = alerts.reduce((acc, alert) => {
  if (!acc[alert.ip]) {
    acc[alert.ip] = 0;
  }
  acc[alert.ip] += alert.attempts;
  return acc;
}, {});

const data = {
  labels: Object.keys(aggregatedData),
  datasets: [
    {
      label: "Total Failed Login Attempts",
      data: Object.values(aggregatedData),
      backgroundColor: "#ff3b3b",
      borderColor: "#ffffff",
      borderWidth: 2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#ffffff",   // Legend text white
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#ffffff",   // X-axis labels white
        font: {
          size: 13,
          weight: "bold",
        },
      },
      grid: {
        color: "rgba(255,255,255,0.15)", // Light grid lines
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#ffffff",   // Y-axis numbers white
        font: {
          size: 13,
          weight: "bold",
        },
      },
      grid: {
        color: "rgba(255,255,255,0.15)",
      },
    },
  },
};

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Failed Login Analytics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default LoginChart;
