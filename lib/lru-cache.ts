import { LRUCache } from 'lru-cache'

/**
 * LRU Cache for cross-request caching
 * 
 * Following Vercel best practices, this cache persists across requests
 * and is especially effective with Vercel Fluid Compute where multiple
 * concurrent requests share the same function instance.
 * 
 * Use cases:
 * - Expensive database queries that are frequently accessed
 * - API responses that don't change often
 * - Cross-request data sharing within seconds
 */

// Cache configuration
// Use `any` for value type to allow storing any kind of data
const cache = new LRUCache<string, any>({
  max: 500, // Maximum 500 items
  ttl: 60 * 60 * 1000, // 1 hour TTL (in milliseconds)
  updateAgeOnGet: false, // Don't reset TTL on access
  updateAgeOnHas: false,
})

/**
 * Get or fetch data with caching
 * 
 * If data exists in cache, return immediately.
 * Otherwise, fetch using the provided function and cache the result.
 * 
 * @param key - Cache key (should be unique and descriptive)
 * @param fetchFn - Function to fetch data if not in cache
 * @returns Cached or freshly fetched data
 */
export async function getCachedOrFetch<T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  // Check cache first
  const cached = cache.get(key) as T | undefined
  if (cached !== undefined) {
    return cached
  }

  // Cache miss - fetch data
  const data = await fetchFn()
  cache.set(key, data)
  return data
}

/**
 * Manually set cache entry
 * 
 * @param key - Cache key
 * @param value - Value to cache
 */
export function setCache(key: string, value: any): void {
  cache.set(key, value)
}

/**
 * Get cache entry without fetching
 * 
 * @param key - Cache key
 * @returns Cached value or undefined
 */
export function getCache<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined
}

/**
 * Delete a specific cache entry
 * 
 * @param key - Cache key to delete
 */
export function deleteCache(key: string): void {
  cache.delete(key)
}

/**
 * Invalidate cache entries by pattern
 * 
 * Useful for invalidating all related entries after a mutation.
 * For example, invalidateCache('user-') will clear all user-* keys.
 * 
 * @param pattern - String pattern to match at the start of keys
 */
export function invalidateCache(pattern: string): void {
  for (const key of cache.keys()) {
    if (key.startsWith(pattern)) {
      cache.delete(key)
    }
  }
}

/**
 * Clear entire cache
 * 
 * Use sparingly - typically only needed during development or major updates.
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Get cache statistics
 * 
 * Useful for monitoring cache effectiveness.
 */
export function getCacheStats() {
  return {
    size: cache.size,
    max: cache.max,
    // Calculate approximate hit rate if tracking is enabled
  }
}
