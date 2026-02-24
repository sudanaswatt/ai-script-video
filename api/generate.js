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

    // ==========================
    // DUMMY AI RESPONSE DINAMIS
    // ==========================

    const aiResult = {
      scene_count: durationConfig.scene_count,
      scenes: Array.from(
        { length: durationConfig.scene_count },
        (_, i) => ({
          scene_number: i + 1,
          type:
            i === 0
              ? "hook"
              : i === durationConfig.scene_count - 1
              ? "cta"
              : "solusi",
          camera_variation:
            i === 0
              ? "close up"
              : i === durationConfig.scene_count - 1
              ? "medium shot"
              : "wide shot",
          visual_action: "Karakter melakukan aksi sesuai produk",
          voice_over: "Contoh voice over singkat.",
          text_overlay: input.overlayEnabled
            ? "Contoh overlay"
            : ""
        })
      )
    };

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
