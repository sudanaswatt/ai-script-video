export function compileResult(aiResult, globalStyle, input) {

  const scenes = aiResult.scenes || [];

  /* =========================
     GLOBAL IMAGE PROMPT
  ========================= */

  const imagePrompt = `
Create a cinematic portrait advertising image (9:16 vertical).

The image must feature:
- ${input.audience}
- Interacting naturally with the uploaded product
- Realistic facial features
- Natural body posture
- Authentic expression

Choose a suitable outfit and environment that match the product type.

Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}

The background must feel realistic and not artificial.
This image will be used as the master reference for multiple video scenes.

Keep framing vertical and centered.
Do not crop the product.
`.trim();


  /* =========================
     VIDEO PROMPTS
  ========================= */

  const prompts = scenes.map(scene => {

    const veoPrompt = `
Create a 6-second portrait video (9:16).
Vertical orientation only.
Camera upright. No tilt. No rotation.
Horizon level.

Use the uploaded reference image.
Maintain the exact same character, face, outfit, lighting, and background.

Visual Style:
Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}
Camera style: ${globalStyle.camera_style}
Depth: ${globalStyle.depth}
Motion: ${globalStyle.motion}

Scene direction (6 seconds):
Camera framing: ${scene.camera_variation}
Action: ${scene.visual_action}

The character speaks directly to camera with natural lip sync:
"${scene.voice_over}"

${scene.text_overlay ? `On-screen text overlay: "${scene.text_overlay}"` : ""}
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