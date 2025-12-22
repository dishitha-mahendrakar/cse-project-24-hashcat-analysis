export default function AttackSelector({ attackType, setAttackType }) {
  return (
    <div className="card">
      <h2>🧪 Attack Type</h2>

      <select
        value={attackType}
        onChange={(e) => setAttackType(e.target.value)}
      >
        <option value="SHA-256">SHA-256 (Dictionary + Rules)</option>
        <option value="MD5">MD5 (Fast Dictionary Attack)</option>
        <option value="SHA-1">SHA-1 (Legacy Hash Attack)</option>
        <option value="NTLM">NTLM (Windows Hash Attack)</option>
      </select>
    </div>
  );
}
