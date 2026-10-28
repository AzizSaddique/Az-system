import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

const AiChatWidget = lazy(() => import('./AiChatWidget').then((m) => ({ default: m.AiChatWidget })));

export const AiChatLauncher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  // Prefetch chunk when user hovers or focuses on launcher button
  const handlePrefetch = () => {
    if (!hasStartedLoading) {
      setHasStartedLoading(true);
      import('./AiChatWidget');
    }
  };

  const handleOpen = () => {
    setHasStartedLoading(true);
    setIsOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher-btn"
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            onMouseEnter={handlePrefetch}
            onFocus={handlePrefetch}
            aria-label="Open AI Portfolio Assistant"
            aria-expanded={isOpen}
            className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface-container-high/90 hover:bg-surface-container-highest backdrop-blur-xl border border-secondary/50 text-on-surface shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_24px_rgba(170,224,46,0.35)] transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping absolute -top-0.5 -right-0.5 opacity-75" />
              <span className="w-2 h-2 rounded-full bg-secondary absolute -top-0.5 -right-0.5" />
              <Bot className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono-code text-[9px] text-outline leading-tight hidden sm:inline">
                ONLINE
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {isOpen && (
        <Suspense fallback={null}>
          <AiChatWidget defaultOpen={true} onClose={() => setIsOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default AiChatLauncher;
