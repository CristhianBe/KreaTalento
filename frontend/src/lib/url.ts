/** Antepone el `base` de Astro (necesario en GitHub Pages) a rutas internas. */
export function url(ruta = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!ruta || ruta === '/') return `${base}/`;
  if (ruta.startsWith('#') || /^[a-z]+:/i.test(ruta)) return ruta;
  return `${base}/${ruta.replace(/^\//, '')}`;
}

/** true si `rutaActual` (Astro.url.pathname) es la página `ruta`, con o sin barra final. */
export function esRuta(rutaActual: string, ruta = '/'): boolean {
  const limpiar = (r: string) => r.replace(/\/$/, '');
  return limpiar(rutaActual) === limpiar(url(ruta));
}

/**
 * Enlace a una sección del inicio (`#servicios`, …) que funciona desde cualquier página:
 * en el inicio deja solo el ancla (scroll suave); en otra página, antepone la ruta del inicio.
 */
export function enlaceSeccion(ancla: string, rutaActual: string): string {
  return esRuta(rutaActual) ? ancla : `${url('/')}${ancla}`;
}
