import './Card.css';

/**
 * Reusable Card component for dashboard widgets and containers
 */
export default function Card({
  children,
  className = '',
  hoverable = false,
  padding = 'default', // 'none' | 'sm' | 'default' | 'lg'
  ...props
}) {
  return (
    <div
      className={`card ${hoverable ? 'card--hoverable' : ''} card--padding-${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
