import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "sonner";
import { JsonLd } from "@/components/json-ld";

const inter = Inter({ subsets: ["latin"] });

/**
 * Base URL for the application
 * Used for canonical URLs, Open Graph, and sitemap generation
 */
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.board-game-tracker.com';

/**
 * Root Layout Metadata
 * 
 * This metadata applies to all pages unless overridden.
 * The `template` feature allows child pages to set just the page name,
 * and it automatically appends "| Board Game Tracker"
 * 
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  // Title configuration with template for child pages
  title: {
    default: "Board Game Tracker - Track Your Game Sessions & Scores",
    template: "%s | Board Game Tracker",
  },
  
  // Meta description - appears in search results
  description: "Track board game sessions, scores, and player statistics. Create groups, record game results, view leaderboards, and analyze your gaming performance.",
  
  // Keywords (less important now, but still used by some search engines)
  keywords: [
    "board game tracker",
    "game score tracker",
    "board game statistics",
    "game session logger",
    "leaderboard",
    "game night tracker",
  ],
  
  // Author information
  authors: [{ name: "Board Game Tracker" }],
  creator: "Board Game Tracker",
  
  // Canonical URL - prevents duplicate content issues
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  
  // Open Graph - Controls how links appear on Facebook, Discord, Slack, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Board Game Tracker",
    title: "Board Game Tracker - Track Your Game Sessions & Scores",
    description: "Track board game sessions, scores, and player statistics. Create groups, record game results, view leaderboards, and analyze your gaming performance.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Board Game Tracker - Track your board game sessions",
      },
    ],
  },
  
  // Twitter Card - Controls how links appear on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Board Game Tracker - Track Your Game Sessions & Scores",
    description: "Track board game sessions, scores, and player statistics. Create groups, record game results, view leaderboards.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@boardgametracker",
  },
  
  // Favicon and app icons (matching files from favicon generator)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Apple mobile web app title
  appleWebApp: {
    title: "Board Game Tracker",
  },
  
  // Web app manifest for PWA support
  manifest: "/site.webmanifest",
  
  // Robots directive (can be overridden per page)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Viewport configuration
 * Controls how the page scales on mobile devices
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

/**
 * Structured data for the application (JSON-LD)
 * This helps search engines understand what type of site this is
 */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Board Game Tracker",
  "description": "Track board game sessions, scores, and player statistics. Create groups, record game results, view leaderboards, and analyze your gaming performance.",
  "url": BASE_URL,
  "applicationCategory": "GameApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
  },
  "featureList": [
    "Track board game sessions",
    "Record player scores",
    "View leaderboards",
    "Player statistics and analytics",
    "Custom scoring templates",
    "Group management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Structured data for search engines */}
        <JsonLd data={websiteJsonLd} />
        
        <AuthProvider>
          <Header />
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
