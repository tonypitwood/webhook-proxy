const express = require("express");
const app = express();
app.use(express.json());

// 🔹 Define routes inline
app.post("/upload-test", async (req, res) => {
  res.status(200).json({ status: "upload-test received" });
});
console.log("✅ /upload-test route defined");

app.post("/fallback", (req, res) => {
  res.status(200).json({ status: "fallback received" });
});
console.log("✅ /fallback route defined");

app.get("/", (req, res) => {
  res.send("Webhook proxy is live");
});
console.log("✅ / root route defined");

// ✅ Log routes inside listen callback
app.listen(process.env.PORT || 3000, () => {
  console.log(`Webhook proxy running on port ${process.env.PORT || 3000}`);

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

  console.log("✅ Your service is live");
});