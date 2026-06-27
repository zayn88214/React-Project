import Dropdown from '../ui/Dropdown';
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'priority', label: 'Priority' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'completedFirst', label: 'Completed First' },
  { value: 'pendingFirst', label: 'Pending First' },
];

const TaskSort = ({ value, onChange }) => (
  <Dropdown icon={ArrowUpDown} value={value} onChange={onChange} options={SORT_OPTIONS} />
);

export default TaskSort;
export { SORT_OPTIONS };
