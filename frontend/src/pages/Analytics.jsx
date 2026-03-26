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
      <div classname="section">
      <h1 className="page-title">📈 Analytics</h1>
      <p className="page-desc">
        Visual insights into system activity and security trends
      </p>

      <div className="chart-row">
        <SeverityChart data={data.severity} />
        <LoginChart data={data.failed_ips} />
      </div>
    </div>
    </div>
  );
}

export default Analytics;