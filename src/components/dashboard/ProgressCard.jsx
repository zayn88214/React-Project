import { motion } from 'framer-motion';
import Card from '../ui/Card';

const ProgressCard = ({ completionRate, completed, total }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionRate / 100) * circumference;

  return (
    <Card className="p-6">
      <h3 className="mb-5 text-base font-semibold text-slate-800 dark:text-slate-100">Your Progress</h3>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-around">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-700" />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              stroke="url(#progressGradient)"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{completionRate}%</span>
            <span className="text-xs text-slate-400">complete</span>
          </div>
        </div>

        <div className="w-full max-w-xs flex-1">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              {completed} of {total} tasks
            </span>
            <span className="font-semibold text-indigo-500">{completionRate}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            {completionRate === 100 && total > 0
              ? "🎉 All tasks complete — amazing work!"
              : 'Keep going — every completed task counts.'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressCard;
