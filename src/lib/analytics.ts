/**
 * Google Analytics 4 (gtag.js) integration.
 *
 * Disabled by default — nothing loads and nothing is sent until a real GA4
 * Measurement ID is supplied via the VITE_GA_MEASUREMENT_ID environment variable
 * (Netlify: Site settings -> Environment variables). No ID is hardcoded here.
 *
 * Business events tracked (see calls to trackEvent across the app):
 *   contact_form_start, contact_form_submit, email_click, phone_click, collection_view
 */

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Injects gtag.js and configures GA4. No-op if VITE_GA_MEASUREMENT_ID is not set. */
export function initAnalytics(): void {
  if (initialized || !MEASUREMENT_ID || typeof window === 'undefined') return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  // send_page_view is handled manually on route change (see trackPageView) since this is an SPA.
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** Call on every route change (App.tsx) to record an SPA "page_view". */
export function trackPageView(path: string, title?: string): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}

export type BusinessEvent =
  | 'contact_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'catalogue_download'
  | 'product_view'
  | 'collection_view';

/** Fire a named business event. No-op (safe to call unconditionally) if analytics isn't configured. */
export function trackEvent(name: BusinessEvent, params?: Record<string, string | number | boolean>): void {
  if (!MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}
