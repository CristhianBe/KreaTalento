import { gsap } from 'gsap';

/*
 * Animaciones del panel (sutiles, inspiradas en React Bits y reescritas con GSAP).
 * La entrada de cada página es CSS (`.panel-entrada` en base.css) para que no parpadee;
 * aquí van los efectos que responden a lo que hace la persona.
 * Si pidió "reducir movimiento", ninguna función anima: el contenido cambia al instante.
 */

export const conMovimiento = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;

/** Elementos que aparecen escalonados (subiendo y haciéndose visibles). */
export function animarEntrada(elementos: Element[] | NodeListOf<Element>, retraso = 0) {
  const lista = [...elementos];
  if (!conMovimiento() || !lista.length) return;
  gsap.fromTo(
    lista,
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05, delay: retraso, clearProps: 'transform,opacity,visibility' },
  );
}

/** Calendario: el mes entra desde el lado hacia el que se avanzó y los días aparecen en cascada. */
export function animarMes(grid: HTMLElement, titulo: HTMLElement, direccion: -1 | 0 | 1) {
  if (!conMovimiento()) return;
  const x = direccion * 28;
  gsap.fromTo(titulo, { autoAlpha: 0, x }, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out', clearProps: 'all' });
  gsap.fromTo(
    grid.children,
    { autoAlpha: 0, x: x * 0.6, scale: 0.94 },
    {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power3.out',
      stagger: { each: 0.012, grid: 'auto', from: direccion < 0 ? 'end' : 'start' },
      clearProps: 'transform,opacity,visibility',
    },
  );
}

/** Pequeño "salto" de un elemento (día elegido, contador que cambia). */
export function rebotar(el: Element | null | undefined) {
  if (!el || !conMovimiento()) return;
  gsap.fromTo(el, { scale: 0.88 }, { scale: 1, duration: 0.5, ease: 'back.out(3)', clearProps: 'transform' });
}

/** Números que cuentan desde 0 hasta su valor (Count Up). El valor real ya viene escrito en el HTML. */
export function contarNumeros(elementos: NodeListOf<HTMLElement>) {
  if (!conMovimiento()) return;
  elementos.forEach((el, i) => {
    const final = Number(el.textContent);
    if (!Number.isFinite(final) || final === 0) return;
    const contador = { valor: 0 };
    el.textContent = '0';
    gsap.to(contador, {
      valor: final,
      duration: 1.1,
      delay: 0.15 + i * 0.08,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = String(Math.round(contador.valor))),
    });
  });
}

/**
 * Cambio de tema con un círculo que se expande desde el botón (View Transitions).
 * Si el navegador no lo soporta o se pidió reducir movimiento, cambia al instante.
 */
export function transicionTema(origen: HTMLElement, cambiar: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || !conMovimiento()) return cambiar();

  const r = origen.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radio = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transicion = doc.startViewTransition(cambiar);
  transicion.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radio}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => {});
}
