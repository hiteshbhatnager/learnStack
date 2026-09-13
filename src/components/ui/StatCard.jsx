import Card from './Card';
import { BookOpen, CheckSquare, FileText, Flame } from 'lucide-react';
import './StatCard.css';

// Map icon names from data to actual Lucide components
const iconMap = {
  BookOpen,
  CheckSquare,
  FileText,
  Flame,
};

export default function StatCard({
  title,
  value,
  icon,
  description,
  badge
}) {
  const IconComponent = typeof icon === 'string' ? iconMap[icon] || BookOpen : icon;

  return (
    <Card hoverable className="stat-card" padding="default">
      <div className="stat-card__top">
        <div className={`stat-card__icon-wrapper stat-card__icon--${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {IconComponent && <IconComponent size={22} className="stat-card__icon" />}
        </div>
        {badge && (
          <span className="stat-card__badge">{badge}</span>
        )}
      </div>

      <div className="stat-card__content">
        <div className="stat-card__value">{value}</div>
        <div className="stat-card__title">{title}</div>
        {description && (
          <p className="stat-card__description">{description}</p>
        )}
      </div>
    </Card>
  );
}
