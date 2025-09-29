export const featureFlags = {
  enablePostProcessing: true,
  enableCursorTrail: true,
  enableGsapScroll: true,
  enableNoiseOverlay: true,
  enableParticles: true
} as const;

export type FeatureFlags = typeof featureFlags;

export function getFeatureFlags(isReducedMotion: boolean): FeatureFlags {
  if (isReducedMotion) {
    return {
      enablePostProcessing: false,
      enableCursorTrail: false,
      enableGsapScroll: false,
      enableNoiseOverlay: false,
      enableParticles: false
    } as const;
  }

  return featureFlags;
}
