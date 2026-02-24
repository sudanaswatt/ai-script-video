export function getGlobalStyle(style) {

  const base = {
    aspect_ratio: "9:16 vertical",
    consistency_rule: "Maintain the exact same character face, outfit, hairstyle, lighting, and environment across all prompts."
  };

  const styles = {

    Cinematic: {
      lighting: "soft cinematic lighting",
      color_tone: "warm natural tone",
      camera_style: "smooth handheld tracking",
      depth: "shallow depth of field",
      motion: "natural cinematic movement"
    },

    Luxury: {
      lighting: "high contrast dramatic lighting",
      color_tone: "rich gold and deep shadow tone",
      camera_style: "slow controlled dolly movement",
      depth: "shallow depth with premium product focus",
      motion: "slow elegant movement"
    },

    "Clean Aesthetic": {
      lighting: "soft daylight",
      color_tone: "bright neutral tone",
      camera_style: "stable smooth framing",
      depth: "natural depth of field",
      motion: "minimal movement"
    },

    Realistic: {
      lighting: "natural realistic lighting",
      color_tone: "true-to-life color",
      camera_style: "natural handheld",
      depth: "balanced depth of field",
      motion: "documentary style movement"
    },

    "Dark Dramatic": {
      lighting: "low key dramatic lighting",
      color_tone: "dark moody tone",
      camera_style: "slow cinematic push in",
      depth: "deep shadow contrast",
      motion: "intense controlled motion"
    },

    "Bright Soft": {
      lighting: "bright soft lighting",
      color_tone: "pastel soft tone",
      camera_style: "gentle floating camera",
      depth: "light airy depth of field",
      motion: "smooth soft movement"
    }

  };

  return {
    ...base,
    ...styles[style]
  };
}