export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-brand"
        role="status"
        aria-label="Cargando"
      />
    </div>
  );
}
