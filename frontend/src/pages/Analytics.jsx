import { useEffect, useState } from "react";
import SeverityChart from "../components/SeverityChart";
import LoginChart from "../components/LoginChart";
import StatsCards from "../components/StatsCards";

function Analytics() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/logs");
      const data = await response.json();
      setLogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>📊 Security Analytics</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {/* 🔥 Stats Cards */}
          <StatsCards logs={logs} />

          {/* 🔥 Charts Section */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              flexWrap: "wrap"
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "300px",
                background: "#0f172a",
                padding: "20px",
                borderRadius: "10px"
              }}
            >
              <h3 style={{ color: "#38bdf8" }}>Severity Distribution</h3>
              <SeverityChart logs={logs} />
            </div>

            <div
              style={{
                flex: 1,
                minWidth: "300px",
                background: "#0f172a",
                padding: "20px",
                borderRadius: "10px"
              }}
            >
              <h3 style={{ color: "#38bdf8" }}>Login Attempts</h3>
              <LoginChart logs={logs} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;