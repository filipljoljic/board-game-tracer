import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

/**
 * Dynamic Sitemap Generator
 * 
 * This file generates an XML sitemap at /sitemap.xml
 * It includes both static pages and dynamic pages from the database.
 * 
 * Why we need this:
 * - Helps search engines discover all pages on the site
 * - Provides hints about page importance (priority) and update frequency
 * - Enables efficient crawling of large sites
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

// Update this to your production domain
function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL || 'https://www.board-game-tracker.com';
  // Ensure URL has protocol prefix
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

const BASE_URL = getBaseUrl()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages that always exist
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Homepage is most important
    },
    {
      url: `${BASE_URL}/games`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/users`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/statistics`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sessions/new`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Auth pages (lower priority - not content pages)
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic pages: Fetch all groups from database
  // Note: Group model doesn't have updatedAt, so we use current date
  let groupPages: MetadataRoute.Sitemap = []
  try {
    const groups = await prisma.group.findMany({
      select: { id: true },
    })
    groupPages = groups.map((group) => ({
      url: `${BASE_URL}/groups/${group.id}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Failed to fetch groups for sitemap:', error)
  }

  // Dynamic pages: Fetch all games from database
  // Note: Game model doesn't have updatedAt, so we use current date
  let gamePages: MetadataRoute.Sitemap = []
  try {
    const games = await prisma.game.findMany({
      select: { id: true },
    })
    gamePages = games.map((game) => ({
      url: `${BASE_URL}/games/${game.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.error('Failed to fetch games for sitemap:', error)
  }

  return [...staticPages, ...groupPages, ...gamePages]
}
