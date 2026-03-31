const express = require("express");
const { analyzeWithGroq } = require("../services/groq");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * POST /api/analyze
 *
 * Request body:
 *   { "idea": string, "industry": string (optional) }
 *
 * Response:
 *   200 — Full JSON analysis report
 *   400 — Missing or invalid input
 *   500 — AI API error or internal failure
 */
router.post("/", protect, async (req, res) => {
  try {
    const { idea, industry } = req.body;

    // ── Input validation ──────────────────────────────────────────
    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return res.status(400).json({
        error: "Please provide a startup idea to analyze.",
      });
    }

    if (idea.trim().length < 10) {
      return res.status(400).json({
        error:
          "Your idea is too short. Please describe it in at least 10 characters.",
      });
    }

    if (idea.trim().length > 2000) {
      return res.status(400).json({
        error:
          "Your idea is too long. Please keep it under 2000 characters.",
      });
    }

    // ── Call Groq API ─────────────────────────────────────────────
    const report = await analyzeWithGroq(idea.trim(), industry?.trim() || "");

    return res.json({ success: true, data: report });
  } catch (error) {
    console.error("❌ /api/analyze error:", error.message);

    const statusCode = error.message.includes("API key") ? 503 : 500;

    return res.status(statusCode).json({
      success: false,
      error:
        error.message ||
        "Something went wrong while analyzing your idea. Please try again.",
    });
  }
});

module.exports = router;
