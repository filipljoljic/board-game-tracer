import { resend, APP_URL } from '@/lib/resend'
import { getVerificationEmailHtml, getVerificationEmailSubject } from '@/lib/email-templates/verification-email'

/**
 * Email Service - Handles sending emails via Resend
 */
export const emailService = {
  /**
   * Send a verification email to a user
   */
  async sendVerificationEmail(
    email: string,
    name: string | null,
    verificationToken: string
  ): Promise<{ success: boolean; error?: string }> {
    const verificationUrl = `${APP_URL}/verify-email?token=${verificationToken}`

    try {
      const { error } = await resend.emails.send({
        from: 'Board Game Tracker <onboarding@resend.dev>',
        to: email,
        subject: getVerificationEmailSubject(),
        html: getVerificationEmailHtml({
          name: name || '',
          verificationUrl
        })
      })

      if (error) {
        console.error('Failed to send verification email:', error)
        return {
          success: false,
          error: error.message
        }
      }

      return { success: true }
    } catch (err) {
      console.error('Error sending verification email:', err)
      return {
        success: false,
        error: 'Failed to send verification email'
      }
    }
  }
}

