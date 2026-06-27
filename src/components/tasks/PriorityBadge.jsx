import { getPriority } from '../../constants/priority';
import Badge from '../ui/Badge';

const PriorityBadge = ({ priority }) => {
  const p = getPriority(priority);
  return (
    <Badge dot dotColor={p.dot} className={`${p.bg} ${p.text}`}>
      {p.label}
    </Badge>
  );
};

export default PriorityBadge;
