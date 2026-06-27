import { CalendarDays, CalendarRange, Flame } from 'lucide-react';
import Card from '../ui/Card';

const Row = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
    </div>
    <span className="text-base font-bold text-slate-800 dark:text-slate-100">{value}</span>
  </div>
);

const TaskSummary = ({ stats }) => (
  <Card className="p-5">
    <h3 className="mb-3 text-base font-semibold text-slate-800 dark:text-slate-100">Quick Summary</h3>
    <div className="space-y-1">
      <Row icon={CalendarDays} label="Due Today" value={stats.todayCount} color="bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300" />
      <Row icon={CalendarRange} label="Due This Week" value={stats.weekCount} color="bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300" />
      <Row icon={Flame} label="High Priority" value={stats.high} color="bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-300" />
    </div>
  </Card>
);

export default TaskSummary;
