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
Vertical orientation only. Camera upright.

The image must feature:

${dna}
- Naturally interacting with the product
- Realistic facial details
- Natural body posture

Environment:
Realistic setting that matches the product context.
Natural and believable background.

Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}

This image will be used as the master reference for multiple video scenes.
Keep framing vertical and centered.
Do not crop the product.
`.trim();

  /* ==============================
     VIDEO PROMPTS
  ============================== */

  const prompts = scenes.map(scene => {

    const veoPrompt = `
Create a 6-second portrait video (9:16).
Vertical orientation only.
Camera upright. No tilt. No rotation.
Horizon level.

Use the uploaded reference image as the master reference.
Do not change character face, outfit, lighting, or environment.

Visual Style:
Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}
Camera style: ${globalStyle.camera_style}
Depth: ${globalStyle.depth}
Motion: ${globalStyle.motion}

Scene direction (6 seconds):
Camera framing: ${scene.camera_variation}
Action: ${scene.visual_action}

The character speaks directly to camera in Bahasa Indonesia
with clear natural lip sync, stable volume, and expressive facial emotion.
Speaking pace: natural conversational speed (not too fast, not too slow).
Tone must match the scene type (hook = engaging, solusi = confident, cta = persuasive).

"${scene.voice_over}"

Audio rules:
- Add subtle realistic ambient sound matching the environment.
- No dramatic background music.
- No sudden loud effects.
- Dialogue must remain clear and dominant.
- Balanced and clean audio mix.

Natural facial expression that matches the spoken emotion.
Subtle eye movement and natural blinking.

${scene.text_overlay ? `On-screen text overlay: "${scene.text_overlay}"` : ""}

Subtle natural movement only.
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