import StatCard from '../ui/StatCard';
import './QuickStats.css';

export default function QuickStats({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="quick-stats-grid" aria-label="Key Statistics">
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
          badge={stat.badge}
        />
      ))}
    </section>
  );
}
