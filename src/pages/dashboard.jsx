import React from "react";
import { Button, Logo } from "../components";

function Dashboard() {
    return (
        <div className="min-h-screen bg-background">

            <nav className="
                flex
                items-center
                justify-between

                bg-surface
                border-b
                border-primary/10

                px-8
                py-3

                shadow-sm
            ">

                {/* Logo */}
                <Logo />

                {/* Navigation */}
                <div className="flex items-center gap-1">

                    {/* Active */}
                    <Button
                        text="Dashboard"
                        className="
                            bg-primary
                            text-white
                            hover:bg-primary-hover

                            shadow-sm
                        "
                    />

                    {/* Normal */}
                    <Button
                        text="About"
                        className="
                            bg-transparent
                            text-text-secondary

                            hover:bg-surface-hover
                            hover:text-primary
                        "
                    />

                    <Button
                        text="Login"
                        className="
                            bg-transparent
                            text-text-secondary

                            hover:bg-surface-hover
                            hover:text-primary
                        "
                    />

                    {/* Logout */}
                    <Button
                        text="Logout"
                        className="
                            bg-transparent
                            text-error

                            hover:bg-error/10
                        "
                    />

                </div>

            </nav>

        </div>
    );
}

export default Dashboard;