import { Metadata } from 'next'

/**
 * Check Email Page Layout with Metadata
 * 
 * Since the main page is a client component ('use client'),
 * we need to put metadata in a layout file.
 * Layouts are always server components and can export metadata.
 */
export const metadata: Metadata = {
  title: 'Check Your Email',
  description: 'A verification email has been sent to your address. Click the link in the email to complete your registration.',
  // Don't index email verification pages
  robots: { index: false, follow: false },
}

export default function CheckEmailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
