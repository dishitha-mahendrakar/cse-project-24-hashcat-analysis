import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AttackCharts({ attackCounter }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/history").then((res) => {
      setData(
        res.data.map((h) => ({
          attack: h.attackType,
          time: Number(h.time),
        }))
      );
    });
  }, [attackCounter]);

  return (
    <div className="card">
      <h2>📊 ATTACK vs TIME</h2>

      <BarChart width={350} height={250} data={data}>
        <XAxis dataKey="attack" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="time" fill="#00ff9c" />
      </BarChart>
    </div>
  );
}
