export default function DashboardTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-5xl font-bold max-md:text-3xl">{title}</h1>
      {children}
    </div>
  );
}
