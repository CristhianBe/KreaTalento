/**
 * Panel administrativo (solo frontend por ahora).
 * Las notificaciones, citas y clientes de este archivo son DATOS DE EJEMPLO para diseñar la interfaz:
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
  anchoMenu: 'Ancho del menú lateral',
  anchoMenuAyuda: 'Arrastra para cambiar el ancho · doble clic para restablecerlo',
  /** Saludo de la barra superior según la hora: "Buenas noches, Sebas". */
  saludos: { manana: 'Buenos días', tarde: 'Buenas tardes', noche: 'Buenas noches' },
};

/** Accesos de la barra lateral. `ruta` se pasa por `url()`. Agregar aquí las secciones nuevas. */
export const navegacionPanel = [
  { id: 'notificaciones', etiqueta: 'Notificaciones', ruta: 'panel', icono: 'campana' },
  { id: 'agenda', etiqueta: 'Agenda', ruta: 'panel/agenda', icono: 'calendario' },
  { id: 'clientes', etiqueta: 'Clientes', ruta: 'panel/clientes', icono: 'personas' },
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

/* ---------- Clientes ---------- */

export type EstadoCliente = 'nuevo' | 'concurrente';

export const estadosCliente: Record<EstadoCliente, string> = {
  nuevo: 'Nuevo',
  concurrente: 'Concurrente',
};

export const textosClientes = {
  titulo: 'Clientes',
  texto: 'Personas y empresas que acompañamos, con su estado y una breve descripción.',
  resumen: {
    total: 'Clientes en total',
    nuevo: 'Clientes nuevos',
    concurrente: 'Clientes concurrentes',
  },
  filtros: [
    { id: 'todos', etiqueta: 'Todos' },
    { id: 'nuevo', etiqueta: 'Nuevos' },
    { id: 'concurrente', etiqueta: 'Concurrentes' },
  ],
  buscar: 'Buscar cliente o descripción',
  columnas: { cliente: 'Cliente', estado: 'Estado', descripcion: 'Descripción' },
  ordenar: 'Ordenar por nombre',
  verDetalles: 'Ver detalles de',
  /** Ventana de detalles de un cliente. */
  detalle: {
    cerrar: 'Cerrar',
    servicio: 'Servicio',
    desde: 'Cliente desde',
    descripcion: 'Descripción',
    documentos: 'Documentos',
    sinDocumentos: 'Este cliente todavía no tiene documentos.',
    descargar: 'Descargar',
    formato: 'PDF',
  },
  vacio: 'No hay clientes que coincidan con la búsqueda.',
  /** "Mostrando 5 de 8 clientes". */
  mostrando: (visibles: number, total: number) => `Mostrando ${visibles} de ${total} clientes`,
};

/**
 * PDF de ejemplo que descargan todos los documentos de prueba (`public/documentos/`).
 * Con el backend, cada documento tendrá su propio archivo.
 */
export const documentoEjemplo = 'documentos/documento-ejemplo.pdf';

export interface DocumentoCliente {
  nombre: string;
  /** Fecha en formato AAAA-MM-DD. */
  fecha: string;
}

/** DATOS DE EJEMPLO (nombres ficticios). Con el backend vendrán de la base de datos. */
export const clientes: {
  id: string;
  nombre: string;
  apellido: string;
  estado: EstadoCliente;
  servicio: string;
  /** Mes en que empezó a trabajar con Krea Talento (AAAA-MM). */
  desde: string;
  descripcion: string;
  documentos: DocumentoCliente[];
}[] = [
  {
    id: 'cl1', nombre: 'María', apellido: 'Fernández', estado: 'concurrente', servicio: 'Coaching', desde: '2026-08',
    descripcion: 'Proceso de coaching (sesión 4 de 10) enfocado en liderazgo de equipos.',
    documentos: [
      { nombre: 'Contrato de servicios de coaching', fecha: '2026-08-04' },
      { nombre: 'Plan de desarrollo', fecha: '2026-09-15' },
      { nombre: 'Informe de avance, sesión 4', fecha: '2026-11-10' },
    ],
  },
  {
    id: 'cl2', nombre: 'José', apellido: 'Araya', estado: 'nuevo', servicio: 'Asesoría laboral', desde: '2026-11',
    descripcion: 'Solicitó asesoría laboral para revisar planillas y pagos a la CCSS.',
    documentos: [{ nombre: 'Solicitud de propuesta', fecha: '2026-11-18' }],
  },
  {
    id: 'cl3', nombre: 'Andrea', apellido: 'Solano', estado: 'concurrente', servicio: 'Capacitación', desde: '2026-03',
    descripcion: 'Capacitaciones trimestrales para el equipo de atención al cliente.',
    documentos: [
      { nombre: 'Propuesta de capacitación 2026', fecha: '2026-03-02' },
      { nombre: 'Lista de asistencia, taller de octubre', fecha: '2026-10-21' },
    ],
  },
  {
    id: 'cl4', nombre: 'Luis', apellido: 'Vargas', estado: 'nuevo', servicio: 'Preparación de CV y entrevistas', desde: '2026-11',
    descripcion: 'Preparación de CV y entrevista para un puesto de jefatura.',
    documentos: [{ nombre: 'CV para revisión', fecha: '2026-11-20' }],
  },
  {
    id: 'cl5', nombre: 'Daniela', apellido: 'Mora', estado: 'concurrente', servicio: 'Gestión del talento', desde: '2026-05',
    descripcion: 'Gestión del talento: perfiles de puesto y evaluación de desempeño.',
    documentos: [
      { nombre: 'Perfiles de puesto', fecha: '2026-06-10' },
      { nombre: 'Formato de evaluación de desempeño', fecha: '2026-09-01' },
    ],
  },
  {
    id: 'cl6', nombre: 'Carlos', apellido: 'Jiménez', estado: 'nuevo', servicio: 'Asesoría laboral', desde: '2026-11',
    descripcion: 'Consulta sobre el cálculo de una liquidación y el proceso disciplinario.',
    documentos: [],
  },
  {
    id: 'cl7', nombre: 'Valeria', apellido: 'Quesada', estado: 'concurrente', servicio: 'Coaching', desde: '2026-02',
    descripcion: 'Coaching de desarrollo profesional con seguimiento mensual.',
    documentos: [
      { nombre: 'Contrato de servicios de coaching', fecha: '2026-02-08' },
      { nombre: 'Informe de seguimiento, octubre', fecha: '2026-10-30' },
    ],
  },
  {
    id: 'cl8', nombre: 'Esteban', apellido: 'Rodríguez', estado: 'nuevo', servicio: 'Capacitación', desde: '2026-11',
    descripcion: 'Interesado en un taller de comunicación asertiva para su empresa.',
    documentos: [],
  },
];
