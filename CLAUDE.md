# Krea Talento — contexto del proyecto

Sitio web de **Krea Talento**, consultoría de recursos humanos en Costa Rica (empresas, principalmente pequeñas, y profesionales). No usar la palabra "pymes" en el sitio.
Servicios reales: asesoría laboral para empresas, gestión del talento, capacitación, coaching (10 sesiones), preparación de CV y entrevistas. NO ofrece reclutamiento.

## Estructura del repo
- `web/`    sitio público (Astro + Tailwind v4 + GSAP + Lenis). Se corre desde `web/` con `npm run dev`.
- `docs/`   notas de reunión, alcance y decisiones.
- `portal/` fase 2 (portal de clientes), aún sin crear. Se decide con presupuesto y clientes reales.

## Estructura de `web/src`
- `components/{layout,sections,ui}` · `layouts/` · `pages/` · `content/articulos/` (Markdown, futuro)
- `data/` textos editables (contacto, servicios, nosotros, proceso, artículos, pilares). Los textos NO van dentro de los componentes.
- `scripts/animations/` un módulo por animación; `scripts/main.ts` los inicia dentro de `gsap.matchMedia` con `prefers-reduced-motion: no-preference`.
- `styles/` `tokens.css` (colores y tipografía del diseño de Stitch), `base.css`, `global.css`.

## Diseño (reglas de la clienta)
- Fondo blanco, azul y celeste, poco ruido visual.
- PROHIBIDO: negro, verde y amarillo.
- Logo oficial (elegido por la clienta, nov 2026; trae turquesa, coral y verde: es excepción a la regla de colores, solo en el logo): `web/src/assets/images/logo-krea-talento.png`, versión blanca `logo-krea-talento-blanco.png`, completo con lema `logo-krea-talento-completo.png` (intro) e isotipo `isotipo-krea-talento.png` (favicon). Lema de marca: "Hacemos crecer el talento de tu empresa."
- Animaciones bonitas pero sutiles; siempre con alternativa para "reducir movimiento".

## Reglas de contenido
- No inventar datos: teléfono, correo, dirección, horario, testimonios, precios ni clientes. Todo dato de contacto vive en `src/data/contacto.ts`; los campos vacíos se ocultan solos.
- No hay precios ni pagos en línea: las propuestas se cotizan por paquete o proyecto.
- Contacto por WhatsApp Business y correo; citas por Teams (enlace en `contacto.ts` cuando exista).
- Misión, visión, valores y datos de la fundadora (`src/data/nosotros.ts`) quedan VACÍOS hasta que la dueña los dé; vacío = no se muestra (sin avisos de "pendiente").
- Tarjetas de servicio: frase corta (`gancho`) en la tarjeta; el detalle se abre en una ventana al hacer clic.

## Pendientes conocidos
- Número real de WhatsApp, correo, dominio, enlace de agenda.
- Misión, visión, valores y presentación de la fundadora.
- Activar GitHub Pages (Settings → Pages → Source: GitHub Actions) y confirmar el primer despliegue.
- Fase 2 (portal con login y base de datos para actas): sin definir.

## Reglas de trabajo
- Responde en español.
- NO hagas commits ni push (en GitHub aparecería "claude" como coautor). Al terminar cambios, dame los comandos de git (add, commit, push) para ejecutarlos yo.
- Verifica con `npm run build` antes de dar algo por terminado.
