import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CharacterCard from "@/components/characters/CharacterCard";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import Carousel from "@/components/ui/Carousel";
import InfoItem from "@/components/ui/InfoItem";
import { locationToFavorite } from "@/lib/favorites";
import { extractId } from "@/lib/utils";
import { getCharactersByIds } from "@/services/characters";
import { getLocation } from "@/services/locations";

const MAX_RESIDENTS = 24;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const location = await getLocation(id);
  return { title: location?.name ?? "Ubicación no encontrada" };
}

export default async function LocationDetailPage({ params }: Props) {
  const { id } = await params;
  const location = await getLocation(id);
  if (!location) notFound();

  const residents = await getCharactersByIds(
    location.residents.slice(0, MAX_RESIDENTS).map(extractId),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/locations" className="text-sm text-brand hover:underline">
        ← Volver a ubicaciones
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-brand">{location.name}</h1>
        <FavoriteButton item={locationToFavorite(location)} className="border border-zinc-700" />
      </div>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <InfoItem label="Tipo" value={location.type || "—"} />
        <InfoItem label="Dimensión" value={location.dimension || "—"} />
        <InfoItem label="Residentes" value={location.residents.length} />
      </dl>

      <h2 className="mb-4 mt-8 text-lg font-bold">
        Residentes
        {location.residents.length > MAX_RESIDENTS &&
          ` (mostrando ${MAX_RESIDENTS} de ${location.residents.length})`}
      </h2>

      {residents.length > 0 ? (
        <Carousel label="Residentes de la ubicación">
          {residents.map((character) => (
            <li key={character.id} className="w-44 shrink-0 snap-start sm:w-52">
              <CharacterCard character={character} />
            </li>
          ))}
        </Carousel>
      ) : (
        <p className="text-zinc-500">Esta ubicación no tiene residentes conocidos.</p>
      )}
    </div>
  );
}