require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// 🔹 Define classify(), routes, formatMarkdownSummary()

// 🔹 Define /upload-test
app.post("/upload-test", async (req, res) => {
  // your routing logic
});

// 🔹 Define /fallback
app.post("/fallback", (req, res) => {
  // fallback handler
});

// 🔹 Define root route
app.get("/", (req, res) => {
  res.send("Webhook proxy is live");
});

// ✅ Route logger — must come *after* all routes
app._router.stack
  .filter(r => r.route)
  .forEach(r => {
    console.log(`🔔 Route registered: ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
  });

// ✅ Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Webhook proxy running on port ${process.env.PORT || 3000}`);
});