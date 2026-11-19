import { gsap } from 'gsap';

/** Barra de progreso de lectura bajo el encabezado. */
export function barraProgreso() {
  const barra = document.querySelector('[data-progreso]');
  if (!barra) return;
  gsap.to(barra, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}

/** Elementos decorativos que se desplazan a distinta velocidad: data-parallax="<px>". */
export function parallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const distancia = Number(el.dataset.parallax) || 60;
    gsap.fromTo(el, { y: -distancia }, {
      y: distancia,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/** Bloque de contacto que se expande al acercarse. */
export function animarContacto() {
  const bloque = document.querySelector('[data-contacto-bloque]');
  if (!bloque) return;
  gsap.fromTo(bloque, { scale: 0.92, borderRadius: '3.5rem' }, {
    scale: 1,
    borderRadius: '2rem',
    ease: 'none',
    scrollTrigger: { trigger: bloque, start: 'top 95%', end: 'top 45%', scrub: 0.6 },
  });
}

/** Botones "magnéticos": siguen levemente al puntero (solo en escritorio). */
export function botonesMagneticos() {
  const limpiezas: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('[data-magnetico]').forEach((boton) => {
    const x = gsap.quickTo(boton, 'x', { duration: 0.5, ease: 'power3.out' });
    const y = gsap.quickTo(boton, 'y', { duration: 0.5, ease: 'power3.out' });
    const mover = (e: PointerEvent) => {
      const r = boton.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    };
    const salir = () => { x(0); y(0); };
    boton.addEventListener('pointermove', mover);
    boton.addEventListener('pointerleave', salir);
    limpiezas.push(() => {
      boton.removeEventListener('pointermove', mover);
      boton.removeEventListener('pointerleave', salir);
    });
  });
  return () => limpiezas.forEach((f) => f());
}
