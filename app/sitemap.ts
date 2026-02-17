import { MetadataRoute } from 'next'

/**
 * Sitemap Generator
 * 
 * Only includes publicly accessible pages (no auth required).
 * Pages behind authentication should NOT be in the sitemap because
 * search engines can't access them and will mark them as crawl errors.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://www.board-game-tracker.com';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

const BASE_URL = getBaseUrl()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
