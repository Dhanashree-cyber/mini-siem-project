import { useEffect, useState } from "react";

function LogsTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/logs")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);   // 🔥 ADD THIS LINE
        setLogs(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h2>Recent Logs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Source IP</th>
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.ip}</td>
              <td>Login Attempt</td>
              <td style={{ color: log.status === "FAILED" ? "red" : "green" }}>
                {log.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsTable;
