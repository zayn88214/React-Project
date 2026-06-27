import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ListTodo, CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const useAnimatedCounter = (value, duration = 800) => {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    let raf;

    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(fromRef.current + (value - fromRef.current) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return display;
};

const StatCard = ({ label, value, icon: Icon, gradient, suffix = '' }) => {
  const animated = useAnimatedCounter(value);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-5 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10"
    >
      <div className={`absolute inset-0 opacity-90 bg-gradient-to-br ${gradient}`} />
      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <p className="text-2xl font-bold text-white tabular-nums">
          {animated}
          {suffix}
        </p>
        <p className="mt-0.5 text-sm font-medium text-white/85">{label}</p>
      </div>
    </motion.div>
  );
};

const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
    <StatCard label="Total Tasks" value={stats.total} icon={ListTodo} gradient="from-indigo-500 to-blue-600" />
    <StatCard label="Completed" value={stats.completed} icon={CheckCircle2} gradient="from-emerald-500 to-teal-600" />
    <StatCard label="Pending" value={stats.pending} icon={Clock} gradient="from-amber-500 to-orange-600" />
    <StatCard label="Overdue" value={stats.overdue} icon={AlertTriangle} gradient="from-rose-500 to-red-600" />
    <StatCard
      label="Completion Rate"
      value={stats.completionRate}
      suffix="%"
      icon={TrendingUp}
      gradient="from-violet-500 to-purple-600"
    />
  </div>
);

export default StatsCards;
