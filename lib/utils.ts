export type RawSearchParams = Record<string, string | string[] | undefined>;

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function normalizeParams(raw: RawSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    const first = Array.isArray(value) ? value[0] : value;
    if (first) out[key] = first;
  }
  return out;
}

export function pickParams(params: Record<string, string>, allowed: string[]) {
  return Object.fromEntries(
    Object.entries(params).filter(([key]) => allowed.includes(key)),
  );
}

export function extractId(url: string): number {
  return Number(url.split("/").pop());
}

export function isValidId(id: string): boolean {
  return /^\d+$/.test(id);
}
