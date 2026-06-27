import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex h-9 w-16 items-center rounded-full bg-slate-200 dark:bg-slate-700 px-1 transition-colors duration-300"
    >
      <motion.div
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-md"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark ? <Moon className="h-3.5 w-3.5 text-indigo-400" /> : <Sun className="h-3.5 w-3.5 text-amber-500" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
