/**
 * Login: luz que sigue al puntero sobre el panel azul (solo con mouse/trackpad).
 * El resto de efectos del login son CSS (`.login-*` en base.css).
 */
export function focoLogin() {
  const panel = document.querySelector<HTMLElement>('[data-login-panel]');
  if (!panel) return;
  const mover = (e: PointerEvent) => {
    const r = panel.getBoundingClientRect();
    panel.style.setProperty('--mx', `${e.clientX - r.left}px`);
    panel.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  panel.addEventListener('pointermove', mover);
  return () => panel.removeEventListener('pointermove', mover);
}
