import React from "react";
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

const LoginChart = ({ data }) => {

  const chartData = {
    labels: data.map(item => item.ip), // ✅ from analytics
    datasets: [
      {
        label: "Failed Login Attempts",
        data: data.map(item => item.count), // ✅ from analytics
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
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" },
      },
      y: {
        ticks: { color: "#ffffff" },
      },
    },
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Failed Login Analytics</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LoginChart;