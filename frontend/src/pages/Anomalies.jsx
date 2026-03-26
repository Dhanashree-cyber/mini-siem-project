import { useEffect, useState } from "react";

function Anomalies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/anomalies")
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // 🔥 auto refresh
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Anomalies...</h2>;
  }

  return (
    <div className="section">
  {/* Your cards / tables / charts */}
    <div className="page-container">
      <h1 className="page-title">⚠️ Anomalies</h1>
      <p className="page-desc">
        Detected abnormal behavior and high-risk activities
      </p>
      
      {data.length === 0 ? (
        <p style={{ textAlign: "center" }}>No anomalies detected</p>
      ) : (
        <div className="table-card">
          <table style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>IP Address</th>
                <th>Status</th>
                <th>Risk Level</th>
              </tr>
            </thead>

            <tbody>
              {data.map((a, i) => (
                <tr key={i}>
                  <td>{a.ip}</td>
                  <td>{a.status}</td>
                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {a.risk_level}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
    </div>
  );
}

export default Anomalies;