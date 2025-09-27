export type FeatureFlags = {
  enablePostProcessing: boolean;
  enableCursorTrail: boolean;
  enableParticles: boolean;
  enableScrollAnimations: boolean;
};

const defaultFlags: FeatureFlags = {
  enablePostProcessing: true,
  enableCursorTrail: true,
  enableParticles: true,
  enableScrollAnimations: true,
};

export const featureFlags: FeatureFlags = (() => {
  if (typeof window === "undefined") {
    return defaultFlags;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return {
      enablePostProcessing: false,
      enableCursorTrail: false,
      enableParticles: false,
      enableScrollAnimations: false,
    };
  }

  return defaultFlags;
})();
