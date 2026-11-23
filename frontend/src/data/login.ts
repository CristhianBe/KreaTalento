/**
 * Textos de la pantalla de inicio de sesión.
 * El sitio aún no tiene backend (fase 2): por ahora el login compara contra
 * los usuarios de prueba de `usuarios-prueba.ts` (ver `src/scripts/login.ts`).
 */
export const login = {
  /** Ruta de la página (se le antepone el `base` con `url()`). */
  ruta: 'login',
  /** Página a la que se entra después de iniciar sesión. */
  rutaPanel: 'panel',
  /** Texto del botón del encabezado. */
  boton: 'Iniciar sesión',
  titulo: 'Iniciar sesión',
  texto: 'Ingresa con tu correo y contraseña para continuar.',
  /** Panel azul de la izquierda (solo en pantallas grandes). */
  panel: {
    titulo: 'Te damos la bienvenida',
    texto: 'Tu espacio para dar seguimiento a tus procesos con Krea Talento.',
  },
  campos: {
    correo: { etiqueta: 'Correo electrónico', placeholder: 'nombre@empresa.com' },
    contrasena: { etiqueta: 'Contraseña', placeholder: 'Tu contraseña' },
  },
  verContrasena: 'Mostrar contraseña',
  ocultarContrasena: 'Ocultar contraseña',
  enviar: 'Ingresar',
  enviando: 'Ingresando…',
  volver: 'Volver al inicio',
  mensajes: {
    correoVacio: 'Escribe tu correo electrónico.',
    correoInvalido: 'Revisa el correo; debe tener un formato como nombre@empresa.com.',
    contrasenaVacia: 'Escribe tu contraseña.',
    credencialesInvalidas: 'El correo o la contraseña no son correctos. Revisa los datos e inténtalo de nuevo.',
  },
};
