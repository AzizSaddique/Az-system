import React from 'react';

interface RouteLoadingFallbackProps {
  label?: string;
}

export const RouteLoadingFallback: React.FC<RouteLoadingFallbackProps> = ({
  label = 'SYSTEM_NODE // LOADING ROUTE TELEMETRY...'
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full min-h-[50vh] flex flex-col items-center justify-center p-space-lg my-space-md rounded-2xl bg-surface-container-low/40 border border-outline-variant/20 relative overflow-hidden"
    >
      {/* Subtle Ambient Pulse Background */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="w-64 h-64 rounded-full bg-secondary/5 blur-[90px] absolute pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Cyber Shimmer Box */}
      <div className="flex flex-col items-center gap-space-sm text-center max-w-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping shrink-0" />
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
          <span className="font-mono-label text-xs tracking-widest text-secondary uppercase font-bold">
            PROGRESSIVE MOUNT
          </span>
        </div>

        <div className="w-48 h-1 rounded-full bg-surface-container-high overflow-hidden my-1">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-secondary to-transparent animate-shimmer" />
        </div>

        <span className="font-mono-code text-[11px] sm:text-xs text-outline">
          {label}
        </span>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;
