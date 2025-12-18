// components/RuleDesigner.jsx
import { useState } from "react";

export default function RuleDesigner({ onSave }) {
  const [rules, setRules] = useState({
    appendDigits: true,
    leetspeak: false,
    capitalize: true,
  });

  return (
    <div className="card">
      <h2>Rule Designer</h2>

      <label>
        <input type="checkbox"
          onChange={(e) => setRules({ ...rules, appendDigits: e.target.checked })}
        />
        Append Digits (1–99)
      </label>

      <label>
        <input type="checkbox"
          onChange={(e) => setRules({ ...rules, leetspeak: e.target.checked })}
        />
        Leetspeak Substitution
      </label>

      <label>
        <input type="checkbox"
          onChange={(e) => setRules({ ...rules, capitalize: e.target.checked })}
        />
        Capitalize First Letter
      </label>

      <button onClick={() => onSave(rules)}>Save Rules</button>
    </div>
  );
}
