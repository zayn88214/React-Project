import { motion } from 'framer-motion';
import { useTasks } from '../context/TaskContext';
import StatsCards from '../components/dashboard/StatsCards';
import ProgressCard from '../components/dashboard/ProgressCard';
import Card from '../components/ui/Card';
import { CATEGORIES } from '../constants/categories';
import { PRIORITIES } from '../constants/priority';

const Statistics = () => {
  const { tasks, stats } = useTasks();

  const byCategory = CATEGORIES.map((c) => ({
    ...c,
    count: tasks.filter((t) => t.category === c.id).length,
  }));

  const byPriority = PRIORITIES.map((p) => ({
    ...p,
    count: tasks.filter((t) => t.priority === p.id).length,
  }));

  const maxCategory = Math.max(1, ...byCategory.map((c) => c.count));
  const maxPriority = Math.max(1, ...byPriority.map((p) => p.count));

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Statistics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">A detailed look at your productivity.</p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProgressCard completionRate={stats.completionRate} completed={stats.completed} total={stats.total} />

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">Tasks by Category</h3>
          <div className="space-y-3">
            {byCategory.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{c.label}</span>
                  <span className="font-medium text-slate-500 dark:text-slate-400">{c.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                    style={{ width: `${(c.count / maxCategory) * 100}%`, transition: 'width 0.8s ease-out' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">Tasks by Priority</h3>
          <div className="space-y-3">
            {byPriority.map((p) => (
              <div key={p.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{p.label}</span>
                  <span className="font-medium text-slate-500 dark:text-slate-400">{p.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full ${p.dot}`}
                    style={{ width: `${(p.count / maxPriority) * 100}%`, transition: 'width 0.8s ease-out' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-base font-semibold text-slate-800 dark:text-slate-100">Overview</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex justify-between"><span>Due Today</span><span className="font-semibold">{stats.todayCount}</span></li>
            <li className="flex justify-between"><span>Due This Week</span><span className="font-semibold">{stats.weekCount}</span></li>
            <li className="flex justify-between"><span>High Priority Open</span><span className="font-semibold">{stats.high}</span></li>
            <li className="flex justify-between"><span>Overdue</span><span className="font-semibold text-rose-500">{stats.overdue}</span></li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
};

export default Statistics;
