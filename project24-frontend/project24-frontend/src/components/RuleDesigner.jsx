import { useState } from "react";
import api from "../services/api";

export default function RuleDesigner() {
  const [rules, setRules] = useState({
    capitalize: false,
    lowercase: false,
    appendDigits: false,
    prependDigits: false,
    appendYear: false,
    leetspeak: false,
    reverse: false,
    duplicate: false,
    toggleCase: false,
  });

  const toggle = (key) => setRules({ ...rules, [key]: !rules[key] });

  const saveRules = async () => {
    await api.post("/save-rules", rules);
    alert("Rules saved on Kali Linux");
  };

  return (
    <div className="card">
      <h2>🧩 RULE DESIGNER</h2>

      {Object.keys(rules).map((r) => (
        <label key={r} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={rules[r]}
            onChange={() => toggle(r)}
          />{" "}
          {r}
        </label>
      ))}

      <button onClick={saveRules}>Save Rules</button>
    </div>
  );
}
