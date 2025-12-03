import { NextResponse } from 'next/server'
import { userRepository } from '@/backend/repositories'
import { emailService } from '@/backend/services'
import { generateVerificationToken, getVerificationTokenExpiry } from '@/backend/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await userRepository.findByEmail(email)

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a verification link has been sent.'
      })
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: 'Email is already verified. You can sign in.'
      })
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken()
    const verificationExpiry = getVerificationTokenExpiry()

    // Update user with new token
    await userRepository.setVerificationToken(
      user.id,
      verificationToken,
      verificationExpiry
    )

    // Send verification email
    const emailResult = await emailService.sendVerificationEmail(
      user.email!,
      user.name,
      verificationToken
    )

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent. Please check your inbox.'
    })
  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred while sending verification email' },
      { status: 500 }
    )
  }
}

