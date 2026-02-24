export function compileResult(aiResult, globalStyle, durationConfig) {

  return {
    global_style: globalStyle,
    global_context: aiResult.global_context,
    total_duration: durationConfig.total_duration,
    scene_count: aiResult.scene_count,
    duration_per_scene: durationConfig.duration_per_scene,
    scenes: aiResult.scenes
  };

}