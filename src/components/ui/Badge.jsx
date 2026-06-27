const Badge = ({ children, className = '', dot, dotColor = 'bg-slate-400' }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
    {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />}
    {children}
  </span>
);

export default Badge;
