"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden>
        💥
      </p>
      <h1 className="mt-4 text-2xl font-bold">Algo salió mal</h1>
      <p className="mt-2 text-zinc-400">{error.message}</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-brand px-5 py-2 text-sm font-bold text-black hover:bg-brand-soft"
      >
        Reintentar
      </button>
    </div>
  );
}
