// components/HashcatRunner.jsx
import api from "../services/api";

export default function HashcatRunner() {
  const runHashcat = async () => {
    await api.post("/run-hashcat");
    alert("Hashcat started on Kali Linux");
  };

  return (
    <div className="card">
      <h2>Run Hashcat</h2>
      <button onClick={runHashcat}>Start Attack</button>
    </div>
  );
}
