'use client'

import { SWRConfig } from 'swr'
import { swrConfig } from '@/lib/swr'

/**
 * SWR Provider Component
 * 
 * Wraps the app with SWRConfig to provide global SWR configuration
 * following Vercel best practices for optimal caching and deduplication.
 * 
 * Must be a client component since SWRConfig uses React context.
 */
export function SWRProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>
}
