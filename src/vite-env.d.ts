/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID, e.g. "G-XXXXXXXXXX". Leave unset in development — analytics stays disabled until it's provided. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
