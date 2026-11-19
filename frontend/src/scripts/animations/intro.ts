import { gsap } from 'gsap';

/**
 * Intro con el logo. Devuelve la duración (s) que deben esperar las demás
 * animaciones de entrada; 0 si no hay intro.
 */
export function animarIntro(): number {
  const raiz = document.documentElement;
  const intro = document.getElementById('intro');
  if (!intro || !raiz.classList.contains('con-intro')) return 0;

  intro.style.animation = 'none';
  const tl = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onComplete: () => {
      raiz.classList.remove('con-intro');
      intro.remove();
    },
  });
  tl.fromTo('[data-intro-logo]', { opacity: 0, scale: 0.85, filter: 'blur(12px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 })
    .to('[data-intro-barra]', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '-=0.5')
    .to('[data-intro-logo]', { y: -20, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.15')
    .to('[data-intro-barra]', { opacity: 0, duration: 0.3 }, '<')
    .fromTo(intro, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '-=0.2');
  return tl.duration() - 0.6;
}
