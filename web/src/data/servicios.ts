/**
 * Servicios reales de Krea Talento. NO incluye reclutamiento.
 * Sin precios: todo se cotiza por paquete o proyecto.
 *
 * - `gancho`: frase corta que se ve en la tarjeta (genera interés).
 * - `detalle`, `incluye` y `modalidad`: se muestran al abrir la tarjeta.
 *   `modalidad` vacía ('') = no se muestra.
 * Contenido basado en la reunión con la dueña (docs/ y Preguntas.docx, 11-nov-2026).
 */
export type Servicio = {
  id: string;
  icono: string;
  titulo: string;
  publico: 'Empresas' | 'Profesionales' | 'Empresas y profesionales';
  gancho: string;
  detalle: string;
  incluye: string[];
  modalidad: string;
};

export const servicios: Servicio[] = [
  {
    id: 'asesoria-laboral',
    icono: 'balanza',
    titulo: 'Asesoría laboral',
    publico: 'Empresas',
    gancho: 'Decisiones laborales con respaldo.',
    detalle: 'Te ayudamos a gestionar la relación laboral con tu equipo de forma ordenada y conforme a la normativa costarricense.',
    incluye: [
      'Revisión de tu caso y diagnóstico de la empresa',
      'Planillas, reportes y pagos a la CCSS al día',
      'Marco disciplinario conforme a la legislación laboral',
      'Cálculo de liquidaciones y acompañamiento en despidos',
    ],
    modalidad: 'Híbrida: presencial o virtual',
  },
  {
    id: 'gestion-talento',
    icono: 'personas',
    titulo: 'Gestión del talento',
    publico: 'Empresas',
    gancho: 'Un equipo que crece y se queda.',
    detalle: 'Estructura y herramientas para que tu equipo tenga claridad, crezca y se quede.',
    incluye: ['Perfiles y descripciones de puesto', 'Evaluación del desempeño', 'Planes de desarrollo y clima laboral'],
    modalidad: 'Híbrida: presencial o virtual',
  },
  {
    id: 'capacitacion',
    icono: 'pizarra',
    titulo: 'Capacitación',
    publico: 'Empresas',
    gancho: 'Talleres hechos a tu medida.',
    detalle: 'Talleres prácticos diseñados según las necesidades reales de tu organización.',
    incluye: ['Diagnóstico de necesidades', 'Talleres a la medida', 'Seguimiento de aprendizajes'],
    modalidad: 'Híbrida: presencial o virtual',
  },
  {
    id: 'coaching',
    icono: 'brujula',
    titulo: 'Coaching',
    publico: 'Empresas y profesionales',
    gancho: '10 sesiones para avanzar con claridad.',
    detalle: 'Acompañamiento para trabajar un área específica de tu desarrollo profesional, con seguimiento en cada paso: aprender a soltar el control y quedarte con la responsabilidad.',
    incluye: ['Programa de 10 sesiones por persona', 'Objetivos claros desde el inicio', 'Seguimiento de tu avance'],
    modalidad: 'Virtual, por Microsoft Teams',
  },
  {
    id: 'cv-entrevistas',
    icono: 'documento',
    titulo: 'CV y entrevistas',
    publico: 'Profesionales',
    gancho: 'Llega preparado a tu próxima oportunidad.',
    detalle: 'Presenta tu experiencia con claridad y llega preparado a tus próximas entrevistas.',
    incluye: ['Revisión y mejora de tu CV', 'Preparación para entrevistas', 'Preguntas frecuentes según el puesto', 'Herramientas para destacar en el proceso'],
    modalidad: '',
  },
];

export const notaServicios = 'Sin precios fijos: preparamos una propuesta por paquete o por proyecto según lo que necesites.';
