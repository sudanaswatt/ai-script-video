export function compileResult(aiResult, globalStyle, input) {

  const scenes = aiResult.scenes || [];
  const audience = input.audience;

  /* ==============================
     CHARACTER DNA MAP (LOCKED)
  ============================== */

  const characterDNA = {
    "Pria Remaja": `
- A 17-year-old Indonesian teenage boy
- Medium brown skin
- Short slightly messy black hair
- Fresh youthful face
- Energetic natural expression
- Casual trendy teenage outfit
`,
    "Wanita Remaja": `
- A 17-year-old Indonesian teenage girl
- Light brown skin
- Long straight black hair
- Soft youthful facial features
- Cheerful natural smile
- Trendy casual teenage outfit
`,
    "Ibu Rumah Tangga": `
- A 32-year-old Indonesian woman
- Warm light brown skin
- Shoulder-length straight black hair
- Gentle oval face
- Warm caring smile
- Comfortable modest home outfit
`,
    "Pria Dewasa": `
- A 35-year-old Indonesian man
- Light brown skin
- Short neatly styled black hair
- Clean-shaven face
- Confident mature expression
- Smart casual outfit
`,
    "Orang Tua": `
- A 60-year-old Indonesian person
- Natural aged skin texture
- Short slightly graying hair
- Calm wise facial expression
- Comfortable modest clothing
`,
    "Anak Anak": `
- A 7-year-old Indonesian child
- Smooth light brown skin
- Short natural black hair
- Bright playful expression
- Comfortable colorful casual clothing
`
  };

  const dna = characterDNA[audience] || characterDNA["Pria Dewasa"];

  /* ==============================
     GLOBAL IMAGE PROMPT
  ============================== */

  const imagePrompt = `
Create a cinematic portrait advertising image (9:16 vertical).
Vertical orientation only.
Camera upright. No tilt. No rotation.
Horizon level.

Character (MUST remain identical across all video scenes):
${dna}

The character is naturally interacting with the product:
"${input.product}"

Environment (LOCKED LOCATION):
${input.objectVisual}

The environment must remain EXACTLY the same in all future video prompts.
Do not change background structure, room layout, lighting direction, or overall setting.

Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}

The product must be clearly visible and not cropped.
Framing must be vertical and centered.
Realistic photography style only.
No fantasy, no artificial background.

This image will be used as the master reference for all video scenes.
`.trim();

  /* ==============================
     VIDEO PROMPT ENGINE (PRO)
  ============================== */

  const prompts = scenes.map((scene) => {

    const safeVoice = scene.voice_over || "Produk ini benar-benar nyaman digunakan setiap hari.";

    let framingInstruction = "";

    if (scene.type === "hook") {
      framingInstruction = `
Close-up framing.
Focus on facial emotion.
Subtle eye movement.
Engaging expression.
`;
    } else if (scene.type === "solusi") {
      framingInstruction = `
Medium shot.
Product clearly visible.
Confident posture.
Natural hand gesture.
`;
    } else if (scene.type === "cta") {
      framingInstruction = `
Medium to slightly wider shot.
Strong eye contact.
Confident persuasive body language.
Product clearly visible.
`;
    }

    const veoPrompt = `
Create a 6-second portrait video (9:16).
Vertical orientation only.
Camera upright.
No tilt.
No rotation.
Horizon perfectly level.
No camera shake.

Use the uploaded reference image as the master reference.
Do NOT change character face, outfit, lighting, or environment.

Visual Style:
Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}
Camera style: ${globalStyle.camera_style}
Depth: ${globalStyle.depth}
Motion: ${globalStyle.motion}

Scene direction (6 seconds):
${framingInstruction}
Action: ${scene.visual_action}

The character speaks directly to camera in Bahasa Indonesia.
Clear natural lip sync.
8–12 words maximum.
Natural conversational speed (approx 2–3 words per second).
Emotion must match scene type.

Dialogue:
"${safeVoice}"

Audio rules:
- Clear natural dialogue only.
- No subtitles.
- No on-screen text.
- No background music.
- No dramatic sound effects.
- Subtle natural ambient room sound only.
- No echo.

Micro movement rules:
- Natural blinking.
- Subtle breathing.
- Slight natural body weight shift.
- No exaggerated motion.
`.trim();

    return {
      prompt_number: scene.scene_number,
      veo_prompt: veoPrompt
    };
  });

  return {
    image_prompt: imagePrompt,
    prompt_count: prompts.length,
    prompts: prompts
  };
}