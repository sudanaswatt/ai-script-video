export function getDurationConfig(sceneCount) {

  const totalDuration = 6;
  const durationPerScene = totalDuration / sceneCount;

  return {
    total_duration: totalDuration,
    scene_count: sceneCount,
    duration_per_scene: durationPerScene
  };
}