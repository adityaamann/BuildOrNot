/**
 * Builds a structured prompt for the Gemini API that instructs it
 * to analyze a startup idea and return a strict JSON report.
 *
 * @param {string} idea  - The startup idea description
 * @param {string} industry - Optional industry/category
 * @returns {string} The complete prompt string
 */
function buildPrompt(idea, industry) {
  const industryContext = industry
    ? `The idea falls under the "${industry}" industry.`
    : "";

  return `
You are a world-class startup analyst and venture capital advisor.

A user has submitted the following startup idea for validation:

"""
${idea}
"""
${industryContext}

Analyze this idea thoroughly and return your analysis as a **valid JSON object** with EXACTLY this structure (no markdown, no code fences, just raw JSON):

{
  "ideaSummary": "A concise 1-2 sentence summary of the idea",
  "marketDemand": {
    "level": "low" | "medium" | "high",
    "reasoning": "2-3 sentences explaining why"
  },
  "competitors": [
    {
      "name": "Competitor name",
      "description": "What they do",
      "strength": "Their key strength",
      "weakness": "Their key weakness"
    }
  ],
  "targetAudience": {
    "primary": "Primary audience description",
    "secondary": "Secondary audience description",
    "demographics": "Age, location, income level, etc."
  },
  "monetization": [
    "Strategy 1 with brief explanation",
    "Strategy 2 with brief explanation",
    "Strategy 3 with brief explanation"
  ],
  "tamSamSom": {
    "tam": "Total Addressable Market estimate with explanation",
    "sam": "Serviceable Addressable Market estimate with explanation",
    "som": "Serviceable Obtainable Market estimate with explanation"
  },
  "risks": [
    "Risk 1 with brief explanation",
    "Risk 2 with brief explanation",
    "Risk 3 with brief explanation"
  ],
  "finalScore": {
    "score": 7,
    "summary": "2-3 sentence overall assessment explaining the score"
  }
}

IMPORTANT RULES:
- Return ONLY the JSON object, no other text.
- The "score" must be an integer from 1 to 10.
- The "level" must be exactly "low", "medium", or "high".
- Include 3-5 competitors (real ones if possible, otherwise realistic hypothetical ones).
- Include 3-5 monetization strategies.
- Include 3-5 risks.
- All text values should be informative and specific, not generic.
- Do NOT wrap the response in markdown code fences.
`.trim();
}

module.exports = { buildPrompt };
