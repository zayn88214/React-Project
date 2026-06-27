import { isToday, isThisWeek, isOverdue } from './dateHelpers';

export const filterTasks = (tasks, { status, category, priority, search }) => {
  let result = tasks;

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description || '').toLowerCase().includes(q)
    );
  }

  if (category && category !== 'all') {
    result = result.filter((t) => t.category === category);
  }

  if (priority && priority !== 'all') {
    result = result.filter((t) => t.priority === priority);
  }

  switch (status) {
    case 'completed':
      result = result.filter((t) => t.completed);
      break;
    case 'pending':
      result = result.filter((t) => !t.completed);
      break;
    case 'today':
      result = result.filter((t) => isToday(t.dueDate));
      break;
    case 'week':
      result = result.filter((t) => isThisWeek(t.dueDate));
      break;
    case 'overdue':
      result = result.filter((t) => isOverdue(t.dueDate, t.completed));
      break;
    case 'important':
      result = result.filter((t) => t.priority === 'high');
      break;
    default:
      break;
  }

  return result;
};
