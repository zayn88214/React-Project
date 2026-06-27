import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Plus, Sun, Moon, LayoutDashboard, ListChecks, BarChart3 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const CommandPalette = ({ isOpen, onClose, onAddTask }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  const commands = useMemo(
    () => [
      { id: 'add', label: 'Create new task', icon: Plus, action: () => onAddTask() },
      { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, action: () => navigate('/') },
      { id: 'all', label: 'Go to All Tasks', icon: ListChecks, action: () => navigate('/tasks/all') },
      { id: 'stats', label: 'Go to Statistics', icon: BarChart3, action: () => navigate('/statistics') },
      { id: 'theme', label: 'Toggle theme', icon: Sun, action: () => toggleTheme() },
    ],
    [navigate, onAddTask, toggleTheme]
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-slate-900/40 glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 px-4 py-3">
              <Search className="h-[18px] w-[18px] text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-100 outline-none placeholder:text-slate-400"
              />
              <kbd className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-xs text-slate-400">Esc</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-slate-400">No commands found</p>}
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                >
                  <cmd.icon className="h-4 w-4 text-slate-400" />
                  {cmd.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
