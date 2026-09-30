import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden>
        🛸
      </p>
      <h1 className="mt-4 text-2xl font-bold">404 · Dimensión no encontrada</h1>
      <p className="mt-2 text-zinc-400">Esta página no existe en ningún universo conocido.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-brand px-5 py-2 text-sm font-bold text-black hover:bg-brand-soft"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
