/**
 * Textos de la pantalla de inicio de sesión.
 * El sitio aún no tiene backend (fase 2): el formulario valida los datos,
 * pero todavía no inicia sesión de verdad (ver `src/scripts/login.ts`).
 */
export const login = {
  /** Ruta de la página (se le antepone el `base` con `url()`). */
  ruta: 'login',
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
    /** Se muestra al enviar mientras no exista el backend. */
    noDisponible: 'El acceso para clientes todavía no está habilitado. Si necesitas ayuda, contáctanos.',
  },
};
