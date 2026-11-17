import { gsap } from 'gsap';

/** La línea del proceso se dibuja con el scroll y cada número aparece con rebote. */
export function animarProceso() {
  const contenedor = document.querySelector('[data-proceso]');
  if (!contenedor) return;
  const linea = contenedor.querySelector('[data-proceso-linea]');
  if (linea) {
    gsap.fromTo(linea, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: contenedor, start: 'top 75%', end: 'bottom 55%', scrub: 0.8 },
    });
  }
  gsap.from(contenedor.querySelectorAll('[data-proceso-numero]'), {
    scale: 0,
    rotate: -90,
    duration: 0.8,
    ease: 'back.out(2)',
    stagger: 0.18,
    scrollTrigger: { trigger: contenedor, start: 'top 78%', once: true },
  });
}
