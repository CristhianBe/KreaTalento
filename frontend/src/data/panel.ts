/**
 * Panel administrativo (solo frontend por ahora).
 * Las notificaciones y citas de este archivo son DATOS DE EJEMPLO para diseñar la interfaz:
 * se reemplazan por los del backend en la fase 2. No poner aquí datos reales de clientes.
 */
export const panel = {
  nombre: 'Panel',
  seccionPrincipal: 'Principal',
  abrirMenu: 'Abrir menú',
  cerrarMenu: 'Cerrar menú',
  volverSitio: 'Ver el sitio',
  cerrarSesion: 'Cerrar sesión',
  modoNoche: 'Modo noche',
  /** Saludo de la barra superior según la hora: "Buenas noches, Sebas". */
  saludos: { manana: 'Buenos días', tarde: 'Buenas tardes', noche: 'Buenas noches' },
};

/** Accesos de la barra lateral. `ruta` se pasa por `url()`. Agregar aquí las secciones nuevas. */
export const navegacionPanel = [
  { id: 'notificaciones', etiqueta: 'Notificaciones', ruta: 'panel', icono: 'campana' },
  { id: 'agenda', etiqueta: 'Agenda', ruta: 'panel/agenda', icono: 'calendario' },
] as const;

export type SeccionPanel = (typeof navegacionPanel)[number]['id'];

/* ---------- Notificaciones ---------- */

export type TipoNotificacion = 'cita' | 'mensaje' | 'documento' | 'recordatorio';

export const tiposNotificacion: Record<TipoNotificacion, { etiqueta: string; icono: string }> = {
  cita: { etiqueta: 'Cita', icono: 'calendario' },
  mensaje: { etiqueta: 'Mensaje', icono: 'mensaje' },
  documento: { etiqueta: 'Documento', icono: 'documento' },
  recordatorio: { etiqueta: 'Recordatorio', icono: 'reloj' },
};

export const textosNotificaciones = {
  titulo: 'Notificaciones',
  texto: 'Lo más reciente de tus clientes, citas y procesos.',
  filtros: [
    { id: 'todas', etiqueta: 'Todas' },
    { id: 'no-leidas', etiqueta: 'No leídas' },
  ],
  marcarTodas: 'Marcar todas como leídas',
  marcarLeida: 'Marcar como leída',
  noLeida: 'No leída',
  vacio: 'Estás al día: no hay notificaciones sin leer.',
};

/** DATOS DE EJEMPLO. */
export const notificaciones: {
  id: string;
  tipo: TipoNotificacion;
  titulo: string;
  texto: string;
  cuando: string;
  leida: boolean;
}[] = [
  { id: 'n1', tipo: 'cita', titulo: 'Nueva cita agendada', texto: 'Se agendó una sesión de coaching por Microsoft Teams para hoy.', cuando: 'Hace 15 min', leida: false },
  { id: 'n2', tipo: 'mensaje', titulo: 'Nueva solicitud de propuesta', texto: 'Una empresa pidió información sobre asesoría laboral desde el sitio web.', cuando: 'Hace 1 hora', leida: false },
  { id: 'n3', tipo: 'recordatorio', titulo: 'Recordatorio de sesión', texto: 'Mañana tienes una asesoría laboral a las 2:00 p. m.', cuando: 'Hace 3 horas', leida: false },
  { id: 'n4', tipo: 'documento', titulo: 'Documento recibido', texto: 'Se compartió un CV para revisarlo antes de la próxima sesión.', cuando: 'Ayer', leida: true },
  { id: 'n5', tipo: 'cita', titulo: 'Cita reprogramada', texto: 'Una sesión de preparación de entrevista se movió a otro día.', cuando: 'Hace 2 días', leida: true },
  { id: 'n6', tipo: 'recordatorio', titulo: 'Seguimiento pendiente', texto: 'Pasaron dos semanas desde la última sesión de un proceso de coaching.', cuando: 'Hace 3 días', leida: true },
];

/* ---------- Agenda ---------- */

export const textosAgenda = {
  titulo: 'Agenda',
  texto: 'Tus citas y sesiones del mes.',
  hoy: 'Hoy',
  mesAnterior: 'Mes anterior',
  mesSiguiente: 'Mes siguiente',
  diasSemana: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  programadas: 'Programadas',
  sinCitasDia: 'No hay citas este día.',
  proximas: 'Próximas citas',
  sinProximas: 'No hay citas próximas.',
  minutos: 'min',
  cita: 'cita',
  citas: 'citas',
  /** "+2 más" cuando un día tiene más citas de las que caben en la celda. */
  mas: 'más',
};

/** Tipos de cita: cada uno tiene su color en la agenda (`scripts/panel/agenda.ts`). */
export type TipoCita = 'coaching' | 'asesoria' | 'capacitacion' | 'cv' | 'talento';

/**
 * DATOS DE EJEMPLO. `enDias` cuenta desde hoy (0 = hoy, 1 = mañana…) para que la
 * agenda siempre tenga algo que mostrar; con el backend serán fechas reales.
 */
export const citas: {
  id: string;
  tipo: TipoCita;
  titulo: string;
  detalle: string;
  enDias: number;
  hora: string;
  duracion: number;
}[] = [
  { id: 'c1', tipo: 'coaching', titulo: 'Sesión de coaching', detalle: 'Sesión 3 de 10 · Microsoft Teams', enDias: 0, hora: '10:00', duracion: 60 },
  { id: 'c2', tipo: 'asesoria', titulo: 'Asesoría laboral', detalle: 'Revisión de planillas · Presencial', enDias: 1, hora: '14:00', duracion: 90 },
  { id: 'c3', tipo: 'cv', titulo: 'Preparación de entrevista', detalle: 'Microsoft Teams', enDias: 1, hora: '17:00', duracion: 45 },
  { id: 'c4', tipo: 'capacitacion', titulo: 'Capacitación', detalle: 'Taller para equipo · Presencial', enDias: 3, hora: '09:00', duracion: 120 },
  { id: 'c5', tipo: 'cv', titulo: 'Revisión de CV', detalle: 'Microsoft Teams', enDias: 6, hora: '11:30', duracion: 45 },
  { id: 'c6', tipo: 'coaching', titulo: 'Sesión de coaching', detalle: 'Sesión 4 de 10 · Microsoft Teams', enDias: 7, hora: '10:00', duracion: 60 },
  { id: 'c7', tipo: 'talento', titulo: 'Gestión del talento', detalle: 'Evaluación de desempeño · Híbrida', enDias: 12, hora: '15:00', duracion: 90 },
];
