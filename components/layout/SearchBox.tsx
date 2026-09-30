"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import Image from "next/image";

const SECTIONS = [
  { prefix: "/episodes", placeholder: "Buscar episodio..." },
  { prefix: "/locations", placeholder: "Buscar ubicación..." },
];

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Busca en la sección actual; en cualquier otra ruta busca personajes
  const section = SECTIONS.find((s) => pathname.startsWith(s.prefix)) ?? {
    prefix: "/characters",
    placeholder: "Buscar personaje...",
  };
  const inSection = pathname.startsWith(section.prefix);
  const currentName = inSection ? (searchParams.get("name") ?? "") : "";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();

    const params = new URLSearchParams(inSection ? searchParams.toString() : "");
    params.delete("page");
    if (q) params.set("name", q);
    else params.delete("name");

    const qs = params.toString();
    router.push(qs ? `${section.prefix}?${qs}` : section.prefix);
  }

  return (
    <form
      key={`${pathname}-${currentName}`}
      role="search"
      onSubmit={handleSubmit}
      className="relative"
    >
      <input
        type="search"
        name="q"
        defaultValue={currentName}
        placeholder={section.placeholder}
        aria-label="Buscar"
        className="w-full rounded-full border border-zinc-700 bg-zinc-900 py-2 pl-4 pr-10 text-sm placeholder:text-zinc-500 focus:border-brand focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-400 hover:text-brand"
      >
         <Image
                     src="/images/dimension.png"
                     alt="Rick and Morty"
                     priority
                     width={24}
                     height={24}
                     className="
                       md:mx-0 w-[60%]]
                     "
                   />
      </button>
    </form>
  );
}
