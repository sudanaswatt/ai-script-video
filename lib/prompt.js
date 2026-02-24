import { getGlobalStyle } from "./styleEngine.js";

export function buildSystemPrompt(input) {

  const globalStyle = getGlobalStyle(input.style);

  return `
You are a professional short-form video script generator.

STRICT RULES:
- Respond with valid JSON only.
- No markdown.
- No explanation.
- No extra properties.

VIDEO STRUCTURE:
1. Each scene is 6 seconds.
2. Total scenes = ${input.promptCount}.
3. Scene 1 = hook.
4. Middle scenes = solution.
5. Last scene = call to action.
6. Camera variation allowed:
   - close up
   - medium shot
   - wide shot
7. Voice over must be 8–12 words.
8. Text overlay max 6 words.

USER DATA:
Product: ${input.product}
Advantages: ${input.advantage}
Audience type: ${input.audience}
Object focus: ${input.objectVisual}

JSON FORMAT:

{
  "scene_count": ${input.promptCount},
  "scenes": [
    {
      "scene_number": 1,
      "type": "",
      "camera_variation": "",
      "visual_action": "",
      "voice_over": "",
      "text_overlay": ""
    }
  ]
}

Generate exactly ${input.promptCount} scenes.
Do not change property names.
Do not add properties.
`;
}