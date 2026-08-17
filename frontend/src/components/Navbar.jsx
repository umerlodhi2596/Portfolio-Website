import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/navLinks";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <NavLink to="/" className="logo">
          umer<span>.dev</span>
        </NavLink>

        {/* Desktop navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className={`nav-toggle${menuOpen ? " active" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-menu-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      >
        <aside
          className={`mobile-sidebar${menuOpen ? " open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-sidebar-header">
            <span className="mobile-menu-label">MENU</span>

            <button
              className="mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav>
            <ul>
              {NAV_LINKS.map((link, index) => (
                <li key={link.label}>
                  <NavLink
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "active" : ""
                    }
                  >
                    <span className="mobile-link-number">
                      0{index + 1}
                    </span>

                    <span>{link.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}