require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔹 Define classify(), routes, formatMarkdownSummary()

// 🔹 Define all routes FIRST
app.post("/upload-test", async (req, res) => { /* ... */ });
app.post("/fallback", (req, res) => { /* ... */ });
app.get("/", (req, res) => {
  res.send("Webhook proxy is live");
});

// ✅ THEN start the server and log routes
app.listen(process.env.PORT || 3000, () => {
  console.log(`Webhook proxy running on port ${process.env.PORT || 3000}`);

  if (app._router && app._router.stack) {
    app._router.stack
      .filter(r => r.route)
      .forEach(r => {
        console.log(`🔔 Route registered: ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
      });
  } else {
    console.log("⚠️ Route stack not initialized.");
  }
});