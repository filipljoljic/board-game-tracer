'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

/**
 * Component that syncs the current Clerk user to the database.
 * Should be placed in the layout to run on every page load when signed in.
 */
export function UserSync() {
  const { isSignedIn, isLoaded } = useUser()
  
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Sync user to database
      fetch('/api/auth/sync', { method: 'POST' })
        .catch(error => console.error('Failed to sync user:', error))
    }
  }, [isLoaded, isSignedIn])
  
  return null // This component doesn't render anything
}

