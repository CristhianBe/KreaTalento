import { login } from '../../data/login';
import { panel } from '../../data/panel';
import { obtenerSesion, cerrarSesion, iniciales } from '../../lib/sesion';
import { url } from '../../lib/url';

const irAlLogin = () => window.location.replace(url(login.ruta));

/** Muestra el usuario de la sesión de prueba y activa "Cerrar sesión". */
export function iniciarSesionPanel() {
  const sesion = obtenerSesion();
  if (!sesion) return irAlLogin();

  document.querySelectorAll('[data-panel-nombre]').forEach((el) => (el.textContent = sesion.nombre));
  document.querySelectorAll('[data-panel-correo]').forEach((el) => (el.textContent = sesion.correo));
  const hora = new Date().getHours();
  const saludo = hora < 12 ? panel.saludos.manana : hora < 19 ? panel.saludos.tarde : panel.saludos.noche;
  document.querySelectorAll('[data-panel-saludo]').forEach((el) => (el.textContent = `${saludo}, ${sesion.nombre}`));
  document.querySelectorAll('[data-panel-iniciales]').forEach((el) => (el.textContent = iniciales(sesion.nombre)));

  document.querySelectorAll('[data-panel-salir]').forEach((boton) => {
    boton.addEventListener('click', () => {
      cerrarSesion();
      irAlLogin();
    });
  });
}
