import { textosClientes as textos } from '../../data/panel';
import { normalizar } from '../../lib/texto';

/**
 * Clientes: filtro por estado, búsqueda (sin importar tildes), orden por nombre y
 * ventana de detalles al hacer clic en una fila. La tabla y las ventanas ya vienen
 * armadas desde el servidor; aquí solo se muestran/ocultan, reordenan, abren y cierran.
 */
export function iniciarClientes() {
  const raiz = document.querySelector<HTMLElement>('[data-clientes]');
  const lista = raiz?.querySelector<HTMLElement>('[data-clientes-lista]');
  if (!raiz || !lista) return;

  const filas = [...lista.querySelectorAll<HTMLElement>('[data-cliente]')];
  const filtros = [...raiz.querySelectorAll<HTMLButtonElement>('[data-clientes-filtro]')];
  const buscador = raiz.querySelector<HTMLInputElement>('[data-clientes-buscar]');
  const vacio = raiz.querySelector<HTMLElement>('[data-clientes-vacio]');
  const conteo = raiz.querySelector<HTMLElement>('[data-clientes-conteo]');
  const ordenar = raiz.querySelector<HTMLButtonElement>('[data-clientes-ordenar]');
  const columnaNombre = raiz.querySelector<HTMLElement>('[data-clientes-columna-nombre]');

  let filtro = 'todos';
  let ascendente = true;

  const actualizar = () => {
    const termino = normalizar(buscador?.value ?? '');
    let visibles = 0;
    filas.forEach((fila) => {
      const coincide =
        (filtro === 'todos' || fila.dataset.estado === filtro) && (!termino || (fila.dataset.busqueda ?? '').includes(termino));
      fila.hidden = !coincide;
      if (coincide) visibles++;
    });
    vacio?.classList.toggle('hidden', visibles > 0);
    if (conteo) conteo.textContent = textos.mostrando(visibles, filas.length);
  };

  filtros.forEach((boton) => {
    boton.addEventListener('click', () => {
      filtro = boton.dataset.clientesFiltro ?? 'todos';
      filtros.forEach((b) => b.setAttribute('aria-pressed', String(b === boton)));
      actualizar();
    });
  });

  buscador?.addEventListener('input', actualizar);

  ordenar?.addEventListener('click', () => {
    ascendente = !ascendente;
    filas
      .sort((a, b) => {
        const orden = (a.dataset.nombre ?? '').localeCompare(b.dataset.nombre ?? '', 'es');
        return ascendente ? orden : -orden;
      })
      .forEach((fila) => lista.append(fila));
    columnaNombre?.setAttribute('aria-sort', ascendente ? 'ascending' : 'descending');
  });

  iniciarDialogosClientes(lista);
}

/** Ventana de detalles: clic en cualquier parte de la fila (o Enter en el nombre) la abre. */
function iniciarDialogosClientes(lista: HTMLElement) {
  const bloquearScroll = (si: boolean) => {
    document.documentElement.style.overflow = si ? 'hidden' : '';
  };

  lista.addEventListener('click', (e) => {
    const fila = (e.target as HTMLElement).closest<HTMLElement>('[data-cliente]');
    const dialogo = fila && document.getElementById(`cliente-${fila.dataset.cliente}`);
    if (!(dialogo instanceof HTMLDialogElement) || dialogo.open) return;
    dialogo.showModal();
    bloquearScroll(true);
  });

  document.querySelectorAll<HTMLDialogElement>('dialog[data-cliente-dialogo]').forEach((dialogo) => {
    // Esc ya lo cierra el navegador; también la X y el clic en el fondo oscuro.
    dialogo.querySelector('[data-cerrar-dialogo]')?.addEventListener('click', () => dialogo.close());
    dialogo.addEventListener('click', (e) => {
      if (e.target === dialogo) dialogo.close();
    });
    dialogo.addEventListener('close', () => bloquearScroll(false));
  });
}
