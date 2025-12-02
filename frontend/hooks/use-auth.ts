'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Custom hook for authentication state and actions
 */
export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const user = session?.user

  const login = useCallback(async (username: string, password: string) => {
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false
    })

    if (result?.error) {
      throw new Error(result.error)
    }

    router.refresh()
    return result
  }, [router])

  const logout = useCallback(async () => {
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
  }, [router])

  const register = useCallback(async (data: {
    username: string
    email: string
    password: string
    name?: string
  }) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Registration failed')
    }

    // Auto-login after registration
    await login(data.username, data.password)

    return result
  }, [login])

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register
  }
}


