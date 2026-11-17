import { gsap } from 'gsap';
import { obtenerLenis } from './animations/scrollSuave';

/**
 * Ventanas de detalle de los servicios (<dialog> nativo).
 * Funcionan siempre; la animación GSAP solo se usa si se permite movimiento.
 */
export function iniciarServicios() {
  const conMovimiento = () => matchMedia('(prefers-reduced-motion: no-preference)').matches;

  const bloquear = (si: boolean) => {
    document.documentElement.style.overflow = si ? 'hidden' : '';
    const lenis = obtenerLenis();
    if (si) lenis?.stop();
    else lenis?.start();
  };

  const abrir = (dialogo: HTMLDialogElement) => {
    if (dialogo.open) return;
    dialogo.showModal();
    bloquear(true);
    if (!conMovimiento()) return;
    dialogo.classList.add('animado');
    gsap.killTweensOf(dialogo);
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(dialogo, { opacity: 0, y: 48, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'expo.out' })
      .from(dialogo.querySelectorAll('[data-dialogo-item]'), { opacity: 0, y: 18, duration: 0.45, stagger: 0.05 }, '-=0.35');
  };

  const cerrar = (dialogo: HTMLDialogElement, despues?: () => void) => {
    if (!dialogo.open) return;
    const terminar = () => {
      dialogo.close();
      gsap.set(dialogo, { clearProps: 'all' });
      bloquear(false);
      despues?.();
    };
    if (!conMovimiento()) return terminar();
    gsap.to(dialogo, { opacity: 0, y: 24, scale: 0.96, duration: 0.25, ease: 'power2.in', onComplete: terminar });
  };

  document.querySelectorAll<HTMLElement>('[data-abrir-servicio]').forEach((boton) => {
    boton.addEventListener('click', () => {
      const dialogo = document.getElementById(`dialogo-${boton.dataset.abrirServicio}`);
      if (dialogo instanceof HTMLDialogElement) abrir(dialogo);
    });
  });

  document.querySelectorAll<HTMLDialogElement>('dialog.dialogo-servicio').forEach((dialogo) => {
    // Esc: cierre animado
    dialogo.addEventListener('cancel', (e) => {
      e.preventDefault();
      cerrar(dialogo);
    });
    // Clic fuera del contenido (en el fondo)
    dialogo.addEventListener('click', (e) => {
      if (e.target === dialogo) cerrar(dialogo);
    });
    dialogo.querySelectorAll<HTMLElement>('[data-cerrar-servicio]').forEach((el) => {
      el.addEventListener('click', (e) => {
        const destino = el.getAttribute('href');
        if (destino?.startsWith('#')) {
          e.preventDefault();
          cerrar(dialogo, () => {
            const lenis = obtenerLenis();
            if (lenis) lenis.scrollTo(destino, { offset: -72 });
            else document.querySelector(destino)?.scrollIntoView();
          });
        } else {
          cerrar(dialogo);
        }
      });
    });
  });
}
