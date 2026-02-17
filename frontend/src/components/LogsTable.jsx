import { useEffect, useState } from "react";

function LogsTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/logs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLogs(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Recent Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Source IP</th>
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.time}</td>
              <td>{log.ip}</td>
              <td>{log.event}</td>
              <td style={{ color: log.status === "Failed" ? "red" : "green" }}>
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
