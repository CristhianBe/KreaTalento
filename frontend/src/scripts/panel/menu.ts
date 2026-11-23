/**
 * Barra lateral como cajón en móvil (en escritorio siempre está visible).
 * Cerrada en móvil queda `inert` para que el teclado no entre en ella.
 */
export function iniciarMenuPanel() {
  const lateral = document.getElementById('panel-lateral');
  const boton = document.getElementById('boton-panel-menu');
  if (!lateral || !boton) return;
  const fondo = document.querySelector<HTMLElement>('[data-panel-fondo]');
  const cerrar = lateral.querySelector<HTMLElement>('[data-panel-cerrar]');
  const escritorio = matchMedia('(min-width: 1024px)');

  const alternar = (abrir: boolean) => {
    lateral.dataset.abierto = String(abrir);
    lateral.inert = !abrir && !escritorio.matches;
    boton.setAttribute('aria-expanded', String(abrir));
    fondo?.classList.toggle('hidden', !abrir);
    document.documentElement.style.overflow = abrir ? 'hidden' : '';
  };

  alternar(false);
  boton.addEventListener('click', () => {
    alternar(true);
    cerrar?.focus();
  });
  cerrar?.addEventListener('click', () => {
    alternar(false);
    boton.focus();
  });
  fondo?.addEventListener('click', () => alternar(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lateral.dataset.abierto === 'true') {
      alternar(false);
      boton.focus();
    }
  });
  // Al pasar de móvil a escritorio (o al revés), se reinicia el estado.
  escritorio.addEventListener('change', () => alternar(false));
}
