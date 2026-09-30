import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CharacterCard from "@/components/characters/CharacterCard";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import Carousel from "@/components/ui/Carousel";
import InfoItem from "@/components/ui/InfoItem";
import { episodeToFavorite } from "@/lib/favorites";
import { extractId } from "@/lib/utils";
import { getCharactersByIds } from "@/services/characters";
import { getEpisode } from "@/services/episodes";

const MAX_CHARACTERS = 24;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisode(id);
  return { title: episode?.name ?? "Episodio no encontrado" };
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { id } = await params;
  const episode = await getEpisode(id);
  if (!episode) notFound();

  const characters = await getCharactersByIds(
    episode.characters.slice(0, MAX_CHARACTERS).map(extractId),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/episodes" className="text-sm text-brand hover:underline">
        ← Volver a episodios
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-brand">{episode.name}</h1>
        <FavoriteButton item={episodeToFavorite(episode)} className="border border-zinc-700" />
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <InfoItem label="Código" value={episode.episode} />
        <InfoItem label="Fecha de emisión" value={episode.air_date} />
        <InfoItem label="Personajes" value={episode.characters.length} />
      </dl>

      <h2 className="mb-4 mt-8 text-lg font-bold">
        Personajes
        {episode.characters.length > MAX_CHARACTERS &&
          ` (mostrando ${MAX_CHARACTERS} de ${episode.characters.length})`}
      </h2>

      <Carousel label="Personajes del episodio">
        {characters.map((character) => (
          <li key={character.id} className="w-44 shrink-0 snap-start sm:w-52">
            <CharacterCard character={character} />
          </li>
        ))}
      </Carousel>
    </div>
  );
}