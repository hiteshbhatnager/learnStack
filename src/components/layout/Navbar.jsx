import { useState } from 'react';
import { Layers, Menu, X, Bell, ChevronDown } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ activeRoute = 'home', onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'lectures', label: 'Lectures' },
    { id: 'notes', label: 'Notes' },
  ];

  const handleNavClick = (id, e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <div className="navbar-brand">
          <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick('home', e)}>
            <div className="navbar-logo-icon">
              <Layers size={20} strokeWidth={2.4} />
            </div>
            <span className="navbar-logo-text">
              Learn<span className="navbar-logo-highlight">Stack</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav">
          {navItems.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar-link ${isActive ? 'navbar-link--active' : ''}`}
                onClick={(e) => handleNavClick(item.id, e)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions / Profile */}
        <div className="navbar-right">
          <button className="navbar-icon-btn" aria-label="Notifications" title="Notifications">
            <Bell size={18} />
            <span className="navbar-badge-dot" />
          </button>

          <div className="navbar-profile">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alex Johnson"
              className="navbar-avatar"
            />
            <div className="navbar-profile-info">
              <span className="navbar-profile-name">Alex J.</span>
              <span className="navbar-profile-role">Student</span>
            </div>
            <ChevronDown size={14} className="navbar-profile-chevron" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <nav className="navbar-mobile-nav">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`navbar-mobile-link ${isActive ? 'navbar-mobile-link--active' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {item.label}
                  {isActive && <span className="navbar-mobile-active-tag">Active</span>}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
