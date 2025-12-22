import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/results").then((res) => {
      const chartData = res.data.map((r, i) => ({
        name: `Test ${i + 1}`,
        time: Number(r.time),
      }));
      setData(chartData);
    });
  }, []);

  return (
    <div className="card">
      <h2>📊 Cracking Time Comparison</h2>

      <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="time" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
