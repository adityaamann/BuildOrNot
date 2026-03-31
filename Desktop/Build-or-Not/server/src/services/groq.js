const axios = require("axios");
const { buildPrompt } = require("../utils/promptBuilder");

/**
 * Analyzes a startup idea using the Groq API (LLaMA / Mixtral models).
 *
 * @param {string} idea     - The startup idea description
 * @param {string} industry - Optional industry/category
 * @returns {Promise<object>} Parsed analysis report
 */
async function analyzeWithGroq(idea, industry) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    throw new Error(
      "GROQ_API_KEY is not set. Get a free key at https://console.groq.com/keys and add it to server/.env"
    );
  }

  const prompt = buildPrompt(idea, industry);

  console.log(`🔍 [Groq] Analyzing idea: "${idea.substring(0, 60)}..."`);

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a world-class startup analyst. Always respond with valid JSON only, no markdown fences or extra text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: "json_object" },
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  const text = response.data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response.");
  }

  const parsed = parseGroqResponse(text);
  validateReport(parsed);

  console.log(`✅ [Groq] Analysis complete — Score: ${parsed.finalScore.score}/10`);

  return parsed;
}

/**
 * Safely parses the Groq response text into JSON.
 */
function parseGroqResponse(text) {
  let cleaned = text.trim();

  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }

  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Failed to parse Groq response as JSON:");
    console.error("Raw response:", text.substring(0, 500));
    throw new Error("The AI returned an invalid response. Please try again.");
  }
}

/**
 * Validates that the parsed report contains all required fields.
 */
function validateReport(report) {
  const requiredFields = [
    "ideaSummary",
    "marketDemand",
    "competitors",
    "targetAudience",
    "monetization",
    "tamSamSom",
    "risks",
    "finalScore",
  ];

  const missing = requiredFields.filter((field) => !report[field]);

  if (missing.length > 0) {
    throw new Error(
      `AI response is missing required fields: ${missing.join(", ")}`
    );
  }

  if (
    typeof report.finalScore.score !== "number" ||
    report.finalScore.score < 1 ||
    report.finalScore.score > 10
  ) {
    report.finalScore.score = Math.min(
      10,
      Math.max(1, Math.round(Number(report.finalScore.score) || 5))
    );
  }
}

module.exports = { analyzeWithGroq };