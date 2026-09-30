interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function CardGrid({
  children,
  className = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
}: Props) {
  return <div className={`grid gap-4 ${className}`}>{children}</div>;
}
