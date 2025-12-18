// backend/server.js
const express = require("express");
const { exec } = require("child_process");
const crypto = require("crypto");
const app = express();

app.use(express.json());

app.post("/generate-hash", (req, res) => {
  const hash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  res.json({ hash });
});

app.post("/run-hashcat", (req, res) => {
  exec("hashcat -m 1400 hashes.txt wordlist.txt -r rules.rule --outfile=result.txt",
    () => res.json({ status: "Hashcat running" })
  );
});

app.get("/results", (req, res) => {
  // parse result.txt
  res.json([
    { hash: "abc...", password: "password123", time: 12 }
  ]);
});

app.listen(5000, () => console.log("Backend running on Kali"));
