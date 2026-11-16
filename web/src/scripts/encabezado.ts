/** Estado del encabezado al hacer scroll y menú móvil (no son animaciones: funcionan siempre). */
export function iniciarEncabezado() {
  const encabezado = document.getElementById('encabezado');
  const boton = document.getElementById('boton-menu');
  const menu = document.getElementById('menu-movil');
  if (!encabezado) return;

  const actualizar = () => encabezado.setAttribute('data-scrolled', String(window.scrollY > 8));
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });

  if (!boton || !menu) return;
  const alternar = (abrir: boolean) => {
    boton.setAttribute('aria-expanded', String(abrir));
    boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    menu.classList.toggle('hidden', !abrir);
    boton.querySelector('.icono-abrir')?.classList.toggle('hidden', abrir);
    boton.querySelector('.icono-cerrar')?.classList.toggle('hidden', !abrir);
  };
  boton.addEventListener('click', () => alternar(boton.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => alternar(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') alternar(false);
  });
}
