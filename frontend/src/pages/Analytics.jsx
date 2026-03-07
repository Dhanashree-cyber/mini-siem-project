import { useEffect, useState } from "react";
import SeverityChart from "../components/SeverityChart";
import LoginChart from "../components/LoginChart";
import StatsCards from "../components/StatsCards";

function Analytics() {
  const [logs, setLogs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/logs");
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Real-time refresh every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Security Analytics</h1>

      {/* Summary Cards */}
      <StatsCards logs={logs} />

      {/* Charts Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div style={{ flex: 1 }}>
          <SeverityChart logs={logs} />
        </div>

        <div style={{ flex: 1 }}>
          <LoginChart logs={logs} />
        </div>
      </div>
    </div>
  );
}

export default Analytics;