interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function PageContainer({ title, description, children }: Props) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6">
        <h1 className="bg-gradient-to-r from-brand via-brand-mint to-brand-aqua bg-clip-text text-3xl font-extrabold text-transparent">
          {title}
        </h1>
        {description && <p className="mt-1 text-zinc-400">{description}</p>}
      </header>
      {children}
    </div>
  );
}
