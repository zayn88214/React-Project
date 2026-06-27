import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import Button from './Button';
import { Plus } from 'lucide-react';

const EmptyState = ({ title = 'No tasks yet', description = 'Create your first task to get started on your productivity journey.', onCreate, icon: Icon = ClipboardList }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30 px-6 py-16 text-center"
  >
    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-500/15 dark:to-violet-500/15">
      <Icon className="h-9 w-9 text-indigo-500" />
    </div>
    <h3 className="mb-1.5 text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
    <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
    {onCreate && (
      <Button onClick={onCreate} icon={Plus}>
        Create Task
      </Button>
    )}
  </motion.div>
);

export default EmptyState;
