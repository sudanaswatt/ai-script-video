export function compileResult(aiResult, globalStyle) {

  const global = aiResult.global_context;
  const scenes = aiResult.scenes || [];

  const prompts = scenes.map(scene => {

    const veoPrompt = `
Create a 6-second ${globalStyle.aspect_ratio} cinematic video.

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
Camera: ${scene.camera_variation}
Action: ${scene.visual_action}

Voice over:
"${scene.voice_over}"

${scene.text_overlay ? `Text overlay on screen: "${scene.text_overlay}"` : ""}

${globalStyle.consistency_rule}
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