import Link from "next/link";
import { extractId } from "@/lib/utils";
import type { NamedResource } from "@/types/rick-morty";

interface Props {
  resource: NamedResource;
  basePath: string;
}

export default function ResourceLink({ resource, basePath }: Props) {
  if (!resource.url) return <>{resource.name}</>;

  return (
    <Link
      href={`${basePath}/${extractId(resource.url)}`}
      className="text-brand-soft hover:underline"
    >
      {resource.name}
    </Link>
  );
}
