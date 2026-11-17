/**
 * Servicios reales de Krea Talento. NO incluye reclutamiento.
 * Sin precios: todo se cotiza por paquete o proyecto.
 *
 * - `gancho`: frase corta que se ve en la tarjeta (genera interés).
 * - `detalle` e `incluye`: se muestran al abrir la tarjeta.
 */
export type Servicio = {
  id: string;
  icono: string;
  titulo: string;
  publico: 'Pymes' | 'Profesionales' | 'Pymes y profesionales';
  gancho: string;
  detalle: string;
  incluye: string[];
};

export const servicios: Servicio[] = [
  {
    id: 'asesoria-laboral',
    icono: 'balanza',
    titulo: 'Asesoría laboral',
    publico: 'Pymes',
    gancho: 'Decisiones laborales con respaldo.',
    detalle: 'Te ayudamos a gestionar la relación laboral con tu equipo de forma ordenada y conforme a la normativa costarricense.',
    incluye: ['Orientación en temas laborales del día a día', 'Revisión y mejora de procesos de RR. HH.', 'Acompañamiento en decisiones sobre personal'],
  },
  {
    id: 'gestion-talento',
    icono: 'personas',
    titulo: 'Gestión del talento',
    publico: 'Pymes',
    gancho: 'Un equipo que crece y se queda.',
    detalle: 'Estructura y herramientas para que tu equipo tenga claridad, crezca y se quede.',
    incluye: ['Perfiles y descripciones de puesto', 'Evaluación del desempeño', 'Planes de desarrollo y clima laboral'],
  },
  {
    id: 'capacitacion',
    icono: 'pizarra',
    titulo: 'Capacitación',
    publico: 'Pymes',
    gancho: 'Talleres hechos a tu medida.',
    detalle: 'Talleres prácticos diseñados según las necesidades reales de tu organización.',
    incluye: ['Diagnóstico de necesidades', 'Talleres a la medida', 'Seguimiento de aprendizajes'],
  },
  {
    id: 'coaching',
    icono: 'brujula',
    titulo: 'Coaching',
    publico: 'Pymes y profesionales',
    gancho: '10 sesiones para avanzar con claridad.',
    detalle: 'Un proceso de 10 sesiones para definir metas, trabajar en ellas y medir tu avance.',
    incluye: ['Programa de 10 sesiones', 'Objetivos claros desde el inicio', 'Sesiones en línea por Teams'],
  },
  {
    id: 'cv-entrevistas',
    icono: 'documento',
    titulo: 'CV y entrevistas',
    publico: 'Profesionales',
    gancho: 'Llega preparado a tu próxima oportunidad.',
    detalle: 'Presenta tu experiencia con claridad y llega preparado a tus próximas entrevistas.',
    incluye: ['Revisión y redacción de CV', 'Práctica de entrevistas', 'Recomendaciones personalizadas'],
  },
];

export const notaServicios = 'Sin precios fijos: preparamos una propuesta por paquete o por proyecto según lo que necesites.';
