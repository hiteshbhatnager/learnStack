import React from "react";

function Buttons({
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
        gap-2

        px-5
        py-2.5

        rounded-lg

        bg-primary
        hover:bg-primary-hover
        active:scale-[0.98]

        text-white
        text-sm
        font-medium

        shadow-sm
        hover:shadow

        transition-all
        duration-200

        focus:outline-none
        focus:ring-2
        focus:ring-primary
        focus:ring-offset-2

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${className}
      `}
        >
            {text}
        </button>
    );
}

export default Buttons;