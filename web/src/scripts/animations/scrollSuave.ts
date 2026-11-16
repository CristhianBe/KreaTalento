import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Desplazamiento suave con Lenis, sincronizado con ScrollTrigger. */
export function iniciarScrollSuave() {
  const lenis = new Lenis({
    duration: 1.1,
    anchors: { offset: -88 },
  });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (tiempo: number) => lenis.raf(tiempo * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
