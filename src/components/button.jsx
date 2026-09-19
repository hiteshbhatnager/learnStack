
function Button({
    onClick,
    text,
    children,
    className = "",
    type = "button",
    variant = "primary",
    disabled = false,
    title,
    ariaLabel,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variantStyles = {
        primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm",
        secondary: "bg-surface hover:bg-surface-hover text-text-primary border border-border focus:ring-primary",
        ghost: "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary focus:ring-primary",
        danger: "bg-error text-white hover:bg-error/90 focus:ring-error shadow-sm",
        dangerGhost: "bg-transparent text-error hover:bg-error/10 focus:ring-error",
        outline: "bg-transparent border border-border text-text-primary hover:bg-surface-hover focus:ring-primary",
    };

    const selectedVariant = variantStyles[variant] || "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={ariaLabel || (typeof text === "string" ? text : undefined)}
            className={`
                rounded-lg
                px-3.5
                py-2
                text-sm
                ${baseStyles}
                ${selectedVariant}
                ${className}
            `}
            {...props}
        >
            {children || text}
        </button>
    );
}

export default Button;