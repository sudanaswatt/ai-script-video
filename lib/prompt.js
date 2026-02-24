import { getGlobalStyle } from "./styleEngine.js";
import { getDurationConfig } from "./durationEngine.js";

export function buildSystemPrompt(input) {

  const globalStyle = getGlobalStyle(input.style);
  const durationConfig = getDurationConfig(input.sceneCount);

  return `
Kamu adalah AI pembuat script video pendek.

WAJIB:
- Balas hanya JSON valid.
- Jangan gunakan markdown.
- Jangan jelaskan apapun.

ATURAN:
1. Total durasi = ${durationConfig.total_duration} detik.
2. Jumlah scene = ${durationConfig.scene_count}.
3. Scene 1 = hook.
4. Scene terakhir = cta.
5. Scene tengah = solusi.
6. Karakter, outfit, lokasi HARUS SAMA di semua scene.
7. Voice over maksimal 12 kata.

GLOBAL STYLE (TIDAK BOLEH DIUBAH):
Aspect Ratio: ${globalStyle.aspect_ratio}
Lighting: ${globalStyle.lighting}
Color Tone: ${globalStyle.color_tone}
Camera Style: ${globalStyle.camera_style}

DATA USER:
Produk: ${input.product}
Keunggulan: ${input.advantage}
Target: ${input.audience}
Objek Visual: ${input.objectVisual}

FORMAT OUTPUT:

{
  "global_context": {
    "character": "",
    "outfit": "",
    "location": "",
    "time_of_day": "",
    "mood": ""
  },
  "scene_count": ${durationConfig.scene_count},
  "scenes": [
    {
      "scene_number": 1,
      "type": "hook",
      "camera_variation": "",
      "visual_action": "",
      "voice_over": "",
      "text_overlay": ""
    }
  ]
}

WAJIB generate tepat ${durationConfig.scene_count} scene.
`;
}