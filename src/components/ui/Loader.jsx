const Loader = ({ count = 4 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-24 w-full rounded-2xl skeleton ring-1 ring-slate-900/5 dark:ring-white/10" />
    ))}
  </div>
);

export default Loader;
