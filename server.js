require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

function classify(payload) {
  const msg = (payload.message || "").toLowerCase();
  if (msg.includes("alert")) return "alert";
  if (msg.includes("error") || msg.includes("exception")) return "error";
  if (payload.email || msg.includes("lead")) return "lead";
  return "unknown";
}

const routes = {
  alert: "https://httpbin.org/post",
  lead: "https://httpbin.org/post",
  error: "https://httpbin.org/post",
  unknown: "https://fallback-endpoint.example.com"
};

function formatMarkdownSummary({ classification, routedTo, downstreamStatus }) {
  return `**Classification:** ${classification}\n**Routed To:** ${routedTo}\n**Downstream Status:** ${downstreamStatus}`;
}

app.post("/upload-test", async (req, res) => {
  const payload = req.body;
  const type = classify(payload);
  const destination = routes[type];

  try {
    const response = await axios.post(destination, payload, {
      headers: { "Content-Type": "application/json" }
    });

    const markdown = formatMarkdownSummary({
      classification: type,
      routedTo: destination,
      downstreamStatus: response.status
    });

    res.status(200).json({
      status: "success",
      classification: type,
      routedTo: destination,
      downstreamStatus: response.status,
      markdownSummary: markdown
    });
  } catch (err) {
    console.error("❌ Downstream error:", err.message);

    res.status(500).json({
      status: "error",
      message: "Failed to route payload",
      error: err.message
    });
  }
});

app.listen(3000, () => {
  console.log("Webhook proxy running on port 3000");
});
