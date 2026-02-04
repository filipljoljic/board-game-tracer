import useSWR, { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

/**
 * Default fetcher for SWR
 * Throws on non-ok responses to trigger SWR error handling
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object
    ;(error as any).info = await res.json().catch(() => ({}))
    ;(error as any).status = res.status
    throw error
  }
  return res.json()
}

/**
 * Default SWR configuration
 * Following Vercel best practices for optimal caching
 */
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  // Dedupe requests within 2 seconds
  dedupingInterval: 2000,
  // Show stale data while revalidating
  revalidateIfStale: true,
  // Keep data fresh but show cached version immediately
  revalidateOnMount: true,
}

/**
 * Hook for immutable data (data that rarely changes)
 * Uses SWR Immutable to never revalidate after initial fetch
 * Perfect for: games list, templates, static content
 */
export function useImmutableSWR<T>(key: string | null) {
  return useSWRImmutable<T>(key, fetcher)
}

// Re-export SWR mutation for convenience
export { useSWRMutation } from 'swr/mutation'
