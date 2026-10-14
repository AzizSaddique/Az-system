import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Briefcase, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-12 relative">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-secondary/10 blur-[130px] pointer-events-none -z-10" />

      {/* Technical Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/80 border border-outline-variant/30 font-mono-label text-xs sm:text-mono-label text-secondary mb-6">
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        <span>HTTP // 404_ROUTE_NOT_FOUND</span>
      </div>

      {/* Main Heading */}
      <div className="space-y-3 max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-secondary" />
          <h1 className="font-heading-xl text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface tracking-tight">
            Node Not Found
          </h1>
        </div>

        <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant leading-relaxed">
          The requested coordinate or document route does not exist in this telemetry network. It may have been relocated, unmounted, or entered with an invalid path.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-on-secondary font-mono-code text-xs sm:text-mono-code font-bold hover:brightness-110 transition-all shadow-[0_2px_12px_rgba(170,224,46,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 text-on-surface hover:text-secondary font-mono-code text-xs sm:text-mono-code transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <Briefcase className="w-4 h-4" />
          <span>Explore Projects</span>
        </Link>
      </div>

      {/* Diagnostic Footprint */}
      <div className="mt-12 p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/20 font-mono-code text-[11px] text-outline max-w-md w-full">
        <span>SYS_STATUS: ROUTER_FALLBACK_ACTIVE • LOCATION_CHECK_FAILED</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
