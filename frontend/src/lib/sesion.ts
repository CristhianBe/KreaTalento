/**
 * Sesión de PRUEBA guardada en sessionStorage (se borra al cerrar la pestaña).
 * Solo para el frontend: no protege nada de verdad. La sesión real la dará el backend (fase 2).
 */
export const claveSesion = 'kt-sesion';

export interface Sesion {
  correo: string;
  nombre: string;
}

/** Sesión activa, o null si no hay (o si el navegador bloquea sessionStorage). */
export function obtenerSesion(): Sesion | null {
  try {
    const guardada = sessionStorage.getItem(claveSesion);
    return guardada ? (JSON.parse(guardada) as Sesion) : null;
  } catch {
    return null;
  }
}

export function guardarSesion(sesion: Sesion) {
  try {
    sessionStorage.setItem(claveSesion, JSON.stringify(sesion));
  } catch {}
}

export function cerrarSesion() {
  try {
    sessionStorage.removeItem(claveSesion);
  } catch {}
}
