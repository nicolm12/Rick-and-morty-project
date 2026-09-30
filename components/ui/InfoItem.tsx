interface Props {
  label: string;
  value: React.ReactNode;
}

export default function InfoItem({ label, value }: Props) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
      <dt className="text-xs uppercase tracking-wide text-zinc-500">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
