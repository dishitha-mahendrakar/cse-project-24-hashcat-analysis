import api from "../services/api";

export default function HashcatRunner({ attackType, onAttackComplete }) {
  const runAttack = async () => {
    try {
      await api.post("/run-hashcat", { attackType });
      onAttackComplete();
      alert("Attack completed");
    } catch {
      alert("Hashcat failed");
    }
  };

  return (
    <div className="card">
      <h2>⚙ HASHCAT ENGINE</h2>
      <p>Selected Attack: {attackType}</p>
      <button onClick={runAttack}>Start Attack</button>
    </div>
  );
}
