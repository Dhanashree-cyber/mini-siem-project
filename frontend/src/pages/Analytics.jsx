import { useEffect, useState } from "react";
import axios from "axios";
import SeverityChart from "../components/SeverityChart";
import LoginChart from "../components/LoginChart";

function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/analytics")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>📊 Security Analytics</h2>

      <div className="chart-row">
        <SeverityChart data={data.severity || []} />
        <LoginChart data={data.failed_ips || []} />
      </div>
    </div>
  );
}

export default Analytics;