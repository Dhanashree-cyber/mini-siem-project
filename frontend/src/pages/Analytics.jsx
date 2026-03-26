import { useEffect, useState } from "react";
import SeverityChart from "../components/SeverityChart";
import LoginChart from "../components/LoginChart";

function Analytics() {
  const [data, setData] = useState({
    severity: [],
    failed_ips: [],
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/analytics")
      .then(res => res.json())
      .then(result => {
        setData(result); // ✅ store full response
      });
  }, []);

  return (
    <div>
      <h2>📊 Security Analytics</h2>

      <div className="chart-row">
        <SeverityChart data={data.severity} />
        <LoginChart data={data.failed_ips} />
      </div>
    </div>
  );
}

export default Analytics;