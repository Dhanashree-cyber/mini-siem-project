function LogsTable() {
  return (
    <div style={{ margin: "40px" }}>
      <h2 style={{ color: "#38bdf8" }}>Recent Logs</h2>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#1e293b" }}>
            <th>Timestamp</th>
            <th>Source IP</th>
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10:45:23</td>
            <td>192.168.1.10</td>
            <td>Login Attempt</td>
            <td style={{ color: "red" }}>Failed</td>
          </tr>
          <tr>
            <td>10:50:11</td>
            <td>192.168.1.15</td>
            <td>File Access</td>
            <td style={{ color: "green" }}>Success</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LogsTable;
