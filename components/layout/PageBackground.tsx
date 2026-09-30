"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const DEFAULT_BG = "/images/bg-general.jpg";

// Opcional: una imagen distinta por sección (descomenta las que quieras)
const SECTION_BG: Record<string, string> = {
  // "/characters": "/images/bg-characters.jpg",
  // "/episodes": "/images/bg-episodes.jpg",
  // "/locations": "/images/bg-locations.jpg",
  // "/favorites": "/images/bg-favorites.jpg",
};

export default function PageBackground() {
  const pathname = usePathname();

  // El home usa su propia imagen
  if (pathname === "/") return null;

  const section = `/${pathname.split("/")[1] ?? ""}`;
  const src = SECTION_BG[section] ?? DEFAULT_BG;

  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <Image
        key={src}
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover"
      />
      {/* Capa oscura para que el texto y las tarjetas se lean bien */}
      <div className="absolute inset-0 bg-zinc-950/85" />
    </div>
  );
}