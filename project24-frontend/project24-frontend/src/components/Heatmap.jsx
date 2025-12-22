import HeatMap from "react-heatmap-grid";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function AttackHeatmap({ attackCounter }) {
  const attackTypes = ["MD5", "SHA-1", "SHA-256", "NTLM"];
  const ruleLevels = ["Few Rules", "Medium Rules", "Many Rules"];
  const [data, setData] = useState([]);

  const countRules = (rules) => {
    const n = Object.values(rules || {}).filter(Boolean).length;
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    return 2;
  };

  useEffect(() => {
    api.get("/history").then((res) => {
      const matrix = attackTypes.map((atk) =>
        ruleLevels.map((_, idx) => {
          const rows = res.data.filter(
            (r) => r.attackType === atk && countRules(r.rules) === idx
          );

          if (!rows.length) return 0;

          return (
            rows.reduce((s, r) => s + Number(r.time), 0) / rows.length
          ).toFixed(2);
        })
      );

      setData(matrix);
    });
  }, [attackCounter]);

  return (
    <div className="card">
      <h2>🔥 RULE EFFECTIVENESS HEATMAP</h2>

      <HeatMap
        data={data}
        xLabels={ruleLevels}
        yLabels={attackTypes}
        cellRender={(v) => (v ? `${v}s` : "")}
        cellStyle={(bg, v) => ({
          background: `rgba(0,255,156,${v / 5})`,
          color: "#000",
          fontSize: "14px",
        })}
      />
    </div>
  );
}
