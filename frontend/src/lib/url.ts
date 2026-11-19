/** Antepone el `base` de Astro (necesario en GitHub Pages) a rutas internas. */
export function url(ruta = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!ruta || ruta === '/') return `${base}/`;
  if (ruta.startsWith('#') || /^[a-z]+:/i.test(ruta)) return ruta;
  return `${base}/${ruta.replace(/^\//, '')}`;
}
