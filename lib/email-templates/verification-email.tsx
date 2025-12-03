interface VerificationEmailProps {
  name: string
  verificationUrl: string
}

export function getVerificationEmailHtml({ name, verificationUrl }: VerificationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #18181b;">
                🎲 Board Game Tracker
              </h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #18181b;">
                Welcome${name ? `, ${name}` : ''}!
              </h2>
              <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #52525b;">
                Thanks for signing up for Board Game Tracker. To complete your registration and start tracking your game sessions, please verify your email address by clicking the button below.
              </p>
            </td>
          </tr>
          
          <!-- Button -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}" 
                       style="display: inline-block; padding: 14px 32px; background-color: #18181b; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Expiry Notice -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <p style="margin: 0; font-size: 14px; line-height: 20px; color: #71717a; text-align: center;">
                This link will expire in <strong>24 hours</strong>.
              </p>
            </td>
          </tr>
          
          <!-- Fallback Link -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <p style="margin: 0; font-size: 14px; line-height: 20px; color: #71717a;">
                If the button above doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin: 8px 0 0 0; font-size: 14px; line-height: 20px; color: #3b82f6; word-break: break-all;">
                <a href="${verificationUrl}" style="color: #3b82f6;">${verificationUrl}</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; border-radius: 0 0 12px 12px; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #a1a1aa; text-align: center;">
                If you didn't create an account with Board Game Tracker, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function getVerificationEmailSubject(): string {
  return 'Verify your email for Board Game Tracker'
}

