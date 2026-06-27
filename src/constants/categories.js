import {
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Dumbbell,
  User,
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'work', label: 'Work', icon: Briefcase, color: 'from-indigo-500 to-blue-500', text: 'text-indigo-600 dark:text-indigo-300', bg: 'bg-indigo-100 dark:bg-indigo-500/15' },
  { id: 'study', label: 'Study', icon: GraduationCap, color: 'from-violet-500 to-purple-500', text: 'text-violet-600 dark:text-violet-300', bg: 'bg-violet-100 dark:bg-violet-500/15' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingCart, color: 'from-pink-500 to-rose-500', text: 'text-pink-600 dark:text-pink-300', bg: 'bg-pink-100 dark:bg-pink-500/15' },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell, color: 'from-emerald-500 to-teal-500', text: 'text-emerald-600 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-500/15' },
  { id: 'personal', label: 'Personal', icon: User, color: 'from-amber-500 to-orange-500', text: 'text-amber-600 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-500/15' },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[4];
