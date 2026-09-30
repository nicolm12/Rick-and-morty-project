"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";

export interface FilterField {
  name: string;
  label: string;
  type: "select" | "text";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const inputClass =
  "w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm placeholder:text-zinc-600 focus:border-brand focus:outline-none";

export default function Filters({ fields }: { fields: FilterField[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    // Conserva la búsqueda por nombre del SearchBox
    const name = searchParams.get("name");
    if (name) params.set("name", name);

    for (const field of fields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (value) params.set(field.name, value);
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <form
      key={searchParams.toString()}
      onSubmit={handleSubmit}
      className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
    >
      {fields.map((field) => (
        <label
          key={field.name}
          className="flex min-w-[160px] flex-1 flex-col gap-1 text-xs font-medium text-zinc-400"
        >
          {field.label}
          {field.type === "select" ? (
            <select
              name={field.name}
              defaultValue={searchParams.get(field.name) ?? ""}
              onChange={(e) => e.currentTarget.form?.requestSubmit()}
              className={inputClass}
            >
              <option value="">Todos</option>
              {field.options?.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={field.name}
              defaultValue={searchParams.get(field.name) ?? ""}
              placeholder={field.placeholder}
              className={inputClass}
            />
          )}
        </label>
      ))}

      {/* Permite aplicar los filtros de texto con Enter */}
      <button type="submit" className="sr-only" tabIndex={-1} aria-hidden>
        Aplicar
      </button>

      {/* Basurita al final de la fila, con tooltip */}
      <div className="group relative ml-auto">
        <button
          type="button"
          onClick={() => router.push(pathname)}
          aria-label="Limpiar filtros"
          className="flex items-center justify-center rounded-md border border-zinc-700 p-1.5 transition-colors hover:border-brand focus-visible:border-brand focus-visible:outline-none"
        >
          <Image src="/images/trash.png" alt="" width={24} height={24} />
        </button>

        <span
          role="tooltip"
          aria-hidden
          className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          Limpiar
        </span>
      </div>
    </form>
  );
}