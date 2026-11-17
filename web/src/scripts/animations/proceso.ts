import { gsap } from 'gsap';

/**
 * Tarjetas apiladas: cada tarjeta se achica un poco cuando la siguiente
 * se le pone encima, y su número aparece con un rebote.
 */
export function animarProceso() {
  const pasos = [...document.querySelectorAll<HTMLElement>('[data-proceso-paso]')];
  const total = pasos.length;

  pasos.forEach((paso, i) => {
    const tarjeta = paso.querySelector('[data-proceso-tarjeta]');
    const siguiente = pasos[i + 1];
    if (tarjeta && siguiente) {
      gsap.to(tarjeta, {
        scale: 1 - (total - 1 - i) * 0.04,
        transformOrigin: '50% 0%',
        ease: 'none',
        scrollTrigger: { trigger: siguiente, start: 'top bottom', end: 'top 35%', scrub: true },
      });
    }
    gsap.from(paso.querySelector('[data-proceso-numero]'), {
      scale: 0,
      rotate: -90,
      duration: 0.8,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: paso, start: 'top 85%', once: true },
    });
  });
}
