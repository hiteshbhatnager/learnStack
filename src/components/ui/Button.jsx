import './Button.css';

/**
 * Reusable Button component
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} variant
 * @param {'sm' | 'md' | 'lg'} size
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 18} className="btn__icon" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 18} className="btn__icon" />}
    </button>
  );
}
