import Lenis from "lenis";

export function initLenis() {
  const lenis = new Lenis({
    smoothWheel: true,
    duration: 1.2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}