import Image from "next/image";
import Link from "next/link";
import StatusBadge from "@/components/characters/StatusBadge";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import { characterToFavorite } from "@/lib/favorites";
import type { Character } from "@/types/rick-morty";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-brand/60">
      <Link href={`/characters/${character.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-1 p-3">
          <h2 className="truncate font-semibold">{character.name}</h2>
          <StatusBadge status={character.status} />
          <p className="truncate text-sm text-zinc-400">{character.species}</p>
        </div>
      </Link>
      <FavoriteButton item={characterToFavorite(character)} className="absolute right-2 top-2" />
    </article>
  );
}
