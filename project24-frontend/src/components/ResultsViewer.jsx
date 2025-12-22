import { useEffect, useState } from "react";
import TerminalTyping from "./TerminalTyping";
import api from "../services/api";

export default function ResultsViewer({ attackCounter }) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    api.get("/results").then((res) => {
      if (!res.data.length) {
        setOutput("[+] No hashes cracked\n");
        return;
      }

      const r = res.data[res.data.length - 1];

      const rules =
        Object.entries(r.rules || {})
          .filter(([_, v]) => v)
          .map(([k]) => k)
          .join(", ") || "none";

      setOutput(`
[+] Hashcat v6.2.6
[*] Attack Type: ${r.attackType}
[*] Rules: ${rules}
[✓] PASSWORD FOUND!
Plaintext: ${r.password}
Time: ${r.time}s
[+] Session complete
`);
    });
  }, [attackCounter]);

  return (
    <div className="terminal-box">
      <TerminalTyping text={output} speed={25} />
    </div>
  );
}
