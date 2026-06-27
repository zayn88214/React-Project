import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Checkbox = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    aria-label={label || 'Toggle complete'}
    onClick={onChange}
    className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
      checked
        ? 'border-indigo-500 bg-gradient-to-br from-indigo-500 to-violet-600'
        : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
    }`}
  >
    {checked && (
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      >
        <Check className="h-3 w-3 text-white" strokeWidth={3} />
      </motion.span>
    )}
  </button>
);

export default Checkbox;
