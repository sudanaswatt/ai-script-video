import { getGlobalStyle } from "./styleEngine.js";
import { getDurationConfig } from "./durationEngine.js";

export function buildSystemPrompt(input) {

  const globalStyle = getGlobalStyle(input.style);
  const durationConfig = getDurationConfig(input.sceneCount);

  return `
Kamu adalah AI pembuat script video pendek untuk model AI seperti Veo/Kling.

WAJIB:
- Balas dalam JSON valid.
- Jangan gunakan markdown.
- Jangan tambahkan teks di luar JSON.
- Gunakan Bahasa Indonesia.
- Jangan jelaskan apapun.

ATURAN WAJIB:
1. Total durasi = ${durationConfig.total_duration} detik.
2. Jumlah scene = ${durationConfig.scene_count}.
3. Durasi per scene = ${durationConfig.duration_per_scene} detik.
4. Scene 1 selalu bertipe "hook".
5. Scene terakhir selalu bertipe "cta".
6. Scene tengah selalu bertipe "solusi".
7. Global style sudah ditentukan sistem dan TIDAK BOLEH diubah.
8. Karakter, outfit, dan lokasi HARUS sama di semua scene.
9. Voice over maksimal 12 kata.
10. Camera variation hanya boleh: close up, medium shot, wide shot.

GLOBAL STYLE (SUDAH DIKUNCI SISTEM):
Aspect Ratio: ${globalStyle.aspect_ratio}
Lighting: ${globalStyle.lighting}
Color Tone: ${globalStyle.color_tone}
Camera Style: ${globalStyle.camera_style}
Depth: ${globalStyle.depth}
Motion: ${globalStyle.motion}
Character Lock: ${globalStyle.character_lock}
Location Lock: ${globalStyle.location_lock}

DATA USER:
Nama Produk / Topik: ${input.product}
Keunggulan: ${input.advantage}
Target Audience: ${input.audience}
Objek Visual Utama: ${input.objectVisual}
Teks Overlay Aktif: ${input.overlayEnabled}

OUTPUT WAJIB FORMAT INI:

{
  "scene_count": ${durationConfig.scene_count},
  "duration_per_scene": ${durationConfig.duration_per_scene},
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

WAJIB:
- Generate tepat ${durationConfig.scene_count} scene.
- Nomor scene harus berurutan dari 1 sampai ${durationConfig.scene_count}.
- Jangan ubah global style.
- Jangan menambahkan properti lain.
`;
}
