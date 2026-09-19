
function Input({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error,
    required = false,
    className = "",
    inputClassName = "",
    ...props
}) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs font-semibold text-text-secondary flex items-center gap-1"
                >
                    {label}
                    {required && <span className="text-error">*</span>}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`
                    w-full
                    rounded-lg
                    border
                    ${error ? "border-error focus:border-error focus:ring-error" : "border-border focus:border-primary focus:ring-primary"}
                    bg-surface
                    px-3.5
                    py-2
                    text-sm
                    text-text-primary
                    placeholder:text-text-disabled
                    transition-all
                    duration-150
                    focus:outline-none
                    focus:ring-1
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    ${inputClassName}
                `}
                {...props}
            />
            {error && (
                <p className="text-xs text-error font-medium">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;