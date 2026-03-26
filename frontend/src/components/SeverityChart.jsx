import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const COLORS = ["#ff4d4d", "#ffa500", "#00c49f"]; 
// HIGH = red, MEDIUM = orange, LOW = green

function SeverityChart({ data }) {
  return (
    <div className="chart-card" style={{ textAlign: "center" }}>
      <h3>Severity Distribution</h3>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="severity"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default SeverityChart;