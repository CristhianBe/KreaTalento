/**
 * Datos de contacto de Krea Talento.
 * REGLA: no inventar datos. Deja un campo vacío ('') hasta tener el dato real:
 * los componentes ocultan automáticamente lo que esté vacío.
 */
export const contacto = {
  /** Número de WhatsApp Business en formato internacional, solo dígitos. Ej.: '50688887777'. PENDIENTE. */
  whatsapp: '',
  /** Mensaje inicial que se precarga al abrir WhatsApp. */
  mensajeWhatsapp: 'Hola, Krea Talento. Me gustaría recibir información sobre sus servicios.',
  /** Correo de contacto. PENDIENTE. */
  correo: '',
  /** Enlace de agenda para citas por Microsoft Teams (Bookings u otro). PENDIENTE. */
  agendaTeams: '',
  /** Ubicación general (opcional). */
  ubicacion: 'Costa Rica',
  /** Horario de atención. PENDIENTE. */
  horario: '',
  /** Redes sociales: URL completa o ''. */
  redes: {
    linkedin: '',
    facebook: '',
    instagram: '',
  },
};

/** Enlace wa.me listo para usar, o '' si aún no hay número. */
export function enlaceWhatsapp(mensaje = contacto.mensajeWhatsapp): string {
  const numero = contacto.whatsapp.replace(/\D/g, '');
  if (!numero) return '';
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/** true si hay al menos un canal de contacto publicado. */
export const hayCanales = Boolean(contacto.whatsapp || contacto.correo || contacto.agendaTeams);
