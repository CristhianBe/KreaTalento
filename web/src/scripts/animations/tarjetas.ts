import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Entrada en 3D escalonada de las tarjetas de servicio. */
export function animarTarjetas() {
  gsap.set('[data-servicio-tarjeta]', { opacity: 0, y: 70, rotateX: -18, scale: 0.94, transformOrigin: '50% 100%' });
  ScrollTrigger.batch('[data-servicio-tarjeta]', {
    start: 'top 90%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1, overwrite: true }),
  });
}

/** Inclinación 3D y luz que sigue al puntero (solo en escritorio). */
export function inclinarTarjetas() {
  const limpiezas: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('.tarjeta-servicio').forEach((tarjeta) => {
    const rx = gsap.quickTo(tarjeta, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(tarjeta, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const mover = (e: PointerEvent) => {
      const r = tarjeta.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      rx((0.5 - y) * 10);
      ry((x - 0.5) * 12);
      tarjeta.style.setProperty('--mx', `${x * 100}%`);
      tarjeta.style.setProperty('--my', `${y * 100}%`);
    };
    const salir = () => { rx(0); ry(0); };
    tarjeta.addEventListener('pointermove', mover);
    tarjeta.addEventListener('pointerleave', salir);
    limpiezas.push(() => {
      tarjeta.removeEventListener('pointermove', mover);
      tarjeta.removeEventListener('pointerleave', salir);
    });
  });
  return () => limpiezas.forEach((f) => f());
}
