/**
 * Google Analytics 4 (gtag.js) helpers.
 *
 * The actual gtag.js tag is loaded once, statically, in index.html's <head>
 * (Measurement ID G-Q03XNCF74K) — that is the single source of truth for the
 * tag itself, so this file must never inject another <script src=googletagmanager...>
 * or call gtag('config', ...) again, or GA4 would see two tags firing.
 *
 * This file only *uses* the `window.gtag` that index.html already defined, to:
 *   - send exactly one page_view per SPA route change (including the first),
 *     since the static tag's automatic page_view is intentionally disabled
 *     (send_page_view: false) for correct client-side-routing counts
 *   - send named business events: contact_form_start, contact_form_submit,
 *     email_click, phone_click, collection_view, etc.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function hasGtag(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/** Call on every route change (App.tsx) to record an SPA "page_view". */
export function trackPageView(path: string, title?: string): void {
  if (!hasGtag()) return;
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

/** Fire a named business event. No-op (safe to call unconditionally) if gtag isn't loaded yet. */
export function trackEvent(name: BusinessEvent, params?: Record<string, string | number | boolean>): void {
  if (!hasGtag()) return;
  window.gtag('event', name, params);
}
