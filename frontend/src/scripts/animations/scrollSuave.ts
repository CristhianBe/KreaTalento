import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisActual: Lenis | null = null;

/** Instancia activa de Lenis (null si "reducir movimiento" está activo). */
export const obtenerLenis = () => lenisActual;

/** Desplazamiento suave con Lenis, sincronizado con ScrollTrigger. */
export function iniciarScrollSuave() {
  const lenis = new Lenis({
    duration: 1.1,
    anchors: { offset: -72 },
  });
  lenisActual = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (tiempo: number) => lenis.raf(tiempo * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenisActual = null;
  };
}
