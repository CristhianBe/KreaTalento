import { gsap } from 'gsap';

/** Dibuja la línea que une los pasos del proceso al entrar en pantalla. */
export function animarProceso() {
  const linea = document.querySelector('[data-proceso-linea]');
  if (!linea) return;
  gsap.from(linea, {
    scaleX: 0,
    duration: 1.4,
    ease: 'power2.inOut',
    scrollTrigger: { trigger: '[data-proceso]', start: 'top 80%', once: true },
  });
}
