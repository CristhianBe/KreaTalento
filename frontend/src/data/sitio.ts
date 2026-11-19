/** Textos generales del sitio (SEO, encabezado, pie). */
export const sitio = {
  nombre: 'Krea Talento',
  lema: 'Consultoría de recursos humanos para empresas y profesionales en Costa Rica',
  descripcion:
    'Krea Talento acompaña a empresas y profesionales en Costa Rica con asesoría laboral, gestión del talento, capacitación, coaching y preparación de CV y entrevistas.',
  idioma: 'es-CR',
};

export const navegacion = [
  { etiqueta: 'Servicios', href: '#servicios' },
  { etiqueta: 'Cómo trabajamos', href: '#proceso' },
  { etiqueta: 'Nosotros', href: '#nosotros' },
  { etiqueta: 'Contacto', href: '#contacto' },
];

export const hero = {
  antetitulo: 'Consultoría de recursos humanos · Costa Rica',
  titulo: 'Personas que crecen, empresas que avanzan',
  texto:
    'Acompañamos a empresas y profesionales con asesoría laboral, gestión del talento, capacitación y coaching, con soluciones a la medida de cada etapa.',
  ctaPrincipal: 'Conversemos',
  ctaSecundario: 'Ver servicios',
  /** Frase con palabra que va rotando bajo el título. */
  rotativo: {
    prefijo: 'Te acompañamos en',
    palabras: ['asesoría laboral', 'gestión del talento', 'capacitación', 'coaching', 'tu CV y entrevistas'],
  },
};

/** Lema de marca (viene del logo). */
export const lema = 'Hacemos crecer el talento de tu empresa.';

/** Segunda fila de la cinta animada (la primera usa los nombres de los servicios). */
export const cinta = ['Personas que crecen', 'Empresas que avanzan', 'Hacemos crecer el talento'];
