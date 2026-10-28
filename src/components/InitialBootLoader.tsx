import React, { useEffect } from 'react';

declare global {
  interface Window {
    __dismissBootLoader?: () => void;
    __clearBootFailsafe?: () => void;
    __APP_BOOTED__?: boolean;
  }
}

/**
 * Programmatically dismisses the initial HTML boot loader with a smooth fade-out.
 */
export const dismissBootLoader = (): void => {
  if (typeof window === 'undefined') return;

  // Clear failsafe timer if still active
  if (window.__clearBootFailsafe) {
    window.__clearBootFailsafe();
  }

  // Mark app as booted in session and memory
  window.__APP_BOOTED__ = true;
  try {
    sessionStorage.setItem('az_app_booted', '1');
  } catch {
    // Ignore storage availability errors
  }

  const loader = document.getElementById('initial-boot-loader');
  if (loader && !loader.classList.contains('az-boot-fade-out')) {
    loader.classList.add('az-boot-fade-out');

    // Remove from DOM after transition completes to free memory
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 400);
  }
};

/**
 * Hook to automatically dismiss the initial boot loader once the React component tree mounts.
 * Includes a micro-buffer so the initial route has completed its first paint without visual flicker.
 */
export const useInitialBootLoader = (delayMs: number = 100): void => {
  useEffect(() => {
    // Only run on the initial client-side boot
    const timer = setTimeout(() => {
      dismissBootLoader();
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);
};

/**
 * Component version to place near the root of the app.
 */
export const InitialBootLoaderManager: React.FC = () => {
  useInitialBootLoader(120);
  return null;
};

export default InitialBootLoaderManager;
