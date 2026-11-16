/**
 * Artículos destacados (futuro). Más adelante vivirán como Markdown en src/content/articulos/.
 * Mientras la lista esté vacía, la sección no se muestra.
 */
export type Articulo = { titulo: string; resumen: string; href: string; fecha?: string };

export const articulos: Articulo[] = [];
