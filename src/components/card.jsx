
function Card({
    title,
    subtitle,
    icon,
    count,
    children,
    onViewAll,
    viewAllText = "View all →",
    action,
    className = "",
}) {
    return (
        <div
            className={`
                flex
                flex-col
                rounded-xl
                border
                border-border
                bg-surface
                p-5
                shadow-xs
                transition-all
                duration-200
                ${className}
            `}
        >
            {/* Header */}
            {(title || icon || count !== undefined || action) && (
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-primary-light
                                    text-primary
                                "
                            >
                                {icon}
                            </div>
                        )}
                        <div>
                            {title && (
                                <h2 className="text-base font-semibold text-text-primary">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="mt-0.5 text-xs text-text-muted">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {count !== undefined && (
                            <span
                                className="
                                    rounded-full
                                    bg-primary-light
                                    px-2.5
                                    py-0.5
                                    text-xs
                                    font-semibold
                                    text-primary
                                "
                            >
                                {count}
                            </span>
                        )}
                        {action}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className={`${(title || icon || count !== undefined || action) ? "mt-4" : ""} flex-1`}>
                {children}
            </div>

            {/* Footer */}
            {onViewAll && (
                <div className="mt-4 pt-3 border-t border-border/60">
                    <button
                        type="button"
                        onClick={onViewAll}
                        className="
                            w-fit
                            text-sm
                            font-medium
                            text-primary
                            transition-colors
                            hover:text-primary-hover
                            cursor-pointer
                            flex
                            items-center
                            gap-1
                        "
                    >
                        {viewAllText}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Card;