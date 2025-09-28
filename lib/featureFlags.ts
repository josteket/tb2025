export type FeatureFlags = {
  enablePostProcessing: boolean;
  enableParticles: boolean;
  enableScrollAnimations: boolean;
  enableHeroGlitch: boolean;
  enableCaseTransitions: boolean;
};

const defaultFlags: FeatureFlags = {
  enablePostProcessing: true,
  enableParticles: true,
  enableScrollAnimations: true,
  enableHeroGlitch: true,
  enableCaseTransitions: true,
};

export const featureFlags: FeatureFlags = (() => {
  if (typeof window === "undefined") {
    return defaultFlags;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return {
      enablePostProcessing: false,
      enableParticles: false,
      enableScrollAnimations: false,
      enableHeroGlitch: false,
      enableCaseTransitions: false,
    };
  }

  return defaultFlags;
})();
