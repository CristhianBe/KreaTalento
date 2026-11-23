import { iniciarSesionPanel } from './sesion';
import { iniciarTema } from './tema';
import { iniciarMenuPanel } from './menu';
import { iniciarRedimensionLateral } from './redimensionar';
import { iniciarNotificaciones } from './notificaciones';
import { iniciarAgenda } from './agenda';
import { iniciarClientes } from './clientes';

// Panel administrativo. Las animaciones (sutiles) están en ./animaciones.ts y en las clases
// `.panel-*` de base.css; todas respetan "reducir movimiento".
// Cada función revisa si su sección existe en la página y, si no, no hace nada.
iniciarSesionPanel();
iniciarTema();
iniciarMenuPanel();
iniciarRedimensionLateral();
iniciarNotificaciones();
iniciarAgenda();
iniciarClientes();
