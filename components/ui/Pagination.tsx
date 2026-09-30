import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  basePath: string;
  page: number;
  pages: number;
  total: number;
  params: Record<string, string>;
}

function buildHref(basePath: string, params: Record<string, string>, page: number) {
  const sp = new URLSearchParams(params);
  sp.set("page", String(page));
  return `${basePath}?${sp.toString()}`;
}

function getRange(page: number, pages: number): (number | "…")[] {
  const numbers = [...new Set([1, pages, page - 1, page, page + 1])]
    .filter((n) => n >= 1 && n <= pages)
    .sort((a, b) => a - b);

  const out: (number | "…")[] = [];
  numbers.forEach((n, i) => {
    if (i > 0 && n - numbers[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

const base = "min-w-10 rounded-md border px-3 py-2 text-center text-sm font-medium transition-colors";

export default function Pagination({ basePath, page, pages, total, params }: Props) {
  if (pages <= 1) return null;

  return (
    <nav aria-label="Paginación" className="mt-8 flex flex-col items-center gap-3">
      <p className="text-sm text-zinc-500">
        Página {page} de {pages} · {total} resultados
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link
              href={buildHref(basePath, params, page - 1)}
              className={cn(base, "border-zinc-700 hover:border-brand hover:text-brand-soft")}
            >
              ← Anterior
            </Link>
          ) : (
            <span className={cn(base, "cursor-not-allowed border-zinc-800 text-zinc-600")}>
              ← Anterior
            </span>
          )}
        </li>

        {getRange(page, pages).map((item, i) => (
          <li key={`${item}-${i}`} className="hidden sm:block">
            {item === "…" ? (
              <span className="px-1 text-zinc-500">…</span>
            ) : (
              <Link
                href={buildHref(basePath, params, item)}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  base,
                  item === page
                    ? "border-brand bg-brand text-black"
                    : "border-zinc-700 hover:border-brand hover:text-brand-soft",
                )}
              >
                {item}
              </Link>
            )}
          </li>
        ))}

        <li>
          {page < pages ? (
            <Link
              href={buildHref(basePath, params, page + 1)}
              className={cn(base, "border-zinc-700 hover:border-brand hover:text-brand-soft")}
            >
              Siguiente →
            </Link>
          ) : (
            <span className={cn(base, "cursor-not-allowed border-zinc-800 text-zinc-600")}>
              Siguiente →
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
