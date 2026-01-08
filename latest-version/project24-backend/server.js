// ================================
// Project 24 - Backend API (Kali)
// ================================

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// 1. Hash Generator
// -------------------------------
app.post("/generate-hash", (req, res) => {

  const fs = require("fs");
  const crypto = require("crypto");

  const password = req.body.password;
  if (!password) {
    return res.status(400).json({ error: "Password cannot be empty" });
  }

  const hash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // 🔴 THIS IS THE MISSING PART
  fs.writeFileSync("hashes.txt", hash + "\n");

  res.json({ hash });
});


// -------------------------------
// 2. Rule File Generator
// -------------------------------
app.post("/save-rules", (req, res) => {
  let rules = ":\n"; // identity rule

  const meta = {};

  if (req.body.capitalize) {
    rules += "c\n";
    meta.capitalize = true;
  }

  if (req.body.lowercase) {
    rules += "l\n";
    meta.lowercase = true;
  }

  if (req.body.appendDigits) {
    rules += "$1\n$2\n$3\n";
    meta.appendDigits = true;
  }

  if (req.body.prependDigits) {
    rules += "^1\n^2\n^3\n";
    meta.prependDigits = true;
  }

  if (req.body.appendYear) {
    rules += "$2$0$2$4\n"; // append 2024
    meta.appendYear = true;
  }

  if (req.body.leetspeak) {
    rules += "sa@\nse3\nsi1\nso0\n";
    meta.leetspeak = true;
  }

  if (req.body.reverse) {
    rules += "r\n";
    meta.reverse = true;
  }

  if (req.body.duplicate) {
    rules += "d\n";
    meta.duplicate = true;
  }

  if (req.body.toggleCase) {
    rules += "t\n";
    meta.toggleCase = true;
  }

  fs.writeFileSync("rules.rule", rules);
  fs.writeFileSync("rules.json", JSON.stringify(meta, null, 2));

  res.json({ message: "Enhanced rules saved" });
});



// -------------------------------
// 3. Run Hashcat
// -------------------------------
app.post("/run-hashcat", (req, res) => {
  console.log("[+] /run-hashcat called");

  const { attackType } = req.body;

  // Map attack → hashcat mode
  const attackModes = {
    "MD5": 0,
    "SHA-1": 100,
    "SHA-256": 1400,
    "NTLM": 1000
  };

  const mode = attackModes[attackType] ?? 1400;

  const startTime = Date.now();

  const cmd = `
    hashcat -m ${mode} hashes.txt wordlist.txt \
    -r rules.rule \
    --outfile=result.txt \
    --potfile-disable \
    --force
  `;

  exec(cmd, (error, stdout, stderr) => {
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    fs.writeFileSync("time.txt", timeTaken);

    // 🔑 READ RULE METADATA
    const rulesMeta = fs.existsSync("rules.json")
      ? JSON.parse(fs.readFileSync("rules.json", "utf-8"))
      : {};

    const ruleCount = Object.values(rulesMeta).filter(Boolean).length;

    // store attack history
    const history = fs.existsSync("history.json")
      ? JSON.parse(fs.readFileSync("history.json", "utf-8"))
      : [];

    history.push({
      attackType,
      mode,
      time: Number(timeTaken),
      ruleCount,               // ✅ THIS FIXES HEATMAP
      timestamp: new Date().toISOString()
    });

    fs.writeFileSync("history.json", JSON.stringify(history, null, 2));

    res.json({
      message: `Attack ${attackType} completed`,
      attackType,
      ruleCount,
      time: timeTaken
    });
  });
});





// -------------------------------
// 4. Fetch Results
// -------------------------------
app.get("/results", (req, res) => {
  if (!fs.existsSync("result.txt")) return res.json([]);

  const time = fs.readFileSync("time.txt", "utf-8");

  const rules = fs.existsSync("rules.json")
    ? JSON.parse(fs.readFileSync("rules.json"))
    : {};

  const history = fs.existsSync("history.json")
    ? JSON.parse(fs.readFileSync("history.json"))
    : [];

  const lastAttack = history[history.length - 1] || {};

  const results = fs.readFileSync("result.txt", "utf-8")
    .split("\n")
    .filter(Boolean)
    .map(line => {
      const [hash, password] = line.split(":");
      return {
        hash,
        password,
        time,
        rules,
        attackType: lastAttack.attackType
      };
    });

  res.json(results);
});




// -------------------------------
app.listen(5000, "0.0.0.0", () => {
  console.log("Backend API running on port 5000");
});


