import { PieChart, Pie, Tooltip, Legend } from "recharts";

function SeverityChart({ data }) {
  return (
    <div className="chart-card">
      <h3>Severity Distribution</h3>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="severity"
          outerRadius={100}
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default SeverityChart;