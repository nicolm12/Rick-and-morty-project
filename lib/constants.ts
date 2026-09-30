export const API_BASE_URL = "https://rickandmortyapi.com/api";
export const FAVORITES_STORAGE_KEY = "rm-favorites";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/characters", label: "Personajes" },
  { href: "/episodes", label: "Episodios" },
  { href: "/locations", label: "Ubicaciones" },
  { href: "/favorites", label: "Favoritos" },
] as const;
export const CAROUSEL_BATCH_SIZE = 12;