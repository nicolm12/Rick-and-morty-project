import type { Metadata } from "next";
import { Suspense } from "react";
import EpisodeCard from "@/components/episodes/EpisodeCard";
import CardGrid from "@/components/ui/CardGrid";
import EmptyState from "@/components/ui/EmptyState";
import Filters, { type FilterField } from "@/components/ui/Filters";
import PageContainer from "@/components/ui/PageContainer";
import Pagination from "@/components/ui/Pagination";
import { normalizeParams, pickParams, type RawSearchParams } from "@/lib/utils";
import { getEpisodes } from "@/services/episodes";

export const metadata: Metadata = { title: "Episodios" };

// Agrega más temporadas aquí si la API las incluye
const FILTER_FIELDS: FilterField[] = [
  {
    name: "episode",
    label: "Temporada",
    type: "select",
    options: [1, 2, 3, 4, 5].map((n) => ({
      value: `S0${n}`,
      label: `Temporada ${n}`,
    })),
  },
];

const ALLOWED = ["page", "name", ...FILTER_FIELDS.map((f) => f.name)];

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = pickParams(normalizeParams(await searchParams), ALLOWED);
  const data = await getEpisodes(params);
  const page = Number(params.page) || 1;

  return (
    <PageContainer title="Episodios" description="Todos los episodios de la serie.">
      <Suspense fallback={null}>
        <Filters fields={FILTER_FIELDS} />
      </Suspense>

      {data ? (
        <>
          <CardGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </CardGrid>
          <Pagination
            basePath="/episodes"
            page={page}
            pages={data.info.pages}
            total={data.info.count}
            params={params}
          />
        </>
      ) : (
        <EmptyState
          title="Sin resultados"
          description="Prueba con otra temporada o término de búsqueda."
          href="/episodes"
          actionLabel="Limpiar filtros"
        />
      )}
    </PageContainer>
  );
}
