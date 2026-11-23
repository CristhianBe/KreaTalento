import { claveAnchoLateral, anchoLateral } from '../../lib/panel';

/**
 * Borde arrastrable de la barra lateral (solo escritorio).
 * - Arrastrar: cambia el ancho entre `anchoLateral.min` y `.max`.
 * - Doble clic: vuelve al ancho inicial.
 * - Teclado (con el borde enfocado): ← → cambian el ancho (Shift = más rápido); Inicio/Fin = mínimo/máximo.
 * El ancho vive en la variable CSS `--ancho-lateral` de <html> y se recuerda en localStorage.
 */
export function iniciarRedimensionLateral() {
  const borde = document.querySelector<HTMLElement>('[data-panel-redimensionar]');
  if (!borde) return;
  const raiz = document.documentElement;

  const limitar = (px: number) => Math.min(anchoLateral.max, Math.max(anchoLateral.min, Math.round(px)));
  let guardado = 0;
  try {
    guardado = Number(localStorage.getItem(claveAnchoLateral));
  } catch {}
  let ancho = guardado >= anchoLateral.min && guardado <= anchoLateral.max ? guardado : anchoLateral.inicial;

  const aplicar = (px: number, guardar = false) => {
    ancho = limitar(px);
    raiz.style.setProperty('--ancho-lateral', `${ancho}px`);
    borde.setAttribute('aria-valuenow', String(ancho));
    if (!guardar) return;
    try {
      localStorage.setItem(claveAnchoLateral, String(ancho));
    } catch {}
  };

  borde.setAttribute('aria-valuemin', String(anchoLateral.min));
  borde.setAttribute('aria-valuemax', String(anchoLateral.max));
  aplicar(ancho);

  const arrastrando = () => borde.dataset.arrastrando === 'true';

  borde.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    borde.setPointerCapture(e.pointerId);
    borde.dataset.arrastrando = 'true';
    // Mientras se arrastra: sin selección de texto y con el cursor de redimensionar en toda la página.
    document.body.classList.add('select-none', 'cursor-col-resize');
  });

  // La barra empieza en el borde izquierdo de la ventana: la posición del puntero ES el ancho.
  borde.addEventListener('pointermove', (e) => {
    if (arrastrando()) aplicar(e.clientX);
  });

  const soltar = () => {
    if (!arrastrando()) return;
    borde.dataset.arrastrando = 'false';
    document.body.classList.remove('select-none', 'cursor-col-resize');
    aplicar(ancho, true);
  };
  borde.addEventListener('pointerup', soltar);
  borde.addEventListener('pointercancel', soltar);

  borde.addEventListener('dblclick', () => aplicar(anchoLateral.inicial, true));

  borde.addEventListener('keydown', (e) => {
    const paso = e.shiftKey ? 48 : 16;
    const teclas: Record<string, number> = {
      ArrowLeft: ancho - paso,
      ArrowRight: ancho + paso,
      Home: anchoLateral.min,
      End: anchoLateral.max,
    };
    if (!(e.key in teclas)) return;
    e.preventDefault();
    aplicar(teclas[e.key], true);
  });
}
