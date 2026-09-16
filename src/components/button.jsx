import React from "react";

function Button({
    onClick,
    text,
    className = "",
    type = "button",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`
                inline-flex
                items-center
                justify-center
                rounded-lg
                px-4
                py-2.5
                mx-3
                text-sm
                font-medium
                transition-all
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-primary
                focus:ring-offset-2
                ${className}
            `}
        >
            {text}
        </button>
    );
}

export default Button;