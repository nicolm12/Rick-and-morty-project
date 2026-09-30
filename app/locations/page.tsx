import type { Metadata } from "next";
import { Suspense } from "react";
import LocationCard from "@/components/locations/LocationCard";
import CardGrid from "@/components/ui/CardGrid";
import EmptyState from "@/components/ui/EmptyState";
import Filters, { type FilterField } from "@/components/ui/Filters";
import PageContainer from "@/components/ui/PageContainer";
import Pagination from "@/components/ui/Pagination";
import { normalizeParams, pickParams, type RawSearchParams } from "@/lib/utils";
import { getLocations } from "@/services/locations";

export const metadata: Metadata = { title: "Ubicaciones" };

const FILTER_FIELDS: FilterField[] = [
  { name: "type", label: "Tipo", type: "text", placeholder: "Planet, Space station..." },
  { name: "dimension", label: "Dimensión", type: "text", placeholder: "Dimension C-137..." },
];

const ALLOWED = ["page", "name", ...FILTER_FIELDS.map((f) => f.name)];

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = pickParams(normalizeParams(await searchParams), ALLOWED);
  const data = await getLocations(params);
  const page = Number(params.page) || 1;

  return (
    <PageContainer title="Ubicaciones" description="Planetas, estaciones y dimensiones.">
      <Suspense fallback={null}>
        <Filters fields={FILTER_FIELDS} />
      </Suspense>

      {data ? (
        <>
          <CardGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </CardGrid>
          <Pagination
            basePath="/locations"
            page={page}
            pages={data.info.pages}
            total={data.info.count}
            params={params}
          />
        </>
      ) : (
        <EmptyState
          title="Sin resultados"
          description="Prueba con otros filtros o términos de búsqueda."
          href="/locations"
          actionLabel="Limpiar filtros"
        />
      )}
    </PageContainer>
  );
}
