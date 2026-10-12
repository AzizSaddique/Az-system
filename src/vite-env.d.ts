/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.pdf' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  appearance?: 'always' | 'execute' | 'interaction-only';
  execution?: 'render' | 'execute';
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: (error?: string | number) => void;
  'timeout-callback'?: () => void;
}

interface TurnstileObject {
  ready: (callback: () => void) => void;
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
  getResponse: (widgetId?: string) => string | undefined;
}

interface Window {
  turnstile?: TurnstileObject;
  onloadTurnstileCallback?: () => void;
  __turnstileLoaded?: boolean;
}
