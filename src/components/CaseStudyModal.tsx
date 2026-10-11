import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-surface-container border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[92vh] sm:max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-3 sm:p-space-md bg-surface-container-highest/80 border-b border-outline-variant/20">
            <div className="flex items-center gap-space-xs font-mono-label text-[11px] sm:text-mono-label text-secondary uppercase">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>{project.category} // CASE STUDY</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-container-high text-on-surface hover:text-secondary transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-space-lg md:p-space-xl overflow-y-auto space-y-space-md sm:space-y-space-lg text-on-surface">
            <div className="space-y-space-xs">
              {project.badge && (
                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary/10 text-secondary font-mono-label text-mono-label font-bold">
                  <span>🏆 {project.badge}</span>
                </div>
              )}
              <h2 className="font-heading-xl text-xl sm:text-2xl md:text-heading-xl font-bold text-on-surface">
                {project.title}
              </h2>
              <p className="font-body-regular text-sm sm:text-body-regular text-on-surface-variant">
                {project.summary}
              </p>
            </div>

            {/* Project Hardware Visual */}
            <div className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/20 p-2 sm:p-space-sm">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-44 sm:h-64 md:h-80 object-contain mx-auto"
              />
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs font-mono-code text-mono-code">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-surface-container-low p-space-sm rounded-lg">
                  <div className="text-on-surface-variant text-[11px] uppercase">{m.label}</div>
                  <div className="text-secondary font-bold text-body-regular mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-space-xs">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-space-sm py-1 rounded bg-surface-container-highest font-mono-code text-mono-code text-on-surface"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Detailed Description */}
            <div className="space-y-space-xs">
              <h3 className="font-mono-label text-mono-label text-outline uppercase tracking-wider">
                ARCHITECTURAL OVERVIEW
              </h3>
              <p className="font-body-regular text-body-regular text-on-surface-variant leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Accomplishments */}
            <div className="space-y-space-xs">
              <h3 className="font-mono-label text-mono-label text-outline uppercase tracking-wider">
                KEY ENGINEERING HIGHLIGHTS
              </h3>
              <ul className="space-y-space-xs font-body-regular text-body-regular text-on-surface-variant">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-space-xs">
                    <span className="text-secondary font-mono-code">&gt;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-3 sm:p-space-md bg-surface-container-highest/80 border-t border-outline-variant/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between font-mono-label text-[11px] sm:text-mono-label text-outline gap-3">
            <span className="text-center sm:text-left">AZ // CASE STUDY VERIFIED</span>
            <div className="flex items-center gap-space-sm w-full sm:w-auto">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial min-h-[40px] px-space-md py-space-xs rounded-lg bg-secondary text-on-secondary font-bold hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial min-h-[40px] px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container border border-outline-variant/30 text-on-surface font-bold transition-colors flex items-center justify-center cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
