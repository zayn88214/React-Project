import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import EmptyState from '../ui/EmptyState';
import { Search } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onEdit, onDelete, onTogglePin, onCreate, hasFilters }) => {
  if (tasks.length === 0) {
    return hasFilters ? (
      <EmptyState
        icon={Search}
        title="No matching tasks"
        description="Try adjusting your search or filters to find what you're looking for."
      />
    ) : (
      <EmptyState onCreate={onCreate} />
    );
  }

  const ordered = [...tasks].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
      <AnimatePresence mode="popLayout">
        {ordered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onTogglePin={onTogglePin}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
