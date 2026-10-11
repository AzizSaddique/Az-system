import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-space-xl border-t border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-space-md lg:px-space-xl py-space-xl flex flex-col gap-space-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-space-lg pb-space-lg border-b border-outline-variant/20">
          <div className="space-y-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-mono-label text-mono-label text-secondary tracking-widest font-bold">
                AZ // ENGINEERING
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-surface-container-high text-outline font-mono-label text-mono-label">
                V4.2
              </span>
            </div>
            <h2 className="font-heading-lg text-heading-lg text-on-surface">
              Beyond Code. Into the Real World.
            </h2>
            <p className="font-body-regular text-body-regular text-on-surface-variant max-w-xl">
              Software Developer • IoT &amp; Embedded Systems • Robotics Enthusiast
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-space-md font-mono-code text-xs sm:text-mono-code">
            <a
              className="px-space-sm sm:px-space-md py-space-xs rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface hover:text-secondary hover:border-secondary/40 transition-colors"
              href={PORTFOLIO_DATA.personalInfo.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              github.com/AzizSaddique
            </a>
            <a
              className="px-space-sm sm:px-space-md py-space-xs rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface hover:text-secondary hover:border-secondary/40 transition-colors"
              href={PORTFOLIO_DATA.personalInfo.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="px-space-sm sm:px-space-md py-space-xs rounded-lg bg-surface-container-low border border-outline-variant/40 text-on-surface hover:text-secondary hover:border-secondary/40 transition-colors"
              href={`mailto:${PORTFOLIO_DATA.personalInfo.email}`}
            >
              Email // Direct
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-md font-mono-label text-[10px] sm:text-mono-label text-outline pb-space-md border-b border-outline-variant/20">
          <div className="flex flex-wrap items-center gap-2 sm:gap-space-md">
            <span>LOC: GUJRAT, PUNJAB, PAKISTAN</span>
            <span className="hidden sm:inline">•</span>
            <span>SYS_STATUS: ALL SYSTEMS NOMINAL</span>
          </div>
          <div className="flex items-center gap-space-md">
            <span className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              TELEMETRY ACTIVE
            </span>
            <span>AZ-SYS // 2026</span>
          </div>
        </div>

        {/* Professional Copyright Notice */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-space-xs font-mono-label text-mono-label text-on-surface-variant text-[12px]">
          <span>© 2026 Muhammad Aziz Saddique. All rights reserved.</span>
          <span className="text-outline uppercase tracking-wider text-[11px]">ENGINEERED IN NAROWAL, PK</span>
        </div>
      </div>
    </footer>
  );
};
