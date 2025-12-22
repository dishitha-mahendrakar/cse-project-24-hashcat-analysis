import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function RuleHeatmap({ data }) {
  return (
    <div className="card">
      <h2>Rule Effectiveness</h2>
      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="rule" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>
    </div>
  );
}
