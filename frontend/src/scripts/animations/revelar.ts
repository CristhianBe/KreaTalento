import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Aparición sutil (fundido + desplazamiento) de los elementos con [data-reveal]. */
export function animarRevelar() {
  gsap.set('[data-reveal]', { opacity: 0, y: 28 });
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08, overwrite: true }),
  });
}
