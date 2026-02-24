export function compileResult(aiResult, globalStyle) {

  const global = aiResult.global_context;
  const scenes = aiResult.scenes || [];

  const prompts = scenes.map(scene => {

    const veoPrompt = `
Create a 6-second ${globalStyle.aspect_ratio} video.

Character:
${global.character}.
Wearing ${global.outfit}.

Location:
${global.location}.

Time:
${global.time_of_day}.

Mood:
${global.mood}.

Lighting:
${globalStyle.lighting}.
Color tone: ${globalStyle.color_tone}.
Camera style: ${globalStyle.camera_style}.

Scene (6 seconds) – ${scene.camera_variation}
${scene.visual_action}

Voice over:
"${scene.voice_over}"

${scene.text_overlay ? `Text overlay: "${scene.text_overlay}"` : ""}

Maintain same character face, same outfit, same lighting throughout the entire video.
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