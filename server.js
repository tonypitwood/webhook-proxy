const express = require("express");
const app = express();
app.use(express.json());

// 🔹 Define routes inline
app.post("/upload-test", async (req, res) => {
  res.status(200).json({ status: "upload-test received" });
});

app.post("/fallback", (req, res) => {
  res.status(200).json({ status: "fallback received" });
});

app.get("/", (req, res) => {
  res.send("Webhook proxy is live");
});

// ✅ Log routes inside listen callback
app.listen(process.env.PORT || 3000, () => {
  console.log(`Webhook proxy running on port ${process.env.PORT || 3000}`);

  if (app._router && app._router.stack) {
    const routes = app._router.stack.filter(r => r.route);
    console.log(`🔍 Router stack length: ${routes.length}`);
    routes.forEach(r => {
      console.log(`🔔 Route registered: ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
    });
  } else {
    console.log("⚠️ Route stack not initialized.");
  }
});