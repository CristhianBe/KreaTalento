/** Texto para comparar en búsquedas: sin tildes, en minúscula y sin espacios extra ("José" → "jose"). */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}

/** Nombre de archivo seguro: "Plan de desarrollo María" → "plan-de-desarrollo-maria". */
export function aNombreArchivo(texto: string): string {
  return normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
