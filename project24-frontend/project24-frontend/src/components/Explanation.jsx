export default function Explanation() {
  return (
    <section className="explain-section" id="flow">
      <h2>🧠 What Is Happening in This Lab?</h2>

      <p>
        This laboratory simulates a controlled password cracking environment
        using Hashcat. Each module represents a real-world stage in a password
        attack pipeline.
      </p>

      <ul>
        <li>
          <b>Hash Generator:</b> Converts user passwords into cryptographic
          hashes to simulate stored credentials.
        </li>
        <li>
          <b>Rule Designer:</b> Applies mutation rules to expand the attack
          search space.
        </li>
        <li>
          <b>Attack Engine:</b> Executes Hashcat using selected hash algorithms
          and rules.
        </li>
        <li>
          <b>Results Terminal:</b> Displays cracked passwords and execution
          details.
        </li>
        <li>
          <b>Analytics:</b> Visualizes attack performance using graphs and
          heatmaps.
        </li>
      </ul>

      <p className="explain-note">
        ⚠ All passwords used are synthetic and this system is intended strictly
        for educational and defensive analysis.
      </p>
    </section>
  );
}
