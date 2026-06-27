import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import TaskList from '../components/tasks/TaskList';
import TaskSearch from '../components/tasks/TaskSearch';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskSort from '../components/tasks/TaskSort';
import { useTasks } from '../context/TaskContext';
import { filterTasks } from '../utils/filterTasks';
import { sortTasks } from '../utils/sortTasks';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getCategory } from '../constants/categories';

const TITLES = {
  all: 'All Tasks',
  completed: 'Completed Tasks',
  pending: 'Pending Tasks',
  today: "Today's Tasks",
  upcoming: 'Upcoming Tasks',
  important: 'Important Tasks',
};

const statusForRoute = (routeFilter) => {
  if (routeFilter === 'upcoming') return 'week';
  if (routeFilter === 'all') return 'all';
  return routeFilter;
};

const TasksPage = ({ routeType, onEdit, onDelete, onCreate }) => {
  const { tasks, toggleComplete, togglePin } = useTasks();
  const params = useParams();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useLocalStorage('taskflow_filters', {
    status: 'all',
    category: 'all',
    priority: 'all',
  });
  const [sortBy, setSortBy] = useLocalStorage('taskflow_sort', 'newest');

  const routeFilter = routeType === 'status' ? params.filter : null;
  const categoryFilter = routeType === 'category' ? params.id : null;

  useEffect(() => {
    if (routeFilter) {
      setFilters((f) => ({ ...f, status: statusForRoute(routeFilter), category: 'all' }));
    } else if (categoryFilter) {
      setFilters((f) => ({ ...f, category: categoryFilter, status: 'all' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeFilter, categoryFilter]);

  const title = routeFilter
    ? TITLES[routeFilter] || 'Tasks'
    : categoryFilter
    ? `${getCategory(categoryFilter).label} Tasks`
    : 'Tasks';

  const filtered = useMemo(() => {
    const result = filterTasks(tasks, { ...filters, search });
    return sortTasks(result, sortBy);
  }, [tasks, filters, search, sortBy]);

  const hasActiveFilters =
    !!search.trim() || filters.status !== 'all' || filters.category !== 'all' || filters.priority !== 'all';

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{filtered.length} task{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <TaskSort value={sortBy} onChange={setSortBy} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <TaskSearch value={search} onChange={setSearch} />
      </div>

      <TaskFilters filters={filters} onChange={setFilters} />

      <TaskList
        tasks={filtered}
        onToggle={toggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        onTogglePin={togglePin}
        onCreate={onCreate}
        hasFilters={hasActiveFilters}
      />
    </motion.div>
  );
};

export default TasksPage;
