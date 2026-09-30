import Link from "next/link";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { locationToFavorite } from "@/lib/favorites";
import type { Location } from "@/types/rick-morty";

export default function LocationCard({ location }: { location: Location }) {
  return (
    <article className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-brand/60">
      <Link href={`/locations/${location.id}`} className="block pr-10">
        <span className="rounded bg-brand/15 px-2 py-0.5 text-xs font-bold text-brand-soft">
          {location.type || "Sin tipo"}
        </span>
        <h2 className="mt-2 font-semibold">{location.name}</h2>
        <p className="text-sm text-zinc-400">{location.dimension}</p>
        <p className="mt-1 text-xs text-zinc-500">{location.residents.length} residentes</p>
      </Link>
      <FavoriteButton item={locationToFavorite(location)} className="absolute right-3 top-3" />
    </article>
  );
}
