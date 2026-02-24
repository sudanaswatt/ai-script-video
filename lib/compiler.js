export function compileResult(aiResult, globalStyle) {

  const global = aiResult.global_context;
  const scenes = aiResult.scenes || [];

  const prompts = scenes.map(scene => {

    const veoPrompt = `
Create a 6-second portrait social media video (9:16).
Vertical orientation only.
Camera must remain upright.
No tilt. No rotation.
Horizon level. Stable vertical framing.

Character:
${global.character}

Outfit:
${global.outfit}

Location:
${global.location}

Time of day:
${global.time_of_day}

Mood:
${global.mood}

Visual Style:
Lighting: ${globalStyle.lighting}
Color tone: ${globalStyle.color_tone}
Camera style: ${globalStyle.camera_style}
Depth: ${globalStyle.depth}
Motion: ${globalStyle.motion}

Scene direction (6 seconds):
Camera framing: ${scene.camera_variation}
Action: ${scene.visual_action}

The character speaks directly to camera with natural lip sync and matching facial expression:
"${scene.voice_over}"

${scene.text_overlay ? `On-screen text overlay (subtle, clean placement): "${scene.text_overlay}"` : ""}

Maintain the exact same character face, hairstyle, outfit, lighting, and environment across all prompts.
`.trim();

    return {
      prompt_number: scene.scene_number,
      veo_prompt: veoPrompt
    };

  });

  return {
    prompt_count: prompts.length,
    prompts: prompts
  };

}