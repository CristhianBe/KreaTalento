// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages (repositorio de proyecto): https://cristhianbe.github.io/KreaTalento/
// Cuando exista dominio propio: cambiar `site` al dominio, quitar `base`
// y agregar `public/CNAME` con el dominio.
export default defineConfig({
  site: 'https://cristhianbe.github.io',
  base: '/KreaTalento',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
