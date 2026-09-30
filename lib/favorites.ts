import type {
  Character,
  Episode,
  FavoriteItem,
  FavoriteType,
  Location,
} from "@/types/rick-morty";

export const FAVORITE_ROUTES: Record<FavoriteType, string> = {
  character: "/characters",
  episode: "/episodes",
  location: "/locations",
};

export const FAVORITE_LABELS: Record<FavoriteType, string> = {
  character: "Personaje",
  episode: "Episodio",
  location: "Ubicación",
};

export const characterToFavorite = (c: Character): FavoriteItem => ({
  key: `character-${c.id}`,
  type: "character",
  id: c.id,
  name: c.name,
  subtitle: `${c.species} · ${c.status}`,
  image: c.image,
});

export const episodeToFavorite = (e: Episode): FavoriteItem => ({
  key: `episode-${e.id}`,
  type: "episode",
  id: e.id,
  name: e.name,
  subtitle: `${e.episode} · ${e.air_date}`,
});

export const locationToFavorite = (l: Location): FavoriteItem => ({
  key: `location-${l.id}`,
  type: "location",
  id: l.id,
  name: l.name,
  subtitle: `${l.type} · ${l.dimension}`,
});
