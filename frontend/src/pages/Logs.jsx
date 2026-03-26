import { useEffect, useState } from "react";

function Logs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await fetch("http://127.0.0.1:5000/logs");
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="page-title">📄 Logs</h1>
      <p className="page-desc">
        View all collected system logs in real-time
      </p>
      <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead style={{ background: "#0f172a", color: "white" }}>
          <tr>
            <th>ID</th>
            <th>IP</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.ip}</td>
              <td style={{ color: log.status === "failed" ? "red" : "green" }}>
                {log.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Logs;