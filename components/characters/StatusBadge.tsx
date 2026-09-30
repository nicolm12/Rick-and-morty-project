import { cn } from "@/lib/utils";
import type { CharacterStatus } from "@/types/rick-morty";

const STYLES: Record<CharacterStatus, { label: string; dot: string }> = {
  Alive: { label: "Vivo", dot: "bg-brand-green" },
  Dead: { label: "Muerto", dot: "bg-red-500" },
  unknown: { label: "Desconocido", dot: "bg-zinc-500" },
};

export default function StatusBadge({ status }: { status: CharacterStatus }) {
  const { label, dot } = STYLES[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-300">
      <span className={cn("h-2.5 w-2.5 rounded-full", dot)} aria-hidden />
      {label}
    </span>
  );
}
