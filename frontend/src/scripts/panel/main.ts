import { iniciarSesionPanel } from './sesion';
import { iniciarTema } from './tema';
import { iniciarMenuPanel } from './menu';
import { iniciarRedimensionLateral } from './redimensionar';
import { iniciarNotificaciones } from './notificaciones';
import { iniciarAgenda } from './agenda';
import { iniciarClientes } from './clientes';

// Panel administrativo: solo funcionalidad, sin animaciones por ahora.
// Cada función revisa si su sección existe en la página y, si no, no hace nada.
iniciarSesionPanel();
iniciarTema();
iniciarMenuPanel();
iniciarRedimensionLateral();
iniciarNotificaciones();
iniciarAgenda();
iniciarClientes();
