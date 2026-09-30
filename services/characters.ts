import { isValidId } from "@/lib/utils";
import type { Character, Paginated } from "@/types/rick-morty";
import { apiFetch, type Query } from "./api";

export const getCharacters = (query: Query) =>
  apiFetch<Paginated<Character>>("/character", query);

export const getCharacter = (id: string) =>
  isValidId(id) ? apiFetch<Character>(`/character/${id}`) : Promise.resolve(null);

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  const data = await apiFetch<Character | Character[]>(`/character/${ids.join(",")}`);
  if (!data) return [];
  // Con un solo id la API devuelve un objeto, no un arreglo
  return Array.isArray(data) ? data : [data];
}
