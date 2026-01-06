import { ShieldAlert, Zap } from "lucide-react";

export default function AttackSelector({ attackType, setAttackType }) {
  const attacks = [
    {
      id: "SHA-256",
      name: "Brute Force (SHA-256)",
      desc: "Exhaustive key search.",
    },
    {
      id: "MD5",
      name: "Rainbow Table (MD5)",
      desc: "Pre-computed hash chain lookup.",
    },
    {
      id: "Hybrid",
      name: "Hybrid Attack",
      desc: "Dictionary + Rules mutation.",
    },
  ];

  return (
    <div
      className="glass-panel"
      style={{ padding: "30px", marginBottom: "30px" }}
    >
      <div className="panel-header">
        <div
          className="feature-icon"
          style={{ width: "40px", height: "40px", marginBottom: 0 }}
        >
          <ShieldAlert size={20} />
        </div>
        <div>
          <h2 className="panel-title">Attack Configuration</h2>
          <p className="panel-desc">Select attack vector and algorithm</p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {attacks.map((attack) => {
          const isActive = attackType === attack.id;
          return (
            <div
              key={attack.id}
              onClick={() => setAttackType(attack.id)}
              style={{
                padding: "16px",
                borderRadius: "12px",
                border: isActive
                  ? "1px solid #ff0055"
                  : "1px solid transparent",
                background: isActive
                  ? "rgba(255, 0, 85, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: isActive ? "#ff0055" : "#ccc",
                  }}
                >
                  {attack.name}
                </span>
                {isActive && <Zap size={14} color="#ff0055" />}
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#888",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {attack.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
