"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import CardGrid from "@/components/ui/CardGrid";
import EmptyState from "@/components/ui/EmptyState";
import { useFavorites } from "@/hooks/useFavorites";
import { FAVORITE_LABELS, FAVORITE_ROUTES } from "@/lib/favorites";
import { cn } from "@/lib/utils";
import type { FavoriteType } from "@/types/rick-morty";

type Tab = "all" | FavoriteType;

const TABS: { value: Tab; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "character", label: "Personajes" },
  { value: "episode", label: "Episodios" },
  { value: "location", label: "Ubicaciones" },
];

// Imagen por defecto para los favoritos que no traen foto propia
const FALLBACK_IMAGES: Record<Exclude<FavoriteType, "character">, string> = {
  episode: "/images/episodes.png",
  location: "/images/rickanmorty.png",
};

export default function FavoritesList() {
  const { favorites, ready } = useFavorites();
  const [tab, setTab] = useState<Tab>("all");

  if (!ready) return <p className="text-zinc-500">Cargando favoritos…</p>;

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Aún no tienes favoritos"
        description="Marca con ☆ los personajes, episodios o ubicaciones que más te gusten."
        href="/characters"
        actionLabel="Explorar personajes"
      />
    );
  }

  const visible = tab === "all" ? favorites : favorites.filter((f) => f.type === tab);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.value}
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.value
                ? "border-brand bg-brand text-black"
                : "border-zinc-700 hover:border-brand",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-zinc-500">No tienes favoritos en esta categoría.</p>
      ) : (
        <CardGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((fav) => {
            const src =
              fav.image ?? (fav.type === "character" ? undefined : FALLBACK_IMAGES[fav.type]);

            return (
              <article
                key={fav.key}
                className="relative flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-brand/60"
              >
                <Link
                  href={`${FAVORITE_ROUTES[fav.type]}/${fav.id}`}
                  className="flex min-w-0 flex-1 items-center gap-4 pr-10"
                >
                  {src && (
                    <Image
                      src={src}
                      alt=""
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs uppercase text-brand">{FAVORITE_LABELS[fav.type]}</p>
                    <h2 className="truncate font-semibold">{fav.name}</h2>
                    <p className="truncate text-sm text-zinc-400">{fav.subtitle}</p>
                  </div>
                </Link>
                <FavoriteButton item={fav} className="absolute right-3 top-3" />
              </article>
            );
          })}
        </CardGrid>
      )}
    </>
  );
}