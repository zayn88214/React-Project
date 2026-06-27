import { createContext, useContext, useMemo, useCallback, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isToday, isThisWeek, isOverdue } from '../utils/dateHelpers';

const TaskContext = createContext(null);

const SAMPLE_TASKS = [
  {
    id: crypto.randomUUID(),
    title: 'Welcome to TaskFlow 👋',
    description: 'This is a sample task. Check it off, edit it, or delete it to get started.',
    category: 'personal',
    priority: 'medium',
    dueDate: null,
    completed: false,
    pinned: true,
    createdAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Plan weekly sprint',
    description: 'Outline goals and assign tasks for the upcoming sprint.',
    category: 'work',
    priority: 'high',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    pinned: false,
    createdAt: Date.now() - 100000,
  },
  {
    id: crypto.randomUUID(),
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, and vegetables.',
    category: 'shopping',
    priority: 'low',
    dueDate: null,
    completed: true,
    pinned: false,
    createdAt: Date.now() - 200000,
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', SAMPLE_TASKS);
  const [lastDeleted, setLastDeleted] = useState(null);

  const addTask = useCallback((task) => {
    const newTask = {
      id: crypto.randomUUID(),
      pinned: false,
      completed: false,
      createdAt: Date.now(),
      ...task,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (task) setLastDeleted(task);
      return prev.filter((t) => t.id !== id);
    });
  }, [setTasks]);

  const undoDelete = useCallback(() => {
    if (lastDeleted) {
      setTasks((prev) => [lastDeleted, ...prev]);
      setLastDeleted(null);
    }
  }, [lastDeleted, setTasks]);

  const toggleComplete = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, [setTasks]);

  const togglePin = useCallback((id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t)));
  }, [setTasks]);

  const importTasks = useCallback((imported) => {
    setTasks(imported);
  }, [setTasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;
    const high = tasks.filter((t) => t.priority === 'high' && !t.completed).length;
    const todayCount = tasks.filter((t) => isToday(t.dueDate)).length;
    const weekCount = tasks.filter((t) => isThisWeek(t.dueDate)).length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, completed, pending, overdue, high, todayCount, weekCount, completionRate };
  }, [tasks]);

  const value = useMemo(() => ({
    tasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
    undoDelete,
    toggleComplete,
    togglePin,
    importTasks,
    canUndo: !!lastDeleted,
  }), [tasks, stats, addTask, updateTask, deleteTask, undoDelete, toggleComplete, togglePin, importTasks, lastDeleted]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};
