import { buildSystemPrompt } from "../lib/prompt.js";
import { getGlobalStyle } from "../lib/styleEngine.js";
import { compileResult } from "../lib/compiler.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const input = req.body;

    const globalStyle = getGlobalStyle(input.style);
    const systemPrompt = buildSystemPrompt(input);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: systemPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("OpenRouter API error");
    }

    const result = await response.json();

    let rawContent = result.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("AI response kosong");
    }

    rawContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiResult = JSON.parse(rawContent);

    const finalResult = compileResult(
      aiResult,
      globalStyle,
      input
    );

    return res.status(200).json(finalResult);

  } catch (error) {

    return res.status(500).json({
      error: "Server error",
      detail: error.message
    });

  }
}