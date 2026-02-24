import { buildSystemPrompt } from "../lib/prompt.js";
import { getGlobalStyle } from "../lib/styleEngine.js";
import { compileResult } from "../lib/compiler.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const input = req.body;

    if (!input) {
      return res.status(400).json({ error: "No input provided" });
    }

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
      const errText = await response.text();
      throw new Error("OpenRouter API error: " + errText);
    }

    const result = await response.json();

    let rawContent = result?.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("AI response kosong");
    }

    // Bersihkan markdown kalau ada
    rawContent = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiResult;

    try {
      aiResult = JSON.parse(rawContent);
    } catch (err) {
      console.error("RAW AI RESPONSE:", rawContent);
      throw new Error("Gagal parse JSON dari AI");
    }

    const finalResult = compileResult(
      aiResult,
      globalStyle,
      input
    );

    return res.status(200).json(finalResult);

  } catch (error) {

    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      error: "Server error",
      detail: error.message
    });

  }
}