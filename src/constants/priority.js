export const PRIORITIES = [
  { id: 'high', label: 'High', dot: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-500/15', ring: 'ring-rose-200 dark:ring-rose-500/30', weight: 3 },
  { id: 'medium', label: 'Medium', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-500/15', ring: 'ring-amber-200 dark:ring-amber-500/30', weight: 2 },
  { id: 'low', label: 'Low', dot: 'bg-sky-500', text: 'text-sky-600 dark:text-sky-300', bg: 'bg-sky-100 dark:bg-sky-500/15', ring: 'ring-sky-200 dark:ring-sky-500/30', weight: 1 },
];

export const getPriority = (id) => PRIORITIES.find((p) => p.id === id) || PRIORITIES[1];
