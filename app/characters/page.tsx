import type { Metadata } from "next";
import { Suspense } from "react";
import CharacterCard from "@/components/characters/CharacterCard";
import CardGrid from "@/components/ui/CardGrid";
import EmptyState from "@/components/ui/EmptyState";
import Filters, { type FilterField } from "@/components/ui/Filters";
import PageContainer from "@/components/ui/PageContainer";
import Pagination from "@/components/ui/Pagination";
import { normalizeParams, pickParams, type RawSearchParams } from "@/lib/utils";
import { getCharacters } from "@/services/characters";

export const metadata: Metadata = { title: "Personajes" };

const FILTER_FIELDS: FilterField[] = [
  {
    name: "status",
    label: "Estado",
    type: "select",
    options: [
      { value: "alive", label: "Vivo" },
      { value: "dead", label: "Muerto" },
      { value: "unknown", label: "Desconocido" },
    ],
  },
  {
    name: "gender",
    label: "Género",
    type: "select",
    options: [
      { value: "female", label: "Femenino" },
      { value: "male", label: "Masculino" },
      { value: "genderless", label: "Sin género" },
      { value: "unknown", label: "Desconocido" },
    ],
  },
  { name: "species", label: "Especie", type: "text", placeholder: "Human, Alien..." },
  { name: "type", label: "Tipo", type: "text", placeholder: "Parasite..." },
];

const ALLOWED = ["page", "name", ...FILTER_FIELDS.map((f) => f.name)];

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const params = pickParams(normalizeParams(await searchParams), ALLOWED);
  const data = await getCharacters(params);
  const page = Number(params.page) || 1;

  return (
    <PageContainer title="Personajes" description="Explora a los habitantes del multiverso.">
      <Suspense fallback={null}>
        <Filters fields={FILTER_FIELDS} />
      </Suspense>

      {data ? (
        <>
          <CardGrid>
            {data.results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </CardGrid>
          <Pagination
            basePath="/characters"
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
          href="/characters"
          actionLabel="Limpiar filtros"
        />
      )}
    </PageContainer>
  );
}
