import { Dumbbell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Memberships", href: "#memberships" },
  { label: "Trainers", href: "#trainers" },
  { label: "Transformations", href: "#transformations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-brand-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 bg-brand-primary rounded flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-brand-dark" />
            </div>
            <span className="font-heading font-bold text-xl text-white uppercase tracking-wider">
              RAW <span className="text-brand-primary">FITNESS</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-heading text-sm uppercase tracking-wider text-brand-muted hover:text-brand-primary transition-colors duration-200 relative group"
                data-ocid="nav.link"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
            <a
              href="https://wa.me/1234567890?text=Hi%20RAW%20FITNESS%2C%20I%20want%20to%20join!"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-semibold text-sm uppercase tracking-wider bg-brand-primary text-brand-dark px-6 py-2.5 rounded hover:bg-brand-olive transition-colors duration-200 shadow-neon-glow"
              data-ocid="nav.primary_button"
            >
              Join Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-white hover:text-brand-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden animate-slide-down border-t border-brand-border bg-brand-card">
            <div className="py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-heading text-sm uppercase tracking-wider text-brand-muted hover:text-brand-primary hover:bg-white/5 transition-colors duration-200 px-4 py-3"
                  data-ocid="nav.link"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <a
                  href="https://wa.me/1234567890?text=Hi%20RAW%20FITNESS%2C%20I%20want%20to%20join!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center font-heading font-semibold text-sm uppercase tracking-wider bg-brand-primary text-brand-dark px-6 py-3 rounded hover:bg-brand-olive transition-colors duration-200"
                  data-ocid="nav.primary_button"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
