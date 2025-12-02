import { NextResponse } from 'next/server'
import { authService } from '@/backend/services'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password, name } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Username, email, and password are required' },
        { status: 400 }
      )
    }

    const result = await authService.register({
      username,
      email,
      password,
      name
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      user: result.user
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}


