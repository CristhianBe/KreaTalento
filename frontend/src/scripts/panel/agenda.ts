import { citas, textosAgenda as textos, type TipoCita } from '../../data/panel';
import { animarEntrada, animarMes, rebotar } from './animaciones';

const formatoMes = new Intl.DateTimeFormat('es-CR', { month: 'long', year: 'numeric' });
const formatoDia = new Intl.DateTimeFormat('es-CR', { weekday: 'long', day: 'numeric', month: 'long' });
const formatoCorto = new Intl.DateTimeFormat('es-CR', { weekday: 'short', day: 'numeric', month: 'short' });
const formatoHora = new Intl.DateTimeFormat('es-CR', { hour: 'numeric', minute: '2-digit' });

/** Color de la barra de cada tipo de cita (solo azules y celestes). */
const colores: Record<TipoCita, string> = {
  coaching: 'bg-celeste-400',
  asesoria: 'bg-azul-500 dark:bg-acento',
  capacitacion: 'bg-azul-300',
  cv: 'bg-celeste-600',
  talento: 'bg-azul-700 dark:bg-azul-400',
};

/** Estilos de la celda de cada día según su estado. */
const estilosDia = {
  base: 'flex min-h-16 flex-col items-start gap-1 rounded-xl p-1.5 text-left ring-1 transition-[background-color,box-shadow] md:min-h-24 md:p-2',
  elegido: 'bg-azul-600 text-white ring-azul-600 dark:bg-acento dark:ring-acento',
  hoy: 'bg-celeste-50 text-azul-800 ring-2 ring-celeste-400 hover:bg-celeste-100 dark:bg-acento/15 dark:text-noche-texto dark:ring-acento/60 dark:hover:bg-acento/25',
  normal: 'bg-fondo-suave text-azul-800 ring-borde hover:ring-azul-300 dark:bg-noche-800 dark:text-noche-texto dark:ring-noche-700 dark:hover:ring-noche-600',
};

/** Citas que se escriben dentro de la celda (en pantallas medianas o más). */
const maxEtiquetas = 2;

const inicioDelDia = (fecha: Date) => new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
const mismoDia = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** 45 → "45 min", 90 → "1 h 30 min", 120 → "2 h". */
const formatoDuracion = (minutos: number) => {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (!horas) return `${resto} ${textos.minutos}`;
  return resto ? `${horas} h ${resto} ${textos.minutos}` : `${horas} h`;
};

/** Crea un elemento con clases (para no repetir createElement + className). */
const crear = (etiqueta: string, clases = '') => {
  const el = document.createElement(etiqueta);
  if (clases) el.className = clases;
  return el;
};

interface CitaConFecha {
  tipo: TipoCita;
  titulo: string;
  detalle: string;
  duracion: number;
  inicio: Date;
  fin: Date;
}

