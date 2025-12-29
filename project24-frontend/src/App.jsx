//import { useState } from "react";
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/NavBar";
import Explanation from "./components/Explanation";
import HashGenerator from "./components/HashGenerator";
import RuleDesigner from "./components/RuleDesigner";
import HashcatRunner from "./components/HashcatRunner";
import ResultsViewer from "./components/ResultsViewer";
import MatrixBackground from "./components/MatrixBackground";
import AttackSelector from "./components/AttackSelector"; // ✅ NEW
import AttackCharts from "./components/AttackCharts"; // ✅ NEW

export default function App() {
  const [attackCounter, setAttackCounter] = useState(0);
  const [attackType, setAttackType] = useState("SHA-256"); // ✅ NEW
  useEffect(() => {
  fetch("/api/health")
    .then(r => r.json())
    .then(data => console.log("Backend health:", data))
    .catch(err => console.error("Backend not reachable:", err));
}, []);

  return (
    <div>
      <MatrixBackground />
      <div className="app-layout">
        <div className="dashboard" id="dashboard">
          <div className="header">
            <h1>⚠ CYBER PASSWORD ANALYSIS LAB</h1>
            <span>AUTHORIZED · EDUCATIONAL · CONTROLLED ENVIRONMENT</span>
          </div>

          <div className="grid">
            <div className="panel" id="hash">
              <HashGenerator />
            </div>

            <div className="panel" id="rules">
              <RuleDesigner />
            </div>

            {/* 🔥 NEW PANEL */}
            <div className="panel" id="attack">
              <AttackSelector
                attackType={attackType}
                setAttackType={setAttackType}
              />
            </div>

            <div className="panel" id="engine">
              <HashcatRunner
                attackType={attackType}
                onAttackComplete={() => setAttackCounter((c) => c + 1)}
              />
            </div>

            <div className="panel" id="results">
              <ResultsViewer attackCounter={attackCounter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
