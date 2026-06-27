import { getCategory } from '../../constants/categories';
import Badge from '../ui/Badge';

const CategoryBadge = ({ category }) => {
  const cat = getCategory(category);
  const Icon = cat.icon;
  return (
    <Badge className={`${cat.bg} ${cat.text}`}>
      <Icon className="h-3 w-3" />
      {cat.label}
    </Badge>
  );
};

export default CategoryBadge;
