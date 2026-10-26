/** Carta en formato resumido, tal como la devuelve el listado de /cards. */
export interface CardBrief {
  id: string;
  localId: string;
  name: string;
  image: string;
}

/** Parámetros que acepta la búsqueda; todos opcionales. */
export interface CardSearchParams {
  name?: string;
  hp?: number;
  rarity?: string;
  type?: string;
  page?: number;
  pageSize?: number;
}
