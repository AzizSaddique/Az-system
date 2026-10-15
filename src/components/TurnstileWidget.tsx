import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export interface TurnstileWidgetRef {
  reset: () => void;
}

export interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: (errorCode?: string | number) => void;
  siteKey?: string;
  hasError?: boolean;
}

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  ({ onSuccess, onExpire, onError, siteKey: customSiteKey, hasError }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const isMountedRef = useRef<boolean>(true);
    const [widgetStatus, setWidgetStatus] = useState<'loading' | 'ready' | 'verified' | 'error'>('loading');
    const [statusMessage, setStatusMessage] = useState<string>('Initializing verification link...');

    // Stable ref for parent callbacks to prevent infinite re-renders or widget reinitializations
    const callbacksRef = useRef({ onSuccess, onExpire, onError });
    useEffect(() => {
      callbacksRef.current = { onSuccess, onExpire, onError };
    });

    // Determine sitekey: custom prop -> environment variable -> development dummy fallback
    const resolvedSiteKey =
      customSiteKey ||
      import.meta.env.VITE_TURNSTILE_SITE_KEY ||
      (import.meta.env.DEV ? '1x00000000000000000000AA' : '');

    // Stable render function that depends only on the resolvedSiteKey
    const renderWidgetInstance = useCallback(() => {
      if (!isMountedRef.current || !containerRef.current || !window.turnstile) return;

      // If a widget instance is already rendered and active, avoid redundant re-initialization
      if (widgetIdRef.current) {
        return;
      }

      // Ensure the container is clean
      containerRef.current.innerHTML = '';

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: resolvedSiteKey,
          theme: 'dark',
          size: 'normal',
          appearance: 'always',
          callback: (token: string) => {
            if (!isMountedRef.current) return;
            setWidgetStatus('verified');
            setStatusMessage('Security verification confirmed.');
            callbacksRef.current.onSuccess(token);
          },
          'expired-callback': () => {
            if (!isMountedRef.current) return;
            setWidgetStatus('error');
            setStatusMessage('Verification expired. Please refresh challenge.');
            callbacksRef.current.onExpire?.();
          },
          'error-callback': (errorCode) => {
            if (!isMountedRef.current) return;
            setWidgetStatus('error');
            setStatusMessage('Verification encountered an error.');
            callbacksRef.current.onError?.(errorCode);
          },
          'timeout-callback': () => {
            if (!isMountedRef.current) return;
            setWidgetStatus('error');
            setStatusMessage('Verification challenge timed out.');
            callbacksRef.current.onExpire?.();
          },
        });

        widgetIdRef.current = id;
        setWidgetStatus('ready');
        setStatusMessage('Security challenge loaded.');
      } catch (err) {
        console.error('[TurnstileWidget] Render failed:', err);
        if (isMountedRef.current) {
          setWidgetStatus('error');
          setStatusMessage('Failed to initialize verification challenge.');
        }
      }
    }, [resolvedSiteKey]);

    // Imperative reset method (called on submit success or validation failure)
    const reset = useCallback(() => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setWidgetStatus('ready');
          setStatusMessage('Security challenge refreshed.');
        } catch (e) {
          console.error('[TurnstileWidget] Reset error:', e);
        }
      } else if (window.turnstile && containerRef.current) {
        renderWidgetInstance();
      }
    }, [renderWidgetInstance]);

    useImperativeHandle(ref, () => ({
      reset,
    }), [reset]);

    // Single lifecycle effect for widget mounting/cleanup
    useEffect(() => {
      isMountedRef.current = true;

      if (!resolvedSiteKey || resolvedSiteKey === 'your_turnstile_site_key_here') {
        setWidgetStatus('error');
        setStatusMessage('Turnstile site key unconfigured (set VITE_TURNSTILE_SITE_KEY).');
        return;
      }

      // Dynamically load Cloudflare Turnstile script on-demand if not already loaded
      if (typeof window !== 'undefined' && !window.turnstile && !document.querySelector('script[data-turnstile="true"]')) {
        window.__turnstileLoaded = false;
        window.onloadTurnstileCallback = function () {
          window.__turnstileLoaded = true;
          window.dispatchEvent(new Event('turnstile-loaded'));
        };
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit';
        script.async = true;
        script.defer = true;
        script.setAttribute('data-turnstile', 'true');
        document.head.appendChild(script);
      }

      // If turnstile object is already loaded, render immediately
      if (window.turnstile) {
        renderWidgetInstance();
      } else {
        let pollInterval: ReturnType<typeof setInterval> | null = null;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const cleanupAndRender = () => {
          if (pollInterval) {
            clearInterval(pollInterval);
            pollInterval = null;
          }
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          window.removeEventListener('turnstile-loaded', handleTurnstileLoaded);
          if (isMountedRef.current) {
            renderWidgetInstance();
          }
        };

        const handleTurnstileLoaded = () => {
          cleanupAndRender();
        };

        window.addEventListener('turnstile-loaded', handleTurnstileLoaded, { once: true });

        // Safety polling in case event was already dispatched before listener was bound
        pollInterval = setInterval(() => {
          if (!isMountedRef.current) {
            if (pollInterval) clearInterval(pollInterval);
            return;
          }
          if (window.turnstile) {
            cleanupAndRender();
          }
        }, 100);

        // Safety timeout if provider is completely blocked
        timeoutId = setTimeout(() => {
          if (pollInterval) clearInterval(pollInterval);
          window.removeEventListener('turnstile-loaded', handleTurnstileLoaded);
          if (isMountedRef.current && !window.turnstile && !widgetIdRef.current) {
            setWidgetStatus('error');
            setStatusMessage('Failed to load security verification provider.');
          }
        }, 7000);

        return () => {
          isMountedRef.current = false;
          if (pollInterval) clearInterval(pollInterval);
          if (timeoutId) clearTimeout(timeoutId);
          window.removeEventListener('turnstile-loaded', handleTurnstileLoaded);

          if (widgetIdRef.current && window.turnstile) {
            try {
              window.turnstile.remove(widgetIdRef.current);
            } catch {}
            widgetIdRef.current = null;
          }
        };
      }

      return () => {
        isMountedRef.current = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {}
          widgetIdRef.current = null;
        }
      };
    }, [resolvedSiteKey, renderWidgetInstance]);

    return (
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between text-outline">
          <label className="font-mono-label text-mono-label text-on-surface font-medium uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>SECURITY VERIFICATION // TURNSTILE</span>
            <span className="text-secondary">*</span>
          </label>
          <span className="font-mono-label text-[10px] sm:text-mono-label text-outline uppercase">
            CLOUDFLARE_MANAGED
          </span>
        </div>

        <div
          className={`p-3 rounded-lg bg-surface-container flex flex-col gap-2 transition-colors ${
            hasError
              ? 'border border-error'
              : widgetStatus === 'verified'
              ? 'border border-secondary/40 bg-surface-container-high'
              : 'border border-surface-container-highest'
          }`}
          role="region"
          aria-label="Security verification challenge"
        >
          {/* Turnstile Container */}
          <div
            ref={containerRef}
            id="turnstile-container"
            className="flex justify-center items-center min-h-[65px] w-full overflow-hidden"
          />

          {/* Loading indicator */}
          {widgetStatus === 'loading' && (
            <div className="flex items-center justify-center gap-2 py-2 text-on-surface-variant font-mono-code text-xs">
              <span className="w-3.5 h-3.5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              <span>INITIALIZING VERIFICATION LINK...</span>
            </div>
          )}

          {/* Error / Refresh Action */}
          {widgetStatus === 'error' && (
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-surface-container-highest text-error font-body-sm text-xs">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-surface-container-highest hover:bg-surface-container text-on-surface font-mono-label text-[11px] transition-colors cursor-pointer"
                aria-label="Refresh security verification challenge"
              >
                <RefreshCw className="w-3 h-3 text-secondary" />
                <span>REFRESH</span>
              </button>
            </div>
          )}

          {/* Verification confirmed banner */}
          {widgetStatus === 'verified' && (
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-secondary/20 text-secondary font-mono-code text-[11px]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>VERIFICATION CONFIRMED // READY FOR TRANSMISSION</span>
              </span>
              <button
                type="button"
                onClick={reset}
                className="text-outline-variant hover:text-on-surface font-mono-label text-[10px] uppercase underline cursor-pointer"
                title="Refresh token if needed"
              >
                Refresh
              </button>
            </div>
          )}

          {/* Explanatory Managed Notice */}
          <p className="font-body-sm text-[11px] text-outline leading-tight select-none">
            Protected by Cloudflare Turnstile. Verification occurs automatically or presents an interactive challenge when required.
          </p>
        </div>
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';
