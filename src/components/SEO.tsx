import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://vishwakarma.international';
const SITE_NAME = 'Vishwakarma Industries';
const DEFAULT_IMAGE = `${SITE_URL}/luxury_hero.webp`;

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  keywords?: string;
  type?: string;
  /** Set true on pages that should never appear in search results (e.g. the 404 page). */
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  image,
  keywords,
  type = 'website',
  noindex = false,
}: SEOProps) {
  const { pathname } = useLocation();

  // Normalize so the canonical never carries a trailing slash mismatch (root aside).
  const normalizedPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '';
  const canonicalUrl = `${SITE_URL}${normalizedPath}${normalizedPath ? '' : '/'}`;
  const ogImage = image || DEFAULT_IMAGE;
  const fullTitle = `${title} | ${SITE_NAME}`;

  const defaultKeywords =
    'Vishwakarma Industries, Jodhpur Furniture, furniture manufacturer India, furniture exporter India, bespoke furniture, wooden furniture wholesale, hotel furniture manufacturer, Vriksh certified furniture, Rajasthan furniture export, OEM furniture India';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!noindex && (
        <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      )}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
