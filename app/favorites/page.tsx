import type { Metadata } from "next";
import FavoritesList from "@/components/favorites/FavoritesList";
import PageContainer from "@/components/ui/PageContainer";

export const metadata: Metadata = { title: "Favoritos" };

export default function FavoritesPage() {
  return (
    <PageContainer title="Favoritos" description="Tu colección guardada en este navegador.">
      <FavoritesList />
    </PageContainer>
  );
}
