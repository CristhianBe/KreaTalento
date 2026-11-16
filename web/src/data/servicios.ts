/**
 * Servicios reales de Krea Talento. NO incluye reclutamiento.
 * Sin precios: todo se cotiza por paquete o proyecto.
 */
export type Servicio = {
  id: string;
  icono: string;
  titulo: string;
  publico: 'Pymes' | 'Profesionales' | 'Pymes y profesionales';
  resumen: string;
  incluye: string[];
};

export const servicios: Servicio[] = [
  {
    id: 'asesoria-laboral',
    icono: 'balanza',
    titulo: 'Asesoría laboral para pymes',
    publico: 'Pymes',
    resumen: 'Te ayudamos a gestionar la relación laboral con tu equipo de forma ordenada y conforme a la normativa costarricense.',
    incluye: ['Orientación en temas laborales del día a día', 'Revisión y mejora de procesos de RR. HH.', 'Acompañamiento en decisiones sobre personal'],
  },
  {
    id: 'gestion-talento',
    icono: 'personas',
    titulo: 'Gestión del talento',
    publico: 'Pymes',
    resumen: 'Estructura y herramientas para que tu equipo tenga claridad, crezca y se quede.',
    incluye: ['Perfiles y descripciones de puesto', 'Evaluación del desempeño', 'Planes de desarrollo y clima laboral'],
  },
  {
    id: 'capacitacion',
    icono: 'pizarra',
    titulo: 'Capacitación',
    publico: 'Pymes',
    resumen: 'Talleres prácticos diseñados según las necesidades reales de tu organización.',
    incluye: ['Diagnóstico de necesidades', 'Talleres a la medida', 'Seguimiento de aprendizajes'],
  },
  {
    id: 'coaching',
    icono: 'brujula',
    titulo: 'Coaching',
    publico: 'Pymes y profesionales',
    resumen: 'Un proceso de 10 sesiones para definir metas, trabajar en ellas y medir tu avance.',
    incluye: ['Programa de 10 sesiones', 'Objetivos claros desde el inicio', 'Sesiones en línea por Teams'],
  },
  {
    id: 'cv-entrevistas',
    icono: 'documento',
    titulo: 'Preparación de CV y entrevistas',
    publico: 'Profesionales',
    resumen: 'Presenta tu experiencia con claridad y llega preparado a tus próximas entrevistas.',
    incluye: ['Revisión y redacción de CV', 'Práctica de entrevistas', 'Recomendaciones personalizadas'],
  },
];

export const notaServicios = 'No manejamos precios fijos: preparamos una propuesta cotizada por paquete o por proyecto según tus necesidades.';
