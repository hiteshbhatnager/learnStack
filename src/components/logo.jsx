import React from "react";
import logo from "../images/logo2.png";

function Logo({ showText = true, className = "" }) {
    return (
        <div
            className={`flex items-center gap-2 select-none ${className}`}
            aria-label="LearnStack"
        >
            {/* Logo Image */}
            <img
                src={logo}
                alt="LearnStack Logo"
                className="h-10 w-10 object-contain"
            />

            {/* Logo Name */}
            {showText && (
                <div className="text-xl font-bold tracking-tight">
                    <span className="text-text-primary">Learn</span>
                    <span className="text-primary">Stack</span>
                </div>
            )}
        </div>
    );
}

export default Logo;