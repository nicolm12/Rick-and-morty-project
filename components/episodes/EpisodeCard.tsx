import Link from "next/link";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { episodeToFavorite } from "@/lib/favorites";
import type { Episode } from "@/types/rick-morty";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <article className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-brand/60">
      <Link href={`/episodes/${episode.id}`} className="block pr-10">
        <span className="rounded bg-brand/15 px-2 py-0.5 text-xs font-bold text-brand-soft">
          {episode.episode}
        </span>
        <h2 className="mt-2 font-semibold">{episode.name}</h2>
        <p className="text-sm text-zinc-400">{episode.air_date}</p>
      </Link>
      <FavoriteButton item={episodeToFavorite(episode)} className="absolute right-3 top-3" />
    </article>
  );
}
