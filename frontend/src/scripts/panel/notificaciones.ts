import { claveNotifLeidas as claveLeidas } from '../../lib/panel';
import { animarEntrada, rebotar } from './animaciones';

/*
 * El estado inicial (contador, leídas y totales) lo ponen los scripts en línea de
 * BarraLateral y Notificaciones antes de pintar. Aquí solo se manejan los cambios.
 */

function leidasGuardadas(): Set<string> {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(claveLeidas) ?? '[]') as string[]);
  } catch {
    return new Set();
  }
}

function guardarLeidas(ids: Set<string>) {
  try {
    sessionStorage.setItem(claveLeidas, JSON.stringify([...ids]));
  } catch {}
}

/** Actualiza el número de la barra lateral (se oculta en 0). */
function mostrarContador(noLeidas: number) {
  document.querySelectorAll<HTMLElement>('[data-contador-notificaciones]').forEach((el) => {
    if (el.textContent !== String(noLeidas) && noLeidas > 0) rebotar(el);
    el.textContent = String(noLeidas);
    el.classList.toggle('hidden', noLeidas === 0);
  });
}

/** Página de notificaciones: filtro "Todas / No leídas" y marcar como leída. */
export function iniciarNotificaciones() {
  const lista = document.querySelector<HTMLElement>('[data-notif-lista]');
  if (!lista) return;

  const items = [...lista.querySelectorAll<HTMLElement>('[data-notificacion]')];
  const vacio = document.querySelector<HTMLElement>('[data-notif-vacio]');
  const filtros = [...document.querySelectorAll<HTMLButtonElement>('[data-notif-filtro]')];
  const marcarTodas = document.querySelector<HTMLButtonElement>('[data-notif-marcar-todas]');
  const leidas = leidasGuardadas();
  let filtro = 'todas';

  const estaLeida = (item: HTMLElement) => item.dataset.leida === 'true';

  const actualizar = () => {
    const noLeidas = items.filter((item) => !estaLeida(item)).length;
    items.forEach((item) => (item.hidden = filtro === 'no-leidas' && estaLeida(item)));
    const visibles = items.filter((item) => !item.hidden).length;
    vacio?.classList.toggle('hidden', visibles > 0);
    lista.classList.toggle('hidden', visibles === 0);

    const totales: Record<string, number> = { todas: items.length, 'no-leidas': noLeidas };
    document.querySelectorAll<HTMLElement>('[data-notif-total]').forEach((el) => {
      el.textContent = String(totales[el.dataset.notifTotal ?? ''] ?? '');
    });
    if (marcarTodas) marcarTodas.disabled = noLeidas === 0;
    mostrarContador(noLeidas);
  };

  const marcar = (item: HTMLElement) => {
    item.dataset.leida = 'true';
    if (item.dataset.notificacion) leidas.add(item.dataset.notificacion);
  };

  items.forEach((item) => {
    item.querySelector('[data-notif-leer]')?.addEventListener('click', () => {
      marcar(item);
      guardarLeidas(leidas);
      actualizar();
    });
  });

  marcarTodas?.addEventListener('click', () => {
    items.forEach(marcar);
    guardarLeidas(leidas);
    actualizar();
  });

  filtros.forEach((boton) => {
    boton.addEventListener('click', () => {
      filtro = boton.dataset.notifFiltro ?? 'todas';
      filtros.forEach((b) => b.setAttribute('aria-pressed', String(b === boton)));
      actualizar();
      animarEntrada(items.filter((item) => !item.hidden));
    });
  });

  actualizar();
}