/** Calendario mensual con las citas, citas del día elegido y próximas citas. */
export function iniciarAgenda() {
  const raiz = document.querySelector<HTMLElement>('[data-agenda]');
  const plantilla = document.querySelector<HTMLTemplateElement>('[data-agenda-plantilla]');
  if (!raiz || !plantilla) return;

  const elementos = {
    mes: raiz.querySelector<HTMLElement>('[data-agenda-mes]')!,
    grid: raiz.querySelector<HTMLElement>('[data-agenda-grid]')!,
    diaTitulo: raiz.querySelector<HTMLElement>('[data-agenda-dia-titulo]')!,
    diaLista: raiz.querySelector<HTMLElement>('[data-agenda-dia-lista]')!,
    diaVacio: raiz.querySelector<HTMLElement>('[data-agenda-dia-vacio]')!,
    proximas: raiz.querySelector<HTMLElement>('[data-agenda-proximas]')!,
    proximasVacio: raiz.querySelector<HTMLElement>('[data-agenda-proximas-vacio]')!,
  };

  // Datos de ejemplo: `enDias` + `hora` → fecha real a partir de hoy.
  const hoy = inicioDelDia(new Date());
  const lista: CitaConFecha[] = citas
    .map((cita) => {
      const [horas, minutos] = cita.hora.split(':').map(Number);
      const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + cita.enDias, horas, minutos);
      const fin = new Date(inicio.getTime() + cita.duracion * 60_000);
      return { tipo: cita.tipo, titulo: cita.titulo, detalle: cita.detalle, duracion: cita.duracion, inicio, fin };
    })
    .sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

  let mes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
  let seleccionado = hoy;

  const citasDel = (dia: Date) => lista.filter((cita) => mismoDia(cita.inicio, dia));

  /** Tarjeta de cita desde la <template>; `conFecha` agrega el día (para "Próximas citas"). */
  const crearCita = (cita: CitaConFecha, conFecha: boolean) => {
    const nodo = plantilla.content.firstElementChild!.cloneNode(true) as HTMLElement;
    const hora = formatoHora.format(cita.inicio);
    nodo.querySelector('[data-cita-hora]')!.textContent = conFecha ? `${formatoCorto.format(cita.inicio)} · ${hora}` : hora;
    nodo.querySelector('[data-cita-color]')!.classList.add(...colores[cita.tipo].split(' '));
    nodo.querySelector('[data-cita-titulo]')!.textContent = cita.titulo;
    nodo.querySelector('[data-cita-detalle]')!.textContent = cita.detalle;
    nodo.querySelector('[data-cita-rango]')!.textContent = `${hora} – ${formatoHora.format(cita.fin)}`;
    nodo.querySelector('[data-cita-duracion]')!.textContent = formatoDuracion(cita.duracion);
    return nodo;
  };

  /** Celda de un día: número, citas escritas (escritorio) o puntos (móvil). */
  const crearDia = (fecha: Date) => {
    const delDia = citasDel(fecha);
    const esHoy = mismoDia(fecha, hoy);
    const elegido = mismoDia(fecha, seleccionado);

    const boton = crear('button', `${estilosDia.base} ${elegido ? estilosDia.elegido : esHoy ? estilosDia.hoy : estilosDia.normal}`) as HTMLButtonElement;
    boton.type = 'button';
    boton.setAttribute('aria-pressed', String(elegido));
    if (esHoy) boton.setAttribute('aria-current', 'date');
    const cantidad = delDia.length;
    boton.setAttribute(
      'aria-label',
      `${formatoDia.format(fecha)}${cantidad ? `, ${cantidad} ${cantidad === 1 ? textos.cita : textos.citas}` : ''}`,
    );

    const numero = crear('span', 'inline-flex items-center gap-1.5 text-sm font-bold md:text-base');
    numero.textContent = String(fecha.getDate());
    // Hoy (si no está elegido): punto celeste que late suavemente.
    if (esHoy && !elegido) {
      const punto = crear('span', 'relative flex size-2');
      punto.setAttribute('aria-hidden', 'true');
      punto.append(
        crear('span', 'absolute inline-flex size-full rounded-full bg-celeste-400 opacity-75 motion-safe:animate-ping'),
        crear('span', 'relative inline-flex size-2 rounded-full bg-celeste-500'),
      );
      numero.append(punto);
    }
    boton.append(numero);

    if (cantidad) {
      const colorTexto = elegido ? 'text-white/90' : 'text-tinta-suave dark:text-noche-suave';
      const etiquetas = crear('span', 'mt-auto hidden w-full flex-col gap-1 md:flex');
      etiquetas.setAttribute('aria-hidden', 'true');
      delDia.slice(0, maxEtiquetas).forEach((cita) => {
        const fila = crear('span', `flex min-w-0 items-center gap-1.5 text-[0.7rem] font-medium leading-tight ${colorTexto}`);
        const barra = crear('span', `h-3 w-0.5 shrink-0 rounded-full ${elegido ? 'bg-white/80' : colores[cita.tipo]}`);
        const titulo = crear('span', 'truncate');
        titulo.textContent = cita.titulo;
        fila.append(barra, titulo);
        etiquetas.append(fila);
      });
      if (cantidad > maxEtiquetas) {
        const mas = crear('span', `text-[0.7rem] font-semibold ${colorTexto}`);
        mas.textContent = `+${cantidad - maxEtiquetas} ${textos.mas}`;
        etiquetas.append(mas);
      }

      const puntos = crear('span', 'mt-auto flex gap-1 md:hidden');
      puntos.setAttribute('aria-hidden', 'true');
      delDia.slice(0, 3).forEach((cita) => puntos.append(crear('span', `size-1.5 rounded-full ${elegido ? 'bg-white' : colores[cita.tipo]}`)));
      boton.append(etiquetas, puntos);
    }

    boton.addEventListener('click', () => {
      // Segundo clic sobre el día elegido: acercar / alejar (vista ampliada).
      if (mismoDia(fecha, seleccionado) && puedeAmpliar()) {
        if (ampliado) alejar();
        else ampliar(boton);
        return;
      }
      if (ampliado) alejar();
      seleccionado = fecha;
      pintarMes();
      pintarDia(true);
      const elegido = elementos.grid.querySelector<HTMLElement>('[aria-pressed="true"]');
      elegido?.focus();
      rebotar(elegido);
    });
    return boton;
  };

  /** `animar`: las citas del día aparecen en cascada (al elegir otro día). */
  const pintarDia = (animar = false) => {
    const delDia = citasDel(seleccionado);
    elementos.diaTitulo.textContent = formatoDia.format(seleccionado);
    elementos.diaLista.replaceChildren(...delDia.map((cita) => crearCita(cita, false)));
    elementos.diaVacio.classList.toggle('hidden', delDia.length > 0);
    if (animar) animarEntrada([elementos.diaTitulo, ...elementos.diaLista.children, ...(delDia.length ? [] : [elementos.diaVacio])]);
  };

  const pintarMes = () => {
    elementos.mes.textContent = formatoMes.format(mes);
    const desfase = (mes.getDay() + 6) % 7; // la semana empieza el lunes
    const diasDelMes = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate();
    const celdas: HTMLElement[] = Array.from({ length: desfase }, () => crear('span'));
    for (let dia = 1; dia <= diasDelMes; dia++) {
      celdas.push(crearDia(new Date(mes.getFullYear(), mes.getMonth(), dia)));
    }
    elementos.grid.replaceChildren(...celdas);
  };

  const pintarProximas = () => {
    const ahora = new Date();
    const proximas = lista.filter((cita) => cita.fin >= ahora).slice(0, 4);
    elementos.proximas.replaceChildren(...proximas.map((cita) => crearCita(cita, true)));
    elementos.proximasVacio.classList.toggle('hidden', proximas.length > 0);
  };

  /* ---------- Vista ampliada (inspirada en un calendario que hace zoom al día elegido) ---------- */
  const ventana = raiz.querySelector<HTMLElement>('[data-agenda-ventana]');
  const volver = raiz.querySelector<HTMLButtonElement>('[data-agenda-volver]');
  const escritorio = matchMedia('(min-width: 768px)');
  const puedeAmpliar = () => escritorio.matches && Boolean(ventana);
  let ampliado = false;

  /** Escala la cuadrícula para que el día quede centrado y grande dentro de la ventana. */
  const ampliar = (celda: HTMLElement) => {
    const { grid } = elementos;
    const ancho = grid.clientWidth;
    const alto = grid.clientHeight;
    const escala = Math.min(ancho / celda.offsetWidth, alto / celda.offsetHeight) * 0.6;
    // offsetLeft/Top se miden desde la ventana (tiene relleno): se resta la posición de la cuadrícula.
    const centroX = celda.offsetLeft - grid.offsetLeft + celda.offsetWidth / 2;
    const centroY = celda.offsetTop - grid.offsetTop + celda.offsetHeight / 2;
    grid.style.transform = `translate(${ancho / 2 - centroX * escala}px, ${alto / 2 - centroY * escala}px) scale(${escala})`;
    grid.dataset.ampliado = 'true';
    ampliado = true;
    if (volver) volver.hidden = false;
  };

  /** Vuelve a la vista de todo el mes. `enfocar`: devuelve el foco al día elegido. */
  const alejar = (enfocar = false) => {
    if (!ampliado) return;
    elementos.grid.style.transform = '';
    elementos.grid.dataset.ampliado = 'false';
    ampliado = false;
    if (volver) volver.hidden = true;
    if (enfocar) elementos.grid.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus();
  };

  volver?.addEventListener('click', () => alejar(true));
  raiz.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && ampliado) alejar(true);
  });
  // Si cambia el tamaño, las medidas ya no sirven: vuelve al mes completo.
  window.addEventListener('resize', () => alejar());

  const cambiarMes = (salto: -1 | 1) => {
    alejar();
    mes = new Date(mes.getFullYear(), mes.getMonth() + salto, 1);
    pintarMes();
    animarMes(elementos.grid, elementos.mes, salto);
  };

  raiz.querySelector('[data-agenda-anterior]')?.addEventListener('click', () => cambiarMes(-1));
  raiz.querySelector('[data-agenda-siguiente]')?.addEventListener('click', () => cambiarMes(1));
  raiz.querySelector('[data-agenda-hoy]')?.addEventListener('click', () => {
    alejar();
    const otroMes = mes.getTime() !== new Date(hoy.getFullYear(), hoy.getMonth(), 1).getTime();
    const direccion = mes < hoy ? 1 : -1;
    mes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    seleccionado = hoy;
    pintarMes();
    pintarDia(true);
    if (otroMes) animarMes(elementos.grid, elementos.mes, direccion);
    else rebotar(elementos.grid.querySelector('[aria-pressed="true"]'));
  });

  pintarMes();
  pintarDia();
  pintarProximas();
  // Primera carga: los días aparecen en cascada y luego las citas.
  animarMes(elementos.grid, elementos.mes, 0);
  animarEntrada([...elementos.diaLista.children, ...elementos.proximas.children], 0.2);
}
