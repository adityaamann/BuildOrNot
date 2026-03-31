const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const analyzeRoute = require("./routes/analyze");
const { protect } = require("./middleware/authMiddleware");
const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", authRoute);
app.use("/api/analyze", analyzeRoute);

app.get("/api/auth/me", protect, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
