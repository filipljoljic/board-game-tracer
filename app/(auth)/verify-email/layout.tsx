import { Metadata } from 'next'

/**
 * Verify Email Page Layout with Metadata
 * 
 * Since the main page is a client component ('use client'),
 * we need to put metadata in a layout file.
 * Layouts are always server components and can export metadata.
 */
export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Complete your email verification to activate your Board Game Tracker account.',
  // Don't index email verification pages - they contain tokens
  robots: { index: false, follow: false },
}

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
