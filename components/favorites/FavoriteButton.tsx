"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import type { FavoriteItem } from "@/types/rick-morty";

interface Props {
  item: FavoriteItem;
  className?: string;
}

export default function FavoriteButton({ item, className }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(item.key);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(item)}
      aria-pressed={active}
      aria-label={
        active ? `Quitar ${item.name} de favoritos` : `Agregar ${item.name} a favoritos`
      }
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl backdrop-blur transition hover:scale-110",
        active ? "text-yellow-400" : "text-white",
        className,
      )}
    >
      {active ? "★" : "☆"}
    </button>
  );
}
