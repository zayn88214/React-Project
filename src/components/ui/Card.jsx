import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => (
  <motion.div
    className={`rounded-2xl bg-white dark:bg-slate-800/60 ring-1 ring-slate-900/5 dark:ring-white/10 shadow-sm ${
      hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg' : ''
    } ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export default Card;
