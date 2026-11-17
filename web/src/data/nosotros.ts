/**
 * Sección "Nosotros".
 * Misión, visión, valores y datos de la fundadora los define la dueña.
 * Mientras un campo esté vacío ('' o []), simplemente NO se muestra.
 */
export const nosotros = {
  intro:
    'Krea Talento es una consultoría de recursos humanos en Costa Rica que acompaña a pymes y profesionales a desarrollar su talento y fortalecer sus equipos.',
  mision: '',
  vision: '',
  valores: [] as { titulo: string; texto: string }[],
  /** Presentación de la fundadora. Pendiente de la dueña. */
  fundadora: {
    nombre: '',
    cargo: '',
    bio: '',
  },
};
