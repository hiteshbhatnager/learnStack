import { useState } from "react";
import { NavLink, Link } from "react-router";
import Logo from "./logo";
import { Menu, X, CheckSquare, Calendar, BookOpen, LayoutDashboard, Info, LogIn, LogOut } from "lucide-react";

function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const navLinks = [
        { to: "/", label: "Dashboard", icon: LayoutDashboard },
        { to: "/task", label: "Tasks", icon: CheckSquare },
        { to: "/lecture", label: "Lectures", icon: Calendar },
        { to: "/notes", label: "Notes", icon: BookOpen },
    ];

    const getLinkClasses = ({ isActive }) =>
        `flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            isActive
                ? "bg-primary text-white shadow-xs"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        }`;

    const getMobileLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
            isActive
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
        }`;

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-14 items-center justify-between">
                    {/* Left: Brand / Logo */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1">
                            <Logo showText={true} />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        end={item.to === "/"}
                                        className={getLinkClasses}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right: Auxiliary & Auth */}
                    <div className="hidden md:flex items-center gap-2">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                    isActive
                                        ? "bg-primary-light text-primary"
                                        : "text-text-muted hover:text-text-primary hover:bg-surface-hover"
                                }`
                            }
                        >
                            <Info className="h-3.5 w-3.5" />
                            <span>About</span>
                        </NavLink>

                        {isLoggedIn ? (
                            <button
                                type="button"
                                onClick={() => setIsLoggedIn(false)}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-text-muted hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                                title="Sign out"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsLoggedIn(true)}
                                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer"
                            >
                                <LogIn className="h-3.5 w-3.5" />
                                <span>Login</span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="border-t border-border bg-surface px-4 pt-2 pb-4 md:hidden shadow-md">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === "/"}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={getMobileLinkClasses}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                        <div className="my-2 border-t border-border" />
                        <NavLink
                            to="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className={getMobileLinkClasses}
                        >
                            <Info className="h-4 w-4" />
                            <span>About LearnStack</span>
                        </NavLink>
                        {isLoggedIn ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-error hover:bg-error/10 transition-colors w-full text-left"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoggedIn(true);
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium bg-primary text-white transition-colors w-full text-left"
                            >
                                <LogIn className="h-4 w-4" />
                                <span>Login</span>
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Nav;