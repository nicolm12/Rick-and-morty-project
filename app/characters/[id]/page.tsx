import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/characters/StatusBadge";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import InfoItem from "@/components/ui/InfoItem";
import ResourceLink from "@/components/ui/ResourceLink";
import { characterToFavorite } from "@/lib/favorites";
import { extractId } from "@/lib/utils";
import { getCharacter } from "@/services/characters";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  return { title: character?.name ?? "Personaje no encontrado" };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);
  if (!character) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/characters" className="text-sm text-brand hover:underline">
        ← Volver a personajes
      </Link>

      <article className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 shadow-xl backdrop-blur-sm sm:p-6">
        {/* Imagen + datos */}
        <div className="grid gap-6 md:grid-cols-[320px_1fr] md:gap-8">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-zinc-800">
            <Image
              src={character.image}
              alt={character.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-extrabold text-brand">{character.name}</h1>
              <FavoriteButton
                item={characterToFavorite(character)}
                className="shrink-0 border border-zinc-700"
              />
            </div>
            <div className="mt-2">
              <StatusBadge status={character.status} />
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoItem label="Especie" value={character.species} />
              <InfoItem label="Tipo" value={character.type || "—"} />
              <InfoItem label="Género" value={character.gender} />
              <InfoItem
                label="Origen"
                value={<ResourceLink resource={character.origin} basePath="/locations" />}
              />
              <InfoItem
                label="Última ubicación"
                value={<ResourceLink resource={character.location} basePath="/locations" />}
              />
            </dl>
          </div>
        </div>

        {/* Episodios: ancho completo, desplegable */}
        <details className="group mt-6 rounded-xl border border-zinc-800 bg-zinc-950/60">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 text-lg font-bold hover:text-brand-soft focus-visible:outline-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
            <span>
              Episodios{" "}
              <span className="text-sm font-medium text-zinc-400">
                ({character.episode.length})
              </span>
            </span>
            <span
              aria-hidden
              className="text-brand transition-transform duration-200 group-open:rotate-180"
            >
              ▼
            </span>
          </summary>

          <ul className="flex flex-wrap gap-2 border-t border-zinc-800 px-4 py-4">
            {character.episode.map((url) => {
              const epId = extractId(url);
              return (
                <li key={url}>
                  <Link
                    href={`/episodes/${epId}`}
                    className="block rounded-md border border-zinc-700 px-2.5 py-1 text-sm transition-colors hover:border-brand hover:text-brand-soft"
                  >
                    Ep. {epId}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      </article>
    </div>
  );
}