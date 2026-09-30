"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import SearchBox from "@/components/layout/SearchBox";
import { useFavorites } from "@/hooks/useFavorites";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = NAV_LINKS.map(({ href, label }) => (
    <Link
      key={href}
      href={href}
      onClick={() => setOpen(false)}
      aria-current={isActive(href) ? "page" : undefined}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive(href)
          ? "bg-brand/15 text-brand-soft"
          : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
      )}
    >
      {label}
      {href === "/favorites" && favorites.length > 0 && (
        <span className="rounded-full bg-brand px-1.5 text-xs font-bold text-black">
          {favorites.length}
        </span>
      )}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-brand">
         <Image
                     src="/images/logo.svg"
                     alt="Rick and Morty"
                     priority
                     width={150}
                     height={100}
                     className="
                       md:mx-0 w-[60%]]
                     "
                   />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links}
        </nav>

        <div className="hidden w-72 md:block">
          <Suspense fallback={null}>
            <SearchBox />
          </Suspense>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-zinc-300 hover:bg-zinc-800 lg:hidden"
          aria-expanded={open}
          aria-label="Abrir menú"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-zinc-800 px-4 pb-4 lg:hidden">
          <div className="py-3 md:hidden">
            <Suspense fallback={null}>
              <SearchBox />
            </Suspense>
          </div>
          <nav className="flex flex-col gap-1" aria-label="Móvil">
            {links}
          </nav>
        </div>
      )}
    </header>
  );
}
