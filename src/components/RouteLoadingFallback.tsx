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
      className="w-full min-h-[55vh] flex flex-col justify-start items-center py-space-xl px-2 sm:px-space-md relative overflow-hidden"
    >
      {/* Background Technical Watermark Grid */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-15 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="w-72 h-72 rounded-full bg-secondary/5 blur-[100px] absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-3xl flex flex-col gap-space-lg">
        {/* Wireframe Page Header Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary/60 animate-ping" />
            <div className="h-5 w-36 rounded-full bg-surface-container-high/60 overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-surface-container-highest to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="h-10 w-3/4 max-w-sm rounded-lg bg-surface-container-high/50 overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-surface-container-highest to-transparent animate-shimmer" />
          </div>
          <div className="h-4 w-full max-w-lg rounded bg-surface-container-high/30 overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-surface-container-highest to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Central Cyber Status Card */}
        <div className="p-space-md sm:p-space-lg rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 backdrop-blur-md shadow-lg flex flex-col items-center justify-center gap-space-sm text-center my-space-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 shadow-[0_0_8px_rgba(170,224,46,0.6)]" />
            <span className="font-mono-label text-xs tracking-widest text-secondary uppercase font-bold">
              PROGRESSIVE ROUTE MOUNT
            </span>
          </div>

          {/* Indeterminate scanning rail */}
          <div className="w-48 sm:w-64 h-1.5 rounded-full bg-surface-container-highest/80 overflow-hidden relative my-1">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary to-transparent animate-shimmer" />
          </div>

          <span className="font-mono-code text-[11px] sm:text-xs text-outline tracking-wider">
            {label}
          </span>
        </div>

        {/* Wireframe Card Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md opacity-60">
          <div className="h-40 rounded-xl bg-surface-container-low/40 border border-outline-variant/20 p-space-md flex flex-col justify-between overflow-hidden relative">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-surface-container-high/50" />
              <div className="h-5 w-44 rounded bg-surface-container-high/40" />
              <div className="h-3 w-full rounded bg-surface-container-high/30" />
            </div>
            <div className="h-3 w-20 rounded bg-surface-container-high/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-high/15 to-transparent animate-shimmer" />
          </div>

          <div className="h-40 rounded-xl bg-surface-container-low/40 border border-outline-variant/20 p-space-md flex flex-col justify-between overflow-hidden relative">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-surface-container-high/50" />
              <div className="h-5 w-44 rounded bg-surface-container-high/40" />
              <div className="h-3 w-full rounded bg-surface-container-high/30" />
            </div>
            <div className="h-3 w-20 rounded bg-surface-container-high/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-container-high/15 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteLoadingFallback;

