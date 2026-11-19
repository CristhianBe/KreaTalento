# Krea Talento · sitio web

Astro + Tailwind v4 + GSAP + Lenis.

```sh
npm install
npm run dev      # http://localhost:4321/KreaTalento/
npm run build    # genera dist/
npm run preview
```

## Dónde editar
- **Textos:** `src/data/` (`sitio.ts`, `servicios.ts`, `proceso.ts`, `nosotros.ts`, `pilares.ts`, `articulos.ts`).
- **Contacto:** `src/data/contacto.ts`. Los campos vacíos se ocultan solos (botón flotante de WhatsApp, correo, agenda de Teams, redes).
- **Colores y tipografía:** `src/styles/tokens.css`.
- **Animaciones:** `src/scripts/animations/` (se activan en `src/scripts/main.ts` solo sin "reducir movimiento").

## Despliegue
`.github/workflows/deploy.yml` publica en GitHub Pages en cada push a `main` que toque `web/`.
Requiere activar en GitHub: *Settings → Pages → Source: GitHub Actions*.
Con dominio propio: cambiar `site` y quitar `base` en `astro.config.mjs`, y agregar `public/CNAME`.
