import { getPriority } from '../constants/priority';

export const sortTasks = (tasks, sortBy) => {
  const list = [...tasks];

  switch (sortBy) {
    case 'oldest':
      return list.sort((a, b) => a.createdAt - b.createdAt);
    case 'newest':
      return list.sort((a, b) => b.createdAt - a.createdAt);
    case 'priority':
      return list.sort((a, b) => getPriority(b.priority).weight - getPriority(a.priority).weight);
    case 'alphabetical':
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case 'dueDate':
      return list.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case 'completedFirst':
      return list.sort((a, b) => (b.completed ? 1 : 0) - (a.completed ? 1 : 0));
    case 'pendingFirst':
      return list.sort((a, b) => (a.completed ? 1 : 0) - (b.completed ? 1 : 0));
    default:
      return list.sort((a, b) => b.createdAt - a.createdAt);
  }
};
