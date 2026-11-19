import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/** Entrada del hero: título palabra por palabra, red del logo que se dibuja y tarjetas. */
export function animarHero(retraso = 0) {
  const titulo = document.querySelector<HTMLElement>('[data-hero-titulo]');
  const tl = gsap.timeline({ delay: retraso, defaults: { ease: 'expo.out' } });

  if (titulo) {
    // autoSplit vuelve a dividir al cargar la fuente o cambiar el tamaño de la ventana.
    SplitText.create(titulo, {
      type: 'lines,words',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.words, { yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out', delay: retraso }),
    });
  }
  tl.from('[data-hero-item]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.3)
    .from('[data-hero-tarjeta]', { x: 40, opacity: 0, rotateY: -12, duration: 0.9, stagger: 0.08 }, '-=0.9');

  const trazo = document.querySelector<SVGPathElement>('[data-red-trazo]');
  if (trazo) {
    const largo = trazo.getTotalLength();
    gsap.set(trazo, { strokeDasharray: largo, strokeDashoffset: largo });
    tl.to(trazo, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.3);
    tl.from('[data-red-nodo]', { scale: 0, transformOrigin: 'center', duration: 0.8, stagger: 0.15, ease: 'back.out(2.5)' }, 0.6);
  }

  // Flotación continua
  gsap.to('[data-hero-orbe]', { y: 30, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 2 });
  gsap.to('[data-red-nodo]', { y: -6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.4, delay: retraso + 1.5 });
}

/** Parallax de los orbes y la red siguiendo el puntero (solo en escritorio). */
export function parallaxPuntero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const capas = [...hero.querySelectorAll<HTMLElement>('[data-profundidad]')].map((el) => ({
    x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
    y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
    p: Number(el.dataset.profundidad),
  }));
  const red = document.querySelector('[data-hero-red]');
  const redX = red && gsap.quickTo(red, 'x', { duration: 1.5, ease: 'power3.out' });
  const redY = red && gsap.quickTo(red, 'y', { duration: 1.5, ease: 'power3.out' });

  const mover = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    capas.forEach((c) => { c.x(nx * c.p); c.y(ny * c.p); });
    if (redX && redY) { redX(nx * -18); redY(ny * -12); }
  };
  hero.addEventListener('pointermove', mover);
  return () => hero.removeEventListener('pointermove', mover);
}
