const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buildPrompt } = require("../utils/promptBuilder");

// Initialize the Gemini client (done once at module load)
let genAI;
let model;

function initializeGemini() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here") {
    throw new Error(
      "GEMINI_API_KEY is not set. Get a free key at https://aistudio.google.com/apikey and add it to server/.env"
    );
  }

  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });

  console.log("✅ Gemini API initialized (model: gemini-2.0-flash)");
}

/**
 * Sends the startup idea to Gemini and returns a parsed JSON report.
 *
 * @param {string} idea     - The startup idea description
 * @param {string} industry - Optional industry/category
 * @returns {Promise<object>} Parsed analysis report
 */
async function analyzeIdea(idea, industry) {
  if (!model) {
    initializeGemini();
  }

  const prompt = buildPrompt(idea, industry);

  console.log(`🔍 Analyzing idea: "${idea.substring(0, 60)}..."`);

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Parse the JSON response — Gemini may sometimes wrap it in code fences
  const parsed = parseGeminiResponse(text);

  // Validate the required fields exist
  validateReport(parsed);

  console.log(`✅ Analysis complete — Score: ${parsed.finalScore.score}/10`);

  return parsed;
}

/**
 * Safely parses the Gemini response text into JSON.
 * Handles cases where the response may be wrapped in markdown code fences.
 */
function parseGeminiResponse(text) {
  // Remove markdown code fences if present
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
    console.error("❌ Failed to parse Gemini response as JSON:");
    console.error("Raw response:", text.substring(0, 500));
    throw new Error(
      "The AI returned an invalid response. Please try again."
    );
  }
}

/**
 * Validates that the parsed report contains all required fields.
 * Throws an error if critical fields are missing.
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

  // Ensure score is a valid number between 1-10
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

module.exports = { analyzeIdea, initializeGemini };
