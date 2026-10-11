import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { MobileTabBar } from './components/MobileTabBar';
import { Footer } from './components/Footer';
import { AiChatWidget } from './components/AiChatWidget';
import { CustomCursor } from './components/CustomCursor';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { JourneyPage } from './pages/JourneyPage';
import { ContactPage } from './pages/ContactPage';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        <div className="bg-background font-body-regular text-body-regular text-on-surface min-h-screen selection:bg-secondary selection:text-on-secondary flex flex-col justify-between overflow-x-hidden">
          <Navbar />
          <main className="w-full max-w-[1200px] mx-auto pt-20 sm:pt-24 pb-24 lg:pb-12 px-3 sm:px-space-md lg:px-space-xl bg-background flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <AiChatWidget />
          <MobileTabBar />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
