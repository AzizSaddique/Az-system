import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ExternalLink, Download, User, Mail, ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import resumePdf from '../assets/M.AZIZ SADDQIUE CV.pdf';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Journey', to: '/journey' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileTriggerRef = useRef<HTMLButtonElement>(null);

  // Close profile menu on route change
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Handle outside click & Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileTriggerRef.current &&
        !profileTriggerRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isProfileOpen) {
        setIsProfileOpen(false);
        profileTriggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-2 sm:p-space-sm md:p-space-md">
      <div className="h-16 sm:h-20 max-w-[1200px] w-full mx-auto px-3 sm:px-space-md flex items-center justify-between rounded-full bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.35)] border border-outline-variant/30 relative">

        {/* Logo Branding */}
        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-space-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-xl transition-transform active:scale-95"
            aria-label="Home - AZ / SYSTEMS"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/40 group-hover:border-secondary transition-colors shrink-0">
              <span className="font-mono-label text-mono-label font-bold text-secondary tracking-widest text-xs sm:text-sm">
                AZ
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading-md text-sm sm:text-body-regular font-bold tracking-tight text-on-surface whitespace-nowrap">
                AZ / SYSTEMS
              </span>
              <span className="font-mono-label text-[10px] sm:text-mono-label text-outline tracking-wider hidden sm:inline">
                NODE // PK-09
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Bar */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface-container-low/60 border border-outline-variant/20"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-space-md py-1.5 rounded-full text-xs sm:text-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeDesktopNav"
                    className="absolute inset-0 rounded-full bg-surface-container-highest border border-secondary/40 shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${isActive ? 'text-on-surface font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-1.5 sm:gap-space-sm md:gap-space-md">
          {/* Roles Badge (Desktop Wide) */}
          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono-label text-[11px] text-secondary uppercase tracking-wider">
              AVAILABLE FOR ROLES
            </span>
          </div>

          {/* Sun / Moon Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest border border-outline-variant/40 hover:border-secondary/60 text-on-surface hover:text-secondary flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary shrink-0 btn-micro active:scale-95"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-secondary" />
              ) : (
                <Moon className="w-4 h-4 text-secondary" />
              )}
            </motion.div>
          </button>

          {/* Primary Resume Preview Button (Desktop/Tablet) */}
          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            title="Preview Resume PDF in new tab"
            className="hidden md:flex px-space-md py-space-xs rounded-full bg-surface-container-high/80 hover:bg-secondary hover:text-on-secondary font-mono-code text-mono-code text-on-surface border border-outline-variant/40 hover:border-secondary transition-all items-center justify-center gap-1.5 text-xs sm:text-mono-code"
          >
            <span>Resume</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Dedicated Direct Download Resume Button (Desktop) */}
          <a
            href={resumePdf}
            download="Muhammad_Aziz_Saddique_Resume.pdf"
            title="Download Resume PDF"
            className="hidden sm:flex px-space-sm py-space-xs rounded-full bg-secondary/15 hover:bg-secondary text-secondary hover:text-on-secondary font-mono-code text-mono-code border border-secondary/30 transition-all items-center justify-center gap-1.5 text-xs sm:text-mono-code"
          >
            <span>Download</span>
            <Download className="w-3.5 h-3.5" />
          </a>

          {/* Interactive Profile Avatar Trigger Button */}
          <div className="relative">
            <button
              ref={profileTriggerRef}
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-label="Open profile and actions menu"
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              className={`relative flex items-center gap-1 p-0.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary group ${isProfileOpen ? 'ring-2 ring-secondary' : 'hover:ring-1 hover:ring-secondary/50'
                }`}
            >
              <div className="relative">
                <img
                  alt="Muhammad Aziz Saddique"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-outline-variant/40 group-hover:border-secondary transition-colors"
                  src={PORTFOLIO_DATA.personalInfo.avatarSmall}
                  width={40}
                  height={40}
                  decoding="async"
                />
                {/* Active Availability Dot on Avatar */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-surface-container-lowest" />
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 hidden sm:block ${isProfileOpen ? 'rotate-180 text-secondary' : 'group-hover:text-on-surface'
                  }`}
              />
            </button>

            {/* Profile Popover / Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  ref={profileMenuRef}
                  role="menu"
                  aria-label="Profile actions"
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-3 w-[290px] sm:w-[320px] rounded-2xl bg-surface-container-lowest/95 backdrop-blur-2xl border border-outline-variant/40 shadow-2xl p-space-md z-50 flex flex-col gap-space-sm origin-top-right"
                >
                  {/* Profile Identity Card */}
                  <div className="flex items-center gap-space-sm pb-space-sm border-b border-outline-variant/20">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-secondary/40 shadow-sm">
                      <img
                        alt="Muhammad Aziz Saddique"
                        className="w-full h-full object-cover"
                        src={PORTFOLIO_DATA.personalInfo.avatarSmall}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-heading-md text-sm sm:text-base font-bold text-on-surface truncate">
                        {PORTFOLIO_DATA.personalInfo.name}
                      </span>
                      <span className="font-mono-code text-[11px] text-on-surface-variant truncate">
                        {PORTFOLIO_DATA.personalInfo.title}
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="font-mono-label text-[10px] text-secondary font-semibold uppercase tracking-wider">
                          Available for Roles
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resume Actions */}
                  <div className="flex flex-col gap-1 py-1">
                    <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider px-2">
                      RESUME &amp; CREDENTIALS
                    </span>

                    <a
                      href={resumePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-mono-code text-on-surface hover:bg-surface-container-high transition-colors group btn-micro active:scale-98"
                    >
                      <span className="group-hover:text-secondary transition-colors">Preview Resume (PDF)</span>
                      <ExternalLink className="w-4 h-4 text-secondary" />
                    </a>

                    <a
                      href={resumePdf}
                      download="Muhammad_Aziz_Saddique_Resume.pdf"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-mono-code bg-secondary/10 text-secondary hover:bg-secondary hover:text-on-secondary font-semibold transition-all group btn-micro active:scale-98"
                    >
                      <span>Download CV (.pdf)</span>
                      <Download className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Navigation Shortcuts */}
                  <div className="flex flex-col gap-1 pt-space-xs border-t border-outline-variant/20">
                    <span className="font-mono-label text-[10px] text-outline uppercase tracking-wider px-2">
                      QUICK NAVIGATION
                    </span>

                    <Link
                      to="/about"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors btn-micro active:scale-98"
                    >
                      <User className="w-4 h-4 text-outline" />
                      <span>About &amp; Experience</span>
                    </Link>

                    <Link
                      to="/contact"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors btn-micro active:scale-98"
                    >
                      <Mail className="w-4 h-4 text-outline" />
                      <span>Contact &amp; Dispatch</span>
                    </Link>
                  </div>

                  {/* Location / Meta Footer */}
                  <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between text-[10px] font-mono-label text-outline px-1">
                    <span>LOC: Narowal, Punjab, PK</span>
                    <span>UTC+5 (PKT)</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
