# Krea Talento — contexto del proyecto

Sitio web de **Krea Talento**, consultoría de recursos humanos en Costa Rica (empresas, principalmente pequeñas, y profesionales). No usar la palabra "pymes" en el sitio.
Servicios reales: asesoría laboral para empresas, gestión del talento, capacitación, coaching (10 sesiones), preparación de CV y entrevistas. NO ofrece reclutamiento.

## Estructura del repo
- `frontend/` sitio público + panel (Astro + Tailwind v4 + GSAP + Lenis). Se corre desde `frontend/` con `npm run dev` (http://localhost:4321/KreaTalento/).
- `docs/`   notas de reunión, alcance y decisiones.
- `backend/` fase 2 (portal con login real y base de datos), aún sin definir. Se decide con presupuesto y clientes reales.

## Estructura de `frontend/src`
- `components/{layout,sections,ui,panel}` · `layouts/` · `pages/` · `content/articulos/` (Markdown, futuro)
- `data/` textos editables (contacto, servicios, nosotros, proceso, artículos, pilares). Los textos NO van dentro de los componentes.
- `scripts/animations/` un módulo por animación; `scripts/main.ts` los inicia dentro de `gsap.matchMedia` con `prefers-reduced-motion: no-preference`.
- `styles/` `tokens.css` (colores y tipografía del diseño de Stitch), `base.css`, `global.css`.

## Diseño (reglas de la clienta)
- Fondo blanco, azul y celeste, poco ruido visual.
- PROHIBIDO: negro, verde y amarillo.
- Logo oficial (elegido por la clienta, nov 2026; trae turquesa, coral y verde: es excepción a la regla de colores, solo en el logo): `frontend/src/assets/images/logo-krea-talento.png`, versión blanca `logo-krea-talento-blanco.png`, completo con lema `logo-krea-talento-completo.png` (intro) e isotipo `isotipo-krea-talento.png` (favicon). Lema de marca: "Hacemos crecer el talento de tu empresa."
- Animaciones bonitas pero sutiles; siempre con alternativa para "reducir movimiento".

## Reglas de contenido
- No inventar datos: teléfono, correo, dirección, horario, testimonios, precios ni clientes. Todo dato de contacto vive en `src/data/contacto.ts`; los campos vacíos se ocultan solos.
- No hay precios ni pagos en línea: las propuestas se cotizan por paquete o proyecto.
- Contacto por WhatsApp Business y correo; citas por Teams (enlace en `contacto.ts` cuando exista).
- Misión, visión, valores y datos de la fundadora (`src/data/nosotros.ts`) quedan VACÍOS hasta que la dueña los dé; vacío = no se muestra (sin avisos de "pendiente").
- Tarjetas de servicio: frase corta (`gancho`) en la tarjeta; el detalle se abre en una ventana al hacer clic.

## Panel administrativo (`/panel`, solo frontend por ahora)
- Login de PRUEBA: `src/data/usuarios-prueba.ts` (sebas@gmail.com / cris@gmail.com, contraseña 123). Visible en el código publicado: no es seguro, solo para diseñar. Sesión en sessionStorage (`src/lib/sesion.ts`).
- Layout propio `layouts/PanelLayout.astro`: barra lateral de ancho ajustable (columna propia, borde arrastrable) + barra superior (saludo, modo noche, avatar). Sin encabezado/pie del sitio. Animaciones sutiles: entrada en CSS (`.panel-entrada`, `.panel-item` con `--i` en `base.css`) y efectos de interacción en `scripts/panel/animaciones.ts` (cambio de mes, día elegido, contadores, Count Up, círculo al cambiar de modo noche); todas se apagan con "reducir movimiento".
- Secciones: Notificaciones (principal, `/panel`), Agenda (`/panel/agenda`) y Clientes (`/panel/clientes`, tabla con estado nuevo/concurrente, filtros, búsqueda y orden; clic en una fila abre un `<dialog>` con detalles y documentos PDF descargables). Para agregar una: línea en `navegacionPanel` (`data/panel.ts`) + `pages/panel/<x>.astro` con `PanelLayout` + componente en `components/panel/` + script en `scripts/panel/` llamado desde `scripts/panel/main.ts`.
- Notificaciones, citas y clientes son DATOS DE EJEMPLO (`data/panel.ts`); los clientes usan nombres ficticios.
- Documentos de clientes: por ahora todos descargan `public/documentos/documento-ejemplo.pdf` (con su propio nombre de archivo). Con el backend, cada documento tendrá su archivo real.
- Modo noche SOLO en el panel: `<html data-tema="oscuro">` activa las clases `dark:`. Colores `noche-*`, `noche-texto`, `noche-suave` y `acento` en `tokens.css` (capas de azul pizarra, nunca negro). Toda clase nueva del panel lleva su versión `dark:`.
- SIN PARPADEOS al cargar (regla para toda sección nueva):
  - Lo que depende de sessionStorage/localStorage (sesión, leídas, tema, ancho) se pinta con un `<script is:inline define:vars>` justo después del elemento, antes de pintar. Los módulos de `scripts/panel/` solo manejan interacciones.
  - Lo que se arma con JS después de cargar (p. ej. el calendario) debe tener su alto reservado (`min-h`) para que la página no salte.
  - El `<html>` del panel tiene `scrollbar-gutter: stable`: no quitarlo (evita que el contenido se corra de lado al aparecer la barra de scroll).

## Pendientes conocidos
- Número real de WhatsApp, correo, dominio, enlace de agenda.
- Misión, visión, valores y presentación de la fundadora.
- Activar GitHub Pages (Settings → Pages → Source: GitHub Actions) y confirmar el primer despliegue.
- Fase 2 (backend: login real y base de datos para actas, notificaciones y agenda): sin definir.

## Reglas de trabajo
- Responde en español.
- NO hagas commits ni push (en GitHub aparecería "claude" como coautor). Al terminar cambios, dame los comandos de git (add, commit, push) para ejecutarlos yo.
- Verifica con `npm run build` antes de dar algo por terminado.
