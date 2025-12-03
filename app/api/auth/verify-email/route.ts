import { NextResponse } from 'next/server'
import { userRepository } from '@/backend/repositories'
import { isTokenExpired } from '@/backend/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find user by verification token
    const user = await userRepository.findByVerificationToken(token)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (isTokenExpired(user.verificationExpiry)) {
      return NextResponse.json(
        { error: 'Verification token has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: 'Email is already verified.'
      })
    }

    // Verify the email
    await userRepository.verifyEmail(user.id)

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully. You can now sign in.'
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred during email verification' },
      { status: 500 }
    )
  }
}

