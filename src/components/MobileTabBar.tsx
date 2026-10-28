import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Compass, Mail } from 'lucide-react';

interface TabItem {
  name: string;
  to: string;
  icon: React.FC<{ className?: string }>;
  end?: boolean;
}

const TABS: TabItem[] = [
  { name: 'Home', to: '/', icon: Home, end: true },
  { name: 'About', to: '/about', icon: User },
  { name: 'Projects', to: '/projects', icon: Briefcase },
  { name: 'Journey', to: '/journey', icon: Compass },
  { name: 'Contact', to: '/contact', icon: Mail }
];

export const MobileTabBar: React.FC = () => {
  return (
    <nav
      role="navigation"
      aria-label="Mobile bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] pb-[max(env(safe-area-inset-bottom,0px),0.25rem)] pt-1"
    >
      <div className="max-w-md mx-auto px-2 flex items-center justify-around">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-1.5 px-1 min-h-[48px] rounded-xl transition-all duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary active:scale-95 ${
                  isActive
                    ? 'text-secondary font-semibold'
                    : 'text-on-surface-variant/70 hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Animated active glow indicator sliding between tabs */}
                  {isActive && (
                    <motion.span
                      layoutId="mobileActiveTabGlow"
                      className="absolute top-0 w-8 h-0.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(170,224,46,0.8)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}

                  <div
                    className={`p-1 rounded-lg transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono-label tracking-wider uppercase mt-0.5 leading-none">
                    {tab.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileTabBar;
