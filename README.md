// 🛡️🔐 Protected Information - DO NOT CHANGE!
const OWNER = {
  facebook: "https://www.facebook.com/share/1FbiVmnXet/",
  messenger: "https://m.me/RAJA.ViP.5X.09638357510",
  whatsapp: "https://wa.me/+8801715559179",
  ownerName: "RAJA CHOWDHURY"
};

// 🔍 Verify Owner Information
function verifyOwnerInfo() {
  const currentInfo = {
    facebook: "https://www.facebook.com/share/1FbiVmnXet/",
    messenger: "https://m.me/RAJA.ViP.5X.09638357510",
    whatsapp: "https://wa.me/+8801715559179",
    ownerName: "RAJA CHOWDHURY"
  };

  for (let key in OWNER) {
    if (OWNER[key] !== currentInfo[key]) {
      console.error(`❌ SECURITY ALERT: ${key} has been modified! Bot shutting down...`);
      process.exit(1); // ⛔ Stop bot if tampered
    }
  }
}

// 🔐 Run security check
verifyOwnerInfo();

// ✅ Continue if security passes
console.log("✅ OWNER VERIFIED: Starting RAJA-BOT...");

// 🌐 Create Express Server
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// 🖥️ Show Profile & Info on Homepage
app.get("/", (req, res) => {
  res.send(`
    <html>
    <head><title>RAJA-BOT</title></head>
    <body style="font-family: Arial, sans-serif; text-align: center; background: #f0f0f0;">
      <a href="${OWNER.messenger}" target="_blank">
        <img src="https://i.imgur.com/mhZbqG3.jpeg" width="100" style="border-radius: 50%; margin-top: 20px;" />
      </a>
      <h2>🔹 ${OWNER.ownerName}</h2>

      <p>
        <a href="${OWNER.facebook}" target="_blank">🌐 Facebook</a><br>
        <a href="${OWNER.messenger}" target="_blank">💬 Messenger</a><br>
        <a href="${OWNER.whatsapp}" target="_blank">📱 WhatsApp</a>
      </p>

      <img src="https://i.imgur.com/EkmNZ6I.jpeg" width="250" style="margin: 20px auto;" />

      <h3>🤖 RAJA-BOT is running securely!</h3>
      <p>❤️💛🤍💚💙💜❣️💟💘💌</p>

      <small>Editing by RAJA CHOWDHURY | RS RAJA BOT-PACK-007</small>
    </body>
    </html>
  `);
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`🚀 RAJA-BOT is running at: http://localhost:${port}`);
});

name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    # Step to check out the repository code
    - uses: actions/checkout@v2

    # Step to set up the specified Node.js version
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}

    # Step to install dependencies
    - name: Install dependencies
      run: npm install

    # Step to run the bot with the correct port
    - name: Start the bot
      env:
        PORT: 8080
      run: npm start
