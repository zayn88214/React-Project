import { useMemo, useState } from 'react';
import StatsCards from '../components/dashboard/StatsCards';
import ProgressCard from '../components/dashboard/ProgressCard';
import TaskSummary from '../components/dashboard/TaskSummary';
import TaskList from '../components/tasks/TaskList';
import TaskSearch from '../components/tasks/TaskSearch';
import { useTasks } from '../context/TaskContext';
import { sortTasks } from '../utils/sortTasks';
import { motion } from 'framer-motion';

const Dashboard = ({ onEdit, onDelete, onCreate }) => {
  const { tasks, stats, toggleComplete, togglePin } = useTasks();
  const [search, setSearch] = useState('');

  const recentTasks = useMemo(() => {
    const filtered = search.trim()
      ? tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            (t.description || '').toLowerCase().includes(search.toLowerCase())
        )
      : tasks;
    return sortTasks(filtered, 'newest').slice(0, 6);
  }, [tasks, search]);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Welcome back 👋</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Here's what's happening with your tasks today.</p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProgressCard completionRate={stats.completionRate} completed={stats.completed} total={stats.total} />
        </div>
        <TaskSummary stats={stats} />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Tasks</h2>
          <div className="w-56">
            <TaskSearch value={search} onChange={setSearch} />
          </div>
        </div>
        <TaskList
          tasks={recentTasks}
          onToggle={toggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onTogglePin={togglePin}
          onCreate={onCreate}
          hasFilters={!!search.trim()}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
