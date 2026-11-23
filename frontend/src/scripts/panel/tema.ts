import { claveTema } from '../../lib/tema';

/**
 * Modo noche del panel. El tema inicial lo pone el script en línea de PanelLayout
 * (antes de pintar, para que no parpadee); aquí solo se cambia y se recuerda.
 */

export function iniciarTema() {
  const raiz = document.documentElement;
  const botones = document.querySelectorAll<HTMLButtonElement>('[data-panel-tema]');
  if (!botones.length) return;

  const aplicar = (oscuro: boolean) => {
    if (oscuro) raiz.dataset.tema = 'oscuro';
    else delete raiz.dataset.tema;
    botones.forEach((boton) => boton.setAttribute('aria-pressed', String(oscuro)));
  };

  aplicar(raiz.dataset.tema === 'oscuro');
  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      const oscuro = raiz.dataset.tema !== 'oscuro';
      aplicar(oscuro);
      try {
        localStorage.setItem(claveTema, oscuro ? 'oscuro' : 'claro');
      } catch {}
    });
  });
}
