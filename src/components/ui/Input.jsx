const baseClasses =
  'w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20';

export const Input = ({ label, error, className = '', id, ...props }) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
    )}
    <input id={id} className={`${baseClasses} ${error ? 'border-rose-400 focus:ring-rose-100' : ''} ${className}`} {...props} />
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

export const Textarea = ({ label, error, className = '', id, rows = 3, ...props }) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
    )}
    <textarea id={id} rows={rows} className={`${baseClasses} resize-none ${error ? 'border-rose-400' : ''} ${className}`} {...props} />
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

export const Select = ({ label, className = '', id, children, ...props }) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </label>
    )}
    <select id={id} className={`${baseClasses} cursor-pointer ${className}`} {...props}>
      {children}
    </select>
  </div>
);

export default Input;
