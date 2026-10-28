import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { MobileTabBar } from './components/MobileTabBar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { RouteLoadingFallback } from './components/RouteLoadingFallback';
import { HomePage } from './pages/HomePage';

import { PageTransition } from './components/PageTransition';
import { InitialBootLoaderManager } from './components/InitialBootLoader';

// Route-level code-splitting: keep HomePage immediate for instant LCP, defer other routes
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const JourneyPage = lazy(() => import('./pages/JourneyPage').then(m => ({ default: m.JourneyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Lightweight AI launcher: defers full chat dependencies until user interaction
import { AiChatLauncher } from './components/AiChatLauncher';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        prevPathnameRef.current = pathname;
        return;
      }
    }

    // Only scroll to top if navigating to a different route.
    // Avoid running on initial mount / reload so browser scroll restoration and wheel input aren't blocked.
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    prevPathnameRef.current = pathname;
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <InitialBootLoaderManager />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <CustomCursor />
        <div className="bg-background font-body-regular text-body-regular text-on-surface min-h-screen selection:bg-secondary selection:text-on-secondary flex flex-col justify-between overflow-x-clip">
          <Navbar />
          <main className="w-full max-w-[1200px] mx-auto pt-20 sm:pt-24 pb-24 lg:pb-12 px-3 sm:px-space-md lg:px-space-xl bg-background flex-grow">
            <Suspense fallback={<RouteLoadingFallback />}>
              <Routes>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
                <Route path="/journey" element={<PageTransition><JourneyPage /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AiChatLauncher />
          <MobileTabBar />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
