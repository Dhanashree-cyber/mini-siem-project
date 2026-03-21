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
    <div style={{ padding: "30px" }}>
      
      {/* 🔥 Heading like Dashboard */}
      <h1 style={{ 
        fontSize: "32px", 
        marginBottom: "20px", 
        color: "#38bdf8" 
      }}>
        📄 System Logs
      </h1>

      {/* 🔥 Table */}
      <table 
        style={{ 
          width: "100%", 
          borderCollapse: "collapse",
          fontSize: "18px"
        }}
      >
        <thead>
          <tr style={{ background: "#0f172a", color: "white" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>IP Address</th>
            <th style={{ padding: "12px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id} style={{ textAlign: "center" }}>
              <td style={{ padding: "10px" }}>{log.id}</td>
              <td style={{ padding: "10px" }}>{log.ip}</td>

              <td
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  color: log.status.toLowerCase() === "failed" ? "red" : "limegreen"
                }}
              >
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