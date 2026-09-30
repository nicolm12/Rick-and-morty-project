import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
}

export default function EmptyState({ title, description, href, actionLabel }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-700 px-6 py-12 text-center">
      <Image
        src="/images/notfound.png"
        alt=""
        width={150}
        height={100}
        className="mx-auto block h-auto w-[60%] max-w-[280px]"
      />

      <h2 className="mt-6 text-xl font-bold">{title}</h2>
      {description && <p className="mt-1 text-zinc-400">{description}</p>}

      {href && actionLabel && (
        <Link
          href={href}
          className="mt-5 inline-block rounded-full bg-brand px-5 py-2 text-sm font-bold text-black hover:bg-brand-soft"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}