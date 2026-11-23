import { iniciarSesionPanel } from './sesion';
import { iniciarTema } from './tema';
import { iniciarMenuPanel } from './menu';
import { iniciarContadorNotificaciones, iniciarNotificaciones } from './notificaciones';
import { iniciarAgenda } from './agenda';

// Panel administrativo: solo funcionalidad, sin animaciones por ahora.
// Cada función revisa si su sección existe en la página y, si no, no hace nada.
iniciarSesionPanel();
iniciarTema();
iniciarMenuPanel();
iniciarContadorNotificaciones();
iniciarNotificaciones();
iniciarAgenda();
