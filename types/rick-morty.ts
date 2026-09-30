export interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Paginated<T> {
  info: PageInfo;
  results: T[];
}

export interface NamedResource {
  name: string;
  url: string;
}

export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: NamedResource;
  location: NamedResource;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type FavoriteType = "character" | "episode" | "location";

export interface FavoriteItem {
  key: string;
  type: FavoriteType;
  id: number;
  name: string;
  subtitle: string;
  image?: string;
}
