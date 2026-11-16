import { gsap } from 'gsap';

/** Entrada escalonada del hero y leve flotación de los orbes de fondo. */
export function animarHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('[data-hero-item]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 })
    .from('[data-hero-tarjeta]', { x: 24, opacity: 0, duration: 0.7, stagger: 0.07 }, '-=0.6');

  gsap.to('[data-hero-orbe]', {
    y: 30,
    duration: 8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 2,
  });
}
