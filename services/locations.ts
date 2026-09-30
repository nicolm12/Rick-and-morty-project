import { isValidId } from "@/lib/utils";
import type { Location, Paginated } from "@/types/rick-morty";
import { apiFetch, type Query } from "./api";

export const getLocations = (query: Query) =>
  apiFetch<Paginated<Location>>("/location", query);

export const getLocation = (id: string) =>
  isValidId(id) ? apiFetch<Location>(`/location/${id}`) : Promise.resolve(null);
