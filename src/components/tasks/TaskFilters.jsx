import { CATEGORIES } from '../../constants/categories';
import { PRIORITIES } from '../../constants/priority';

const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'important', label: 'Important' },
];

const Pill = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
      active
        ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm shadow-indigo-500/30'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
    }`}
  >
    {children}
  </button>
);

const TaskFilters = ({ filters, onChange }) => {
  const setFilter = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {STATUS_FILTERS.map((f) => (
          <Pill key={f.value} active={filters.status === f.value} onClick={() => setFilter('status', f.value)}>
            {f.label}
          </Pill>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <Pill active={filters.priority === 'all'} onClick={() => setFilter('priority', 'all')}>
          All Priorities
        </Pill>
        {PRIORITIES.map((p) => (
          <Pill key={p.id} active={filters.priority === p.id} onClick={() => setFilter('priority', p.id)}>
            {p.label}
          </Pill>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <Pill active={filters.category === 'all'} onClick={() => setFilter('category', 'all')}>
          All Categories
        </Pill>
        {CATEGORIES.map((c) => (
          <Pill key={c.id} active={filters.category === c.id} onClick={() => setFilter('category', c.id)}>
            {c.label}
          </Pill>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;
export { STATUS_FILTERS };
