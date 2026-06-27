import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListChecks,
  CheckCircle2,
  Circle,
  CalendarDays,
  CalendarClock,
  Star,
  BarChart3,
  X,
  Layers,
} from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tasks/all', label: 'All Tasks', icon: ListChecks },
  { to: '/tasks/completed', label: 'Completed', icon: CheckCircle2 },
  { to: '/tasks/pending', label: 'Pending', icon: Circle },
  { to: '/tasks/today', label: 'Today', icon: CalendarDays },
  { to: '/tasks/upcoming', label: 'Upcoming', icon: CalendarClock },
  { to: '/tasks/important', label: 'Important', icon: Star },
];

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
    isActive
      ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/25'
      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`;

const SidebarContent = () => (
  <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
    <div className="flex items-center gap-2.5 px-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/30">
        <Layers className="h-5 w-5 text-white" />
      </div>
      <span className="text-lg font-bold text-slate-800 dark:text-slate-100">TaskFlow</span>
    </div>

    <nav className="space-y-1">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
          <item.icon className="h-[18px] w-[18px]" />
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Categories
      </p>
      <nav className="space-y-1">
        {CATEGORIES.map((cat) => (
          <NavLink key={cat.id} to={`/category/${cat.id}`} className={linkClasses}>
            <cat.icon className="h-[18px] w-[18px]" />
            {cat.label}
          </NavLink>
        ))}
      </nav>
    </div>

    <div className="mt-auto">
      <NavLink to="/statistics" className={linkClasses}>
        <BarChart3 className="h-[18px] w-[18px]" />
        Statistics
      </NavLink>
    </div>
  </div>
);

const Sidebar = ({ mobileOpen, onCloseMobile }) => (
  <>
    {/* Desktop sidebar */}
    <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col border-r border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 glass">
      <SidebarContent />
    </aside>

    {/* Mobile sidebar */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 shadow-2xl lg:hidden"
          >
            <button
              onClick={onCloseMobile}
              aria-label="Close sidebar"
              className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  </>
);

export default Sidebar;
