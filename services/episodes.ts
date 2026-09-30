import { isValidId } from "@/lib/utils";
import type { Episode, Paginated } from "@/types/rick-morty";
import { apiFetch, type Query } from "./api";

export const getEpisodes = (query: Query) =>
  apiFetch<Paginated<Episode>>("/episode", query);

export const getEpisode = (id: string) =>
  isValidId(id) ? apiFetch<Episode>(`/episode/${id}`) : Promise.resolve(null);
