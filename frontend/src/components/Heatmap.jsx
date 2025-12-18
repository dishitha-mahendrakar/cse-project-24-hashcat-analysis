// components/Heatmap.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Heatmap({ data }) {
  return (
    <div className="card">
      <h2>Password Pattern Vulnerability</h2>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="pattern" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="successRate" />
      </BarChart>
    </div>
  );
}
