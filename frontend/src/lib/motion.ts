import type { Variants } from 'framer-motion';

/**
 * Premium Cinematic Easing
 * A custom cubic-bezier that feels "heavy" and "weighted".
 * Provides a very smooth deceleration.
 */
export const CINEMATIC_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Standard Staggered Container Variant
 */
export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

/**
 * Fade In + Up Variant (Subtle)
 */
export const FADE_IN_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.8,
      ease: CINEMATIC_EASE,
    },
  },
};

/**
 * Title Reveal Variant (Blur + Scale + Y)
 */
export const TITLE_REVEAL: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(15px)', scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 2.2,
      ease: CINEMATIC_EASE,
    },
  },
};

/**
 * Ambient Drifting Motion
 */
export const AMBIENT_DRIFT = (xRange = 40, yRange = 20, duration = 20) => ({
  animate: {
    x: [-xRange, xRange, -xRange],
    y: [-yRange, yRange, -yRange],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
