import { login } from '../data/login';
import { usuariosPrueba, contrasenaPrueba } from '../data/usuarios-prueba';
import { guardarSesion, obtenerSesion } from '../lib/sesion';
import { url } from '../lib/url';

type Campo = 'correo' | 'contrasena';

/**
 * Revisa las credenciales. Por ahora compara contra los usuarios de PRUEBA (solo frontend).
 * Fase 2: reemplazar por la llamada real al backend. Nunca guardar ni mostrar la contraseña.
 */
async function enviarCredenciales(datos: { correo: string; contrasena: string }): Promise<{ ok: boolean; mensaje: string }> {
  const usuario = usuariosPrueba.find((u) => u.correo === datos.correo.toLowerCase());
  if (!usuario || datos.contrasena !== contrasenaPrueba) {
    return { ok: false, mensaje: login.mensajes.credencialesInvalidas };
  }
  guardarSesion({ correo: usuario.correo, nombre: usuario.nombre });
  return { ok: true, mensaje: '' };
}

const irAlPanel = () => window.location.replace(url(login.rutaPanel));

/** Formulario de inicio de sesión: validación, mostrar/ocultar contraseña y envío (no son animaciones: funcionan siempre). */
export function iniciarLogin() {
  const formulario = document.querySelector<HTMLFormElement>('[data-login]');
  if (!formulario) return;

  // Si ya hay una sesión abierta, no tiene sentido volver a pedir los datos.
  if (obtenerSesion()) return irAlPanel();

  const campos = {
    correo: formulario.querySelector<HTMLInputElement>('#correo')!,
    contrasena: formulario.querySelector<HTMLInputElement>('#contrasena')!,
  };
  const estado = formulario.querySelector<HTMLElement>('[data-login-estado]');
  const enviar = formulario.querySelector<HTMLButtonElement>('[data-login-enviar]');
  const textoEnviar = formulario.querySelector<HTMLElement>('[data-login-enviar-texto]');

  /** Mensaje de error de un campo, o '' si es válido. */
  const validar = (campo: Campo): string => {
    const { validity } = campos[campo];
    if (campo === 'correo') {
      if (validity.valueMissing) return login.mensajes.correoVacio;
      if (validity.typeMismatch) return login.mensajes.correoInvalido;
      return '';
    }
    return validity.valueMissing ? login.mensajes.contrasenaVacia : '';
  };

  const mostrarError = (campo: Campo, mensaje: string) => {
    const error = formulario.querySelector<HTMLElement>(`[data-login-error="${campo}"]`);
    campos[campo].setAttribute('aria-invalid', String(Boolean(mensaje)));
    if (!error) return;
    error.textContent = mensaje;
    error.classList.toggle('hidden', !mensaje);
  };

  const mostrarEstado = (mensaje: string) => {
    if (!estado) return;
    estado.classList.toggle('hidden', !mensaje);
    estado.textContent = mensaje;
  };

  const ocupado = (si: boolean) => {
    if (!enviar) return;
    enviar.disabled = si;
    if (textoEnviar) textoEnviar.textContent = si ? login.enviando : login.enviar;
  };

  // Al corregir un campo con error, el mensaje se actualiza mientras se escribe.
  (Object.keys(campos) as Campo[]).forEach((campo) => {
    campos[campo].addEventListener('input', () => {
      if (campos[campo].getAttribute('aria-invalid') === 'true') mostrarError(campo, validar(campo));
      mostrarEstado('');
    });
  });

  // Mostrar u ocultar la contraseña
  const ver = formulario.querySelector<HTMLButtonElement>('[data-login-ver]');
  if (ver) {
    ver.addEventListener('click', () => {
      const visible = campos.contrasena.type === 'password';
      campos.contrasena.type = visible ? 'text' : 'password';
      ver.setAttribute('aria-pressed', String(visible));
      ver.setAttribute('aria-label', visible ? login.ocultarContrasena : login.verContrasena);
      ver.querySelector('.icono-mostrar')?.classList.toggle('hidden', visible);
      ver.querySelector('.icono-ocultar')?.classList.toggle('hidden', !visible);
    });
  }

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    mostrarEstado('');

    const errores = (Object.keys(campos) as Campo[]).map((campo) => {
      const mensaje = validar(campo);
      mostrarError(campo, mensaje);
      return { campo, mensaje };
    });
    const primero = errores.find((error) => error.mensaje);
    if (primero) {
      campos[primero.campo].focus();
      return;
    }

    ocupado(true);
    const respuesta = await enviarCredenciales({
      correo: campos.correo.value.trim(),
      contrasena: campos.contrasena.value,
    });
    if (respuesta.ok) return irAlPanel(); // el botón sigue en "Ingresando…" mientras cambia de página
    ocupado(false);
    mostrarEstado(respuesta.mensaje);
    campos.contrasena.select();
  });
}
