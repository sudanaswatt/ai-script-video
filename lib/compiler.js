export function compileResult(aiResult, globalStyle, input) {

  const scenes = aiResult.scenes || [];
  const audience = input.audience;

  /* ==============================
     CHARACTER DNA MAP
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
Vertical orientation only. Camera upright. No tilt.

Character (must remain identical across all video scenes):
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

This image will be used as the master reference for all video scenes.
Maintain realism. No artificial or fantasy background.
`.trim();

  /* ==============================
     CINEMATIC SHOT ENGINE
  ============================== */

  const prompts = scenes.map((scene, index) => {

    let framingInstruction = "";

    if (scene.type === "hook") {
      framingInstruction = `
Close-up framing.
Focus on facial expression.
Subtle emotional eye movement.
`;
    } else if (scene.type === "solusi") {
      framingInstruction = `
Medium shot.
Show product clearly while explaining.
Allow slight body movement variation.
`;
    } else if (scene.type === "cta") {
      framingInstruction = `
Medium to slightly wider shot.
Confident posture.
Product clearly visible.
Strong engaging eye contact.
`;
    }

    const veoPrompt = `
Create a 6-second portrait video (9:16).
Vertical orientation only.
Camera upright. No tilt. No rotation.
Horizon level.

Use the uploaded reference image.
Do not change character face, outfit, lighting, or environment.

Visual Style:
Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}
Camera style: ${globalStyle.camera_style}
Depth: ${globalStyle.depth}
Motion: ${globalStyle.motion}

Scene direction (6 seconds):
${framingInstruction}
Action: ${scene.visual_action}

The character speaks directly to camera in Bahasa Indonesia
with clear natural lip sync, stable volume, and expressive emotion.
Speaking pace: natural conversational speed.
Tone must match scene type (hook engaging, solusi confident, cta persuasive).

"${scene.voice_over}"

Audio rules:
- Subtle realistic ambient sound.
- No dramatic music.
- Dialogue must remain clear and dominant.

${scene.text_overlay ? `On-screen text overlay: "${scene.text_overlay}"` : ""}

Natural blinking and subtle body movement.
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