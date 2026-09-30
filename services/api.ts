import { API_BASE_URL } from "@/lib/constants";

export type Query = Record<string, string | undefined>;

/**
 * Devuelve null cuando la API responde 404 (sin resultados / no existe).
 * Cualquier otro error se lanza y lo captura app/error.tsx.
 */
export async function apiFetch<T>(
  path: string,
  query: Query = {},
  revalidate = 3600,
): Promise<T | null> {
  const url = new URL(`${API_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(query)) {
    if (value) url.searchParams.set(key, value);
  }

  const res = await fetch(url, { next: { revalidate } });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Error ${res.status} consultando ${url.pathname}`);

  return res.json() as Promise<T>;
}
