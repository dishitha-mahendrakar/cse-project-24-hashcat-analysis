// components/HashGenerator.jsx
import { useState } from "react";
import api from "../services/api";

export default function HashGenerator() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");

  const generateHash = async () => {
    const res = await api.post("/generate-hash", { password });
    setHash(res.data.hash);
  };

  return (
    <div className="card">
      <h2>Hash Generator</h2>
      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={generateHash}>Generate Hash</button>
      <p><b>Generated Hash:</b> {hash}</p>
    </div>
  );
}
