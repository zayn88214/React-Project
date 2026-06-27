import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    aria-label="Add new task"
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.06 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/40 md:hidden"
  >
    <Plus className="h-6 w-6" />
  </motion.button>
);

export default FloatingButton;
