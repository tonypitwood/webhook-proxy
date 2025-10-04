const express = require("express");
const app = express();

// Middleware (optional, add if needed)
app.use(express.json());

// Define routes inline
app.post("/upload-test", async (req, res) => {
  console.log("✅ /upload-test route hit");
  res.status(200).json({ status: "upload-test received" });
});

app.post("/fallback", (req, res) => {
  console.log("✅ /fallback route hit");
  res.status(200).json({ status: "fallback received" });
});

app.get("/", (req, res) => {
  console.log("✅ / root route hit");
  res.send("Webhook proxy is live");
});

// 🔍 Log full router stack contents
if (app._router && app._router.stack) {
  console.log("🔍 Full router stack:");
  app._router.stack.forEach((layer, index) => {
    console.log(`Layer ${index}:`, {
      name: layer.name,
      path: layer.route?.path,
      methods: layer.route?.methods,
    });
  });
} else {
  console.log("⚠️ app._router.stack is not available.");
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook proxy running on port ${PORT}`);
});