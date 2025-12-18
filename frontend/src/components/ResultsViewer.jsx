// components/ResultsViewer.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function ResultsViewer() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results").then(res => setResults(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Cracking Results</h2>
      <table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>Password</th>
            <th>Time (sec)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i}>
              <td>{r.hash}</td>
              <td>{r.password}</td>
              <td>{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
