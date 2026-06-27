import { motion } from 'framer-motion';
import { Pencil, Trash2, Calendar, Clock, Pin, AlertTriangle } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import CategoryBadge from './CategoryBadge';
import PriorityBadge from './PriorityBadge';
import { formatRelativeDate, formatFullDate, isOverdue, isToday } from '../../utils/dateHelpers';

const TaskCard = ({ task, onToggle, onEdit, onDelete, onTogglePin }) => {
  const overdue = isOverdue(task.dueDate, task.completed);
  const today = isToday(task.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: task.completed ? 0.6 : 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      whileHover={{ y: -3, scale: 1.005 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={`group relative rounded-2xl bg-white dark:bg-slate-800/60 p-4 sm:p-5 ring-1 ring-slate-900/5 dark:ring-white/10 shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        task.pinned ? 'ring-2 ring-indigo-200 dark:ring-indigo-500/30' : ''
      }`}
    >
      {task.pinned && (
        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
          <Pin className="h-3 w-3 text-white" fill="white" />
        </div>
      )}
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="pt-0.5">
          <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} label={`Mark "${task.title}" complete`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-sm sm:text-base font-semibold leading-snug text-slate-800 dark:text-slate-100 ${
                task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''
              }`}
            >
              {task.title}
            </h3>

            <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
              <button
                onClick={() => onTogglePin(task.id)}
                aria-label="Pin task"
                title="Pin task"
                className={`rounded-lg p-1.5 transition-colors ${task.pinned ? 'text-amber-500' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-amber-500'}`}
              >
                <Pin className="h-4 w-4" fill={task.pinned ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => onEdit(task)}
                aria-label="Edit task"
                title="Edit task"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-500 transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(task)}
                aria-label="Delete task"
                title="Delete task"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p
              className={`mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 ${
                task.completed ? 'line-through opacity-70' : ''
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <CategoryBadge category={task.category} />
            <PriorityBadge priority={task.priority} />

            {task.dueDate && (
              <Badge
                icon={overdue ? AlertTriangle : Calendar}
                label={formatRelativeDate(task.dueDate)}
                tone={overdue ? 'overdue' : today ? 'today' : 'default'}
              />
            )}

            <span className="ml-auto inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Clock className="h-3 w-3" />
              {formatFullDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Badge = ({ icon: Icon, label, tone }) => {
  const toneClasses = {
    overdue: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300',
    today: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300',
    default: 'bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

export default TaskCard;
