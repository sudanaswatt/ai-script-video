import { buildSystemPrompt } from "../lib/prompt.js";
import { getGlobalStyle } from "../lib/styleEngine.js";
import { getDurationConfig } from "../lib/durationEngine.js";
import { compileResult } from "../lib/compiler.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const input = req.body;

    const globalStyle = getGlobalStyle(input.style);
    const durationConfig = getDurationConfig(input.sceneCount);

    const systemPrompt = buildSystemPrompt(input);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt }
        ],
        temperature: 0.7
      })
    });

    const result = await response.json();

    const rawContent = result.choices?.[0]?.message?.content;

    if (!rawContent) {
      throw new Error("AI response kosong");
    }

    let aiResult;

    try {
      aiResult = JSON.parse(rawContent);
    } catch (err) {
      throw new Error("Gagal parse JSON dari AI");
    }

    const finalResult = compileResult(
      aiResult,
      globalStyle,
      durationConfig
    );

    return res.status(200).json(finalResult);

  } catch (error) {

    return res.status(500).json({
      error: "Server error",
      detail: error.message
    });

  }
}