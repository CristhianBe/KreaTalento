import { login } from '../../data/login';
import { obtenerSesion, cerrarSesion } from '../../lib/sesion';
import { url } from '../../lib/url';

const irAlLogin = () => window.location.replace(url(login.ruta));

/**
 * Sin sesión de prueba → al login; activa "Cerrar sesión".
 * El saludo y el avatar se pintan antes, con el script en línea de BarraSuperior.
 */
export function iniciarSesionPanel() {
  if (!obtenerSesion()) return irAlLogin();

  document.querySelectorAll('[data-panel-salir]').forEach((boton) => {
    boton.addEventListener('click', () => {
      cerrarSesion();
      irAlLogin();
    });
  });
}
