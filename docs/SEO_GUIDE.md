# SEO Implementation Guide

This document explains all SEO optimizations made to the Board Game Tracker application. Each section covers what was changed, why it matters, and how it works.

---

## Table of Contents

1. [robots.txt](#1-robotstxt)
2. [XML Sitemap](#2-xml-sitemap)
3. [Meta Tags & Open Graph](#3-meta-tags--open-graph)
4. [Dynamic Page Metadata](#4-dynamic-page-metadata)
5. [Structured Data (JSON-LD)](#5-structured-data-json-ld)
6. [Web Manifest & Icons](#6-web-manifest--icons)
7. [Testing Your SEO](#7-testing-your-seo)

---

## 1. robots.txt

**File**: `public/robots.txt`

### What is it?
A robots.txt file tells search engine crawlers (like Googlebot) which pages they can or cannot access on your site. It's the first file crawlers look for when visiting your domain.

### Why do we need it?
- **Crawl guidance**: Directs search engines to your important content
- **Sitemap discovery**: Points crawlers to your sitemap for efficient indexing
- **Resource protection**: Prevents indexing of private/admin areas (though we allow everything for this app)

### How it works
```
User-agent: *     # Applies to all search engine bots
Allow: /          # Allow access to all pages
Sitemap: ...      # Tell bots where to find the sitemap
```

### Best Practices
- Always include a `Sitemap` directive
- Don't block CSS/JS files (Google needs them for rendering)
- Use `Disallow` sparingly - prefer `noindex` meta tags for sensitive pages

---

## 2. XML Sitemap

**File**: `app/sitemap.ts`

### What is it?
An XML sitemap is a list of all your important URLs that you want search engines to index. It helps crawlers discover and understand your site structure.

### Why do we need it?
- **Discovery**: Helps search engines find all your pages, even if internal linking is weak
- **Priority signals**: Indicates which pages are most important
- **Change frequency**: Tells crawlers how often content updates
- **Last modified**: Helps search engines know when to re-crawl

### How it works in Next.js
Next.js App Router has built-in sitemap support. By creating `app/sitemap.ts`, it automatically generates `/sitemap.xml` at build time or on-demand.

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: 'https://example.com', lastModified: new Date() },
    { url: 'https://example.com/games', lastModified: new Date() },
    // ... dynamic pages from database
  ]
}
```

### Our Implementation
- **Static pages**: Homepage, games, statistics, users, auth pages
- **Dynamic pages**: Groups, games (fetched from database)
- **Priority**: Homepage = 1.0, main sections = 0.8, detail pages = 0.6

---

## 3. Meta Tags & Open Graph

**File**: `app/layout.tsx`

### What are Meta Tags?
HTML meta tags provide information about your page to search engines and social platforms. The most important ones are:

#### Title Tag
```html
<title>Board Game Tracker - Track Your Game Sessions</title>
```
- **What**: The clickable headline in search results
- **Why**: Most important on-page SEO factor; directly affects click-through rate
- **Best practice**: 50-60 characters, primary keyword near start, compelling copy

#### Meta Description
```html
<meta name="description" content="Track board game sessions..." />
```
- **What**: The snippet shown below the title in search results
- **Why**: Doesn't directly affect ranking, but hugely impacts click-through rate
- **Best practice**: 150-160 characters, include a call-to-action, be specific

### What is Open Graph?
Open Graph (OG) tags control how your pages appear when shared on social media (Facebook, LinkedIn, Discord, Slack, etc.).

```html
<meta property="og:title" content="Board Game Tracker" />
<meta property="og:description" content="Track your sessions..." />
<meta property="og:image" content="https://example.com/og-image.png" />
```

### What are Twitter Cards?
Similar to Open Graph, but specifically for Twitter/X. They control how your links appear in tweets.

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Board Game Tracker" />
```

### Why do we need these?
1. **Search visibility**: Better titles/descriptions = higher click-through rates
2. **Social sharing**: Links look professional when shared, encouraging clicks
3. **Brand consistency**: Control how your app appears everywhere

### Our Implementation
In Next.js, we use the `metadata` object:

```typescript
export const metadata: Metadata = {
  title: {
    default: 'Board Game Tracker',
    template: '%s | Board Game Tracker',  // For child pages
  },
  description: '...',
  openGraph: { ... },
  twitter: { ... },
}
```

The `template` feature is powerful - child pages can set just `title: 'Games'` and it automatically becomes "Games | Board Game Tracker".

---

## 4. Dynamic Page Metadata

**Files**: `app/groups/[groupId]/page.tsx`, `app/games/[gameId]/page.tsx`, `app/sessions/[sessionId]/page.tsx`

### What is Dynamic Metadata?
For pages with dynamic content (like a specific group or game), we want the metadata to reflect that content. Instead of "Group | Board Game Tracker", we want "Friday Night Gaming | Board Game Tracker".

### Why do we need it?
- **Relevance**: Search engines understand the page is about a specific topic
- **Click-through rate**: Users see exactly what they'll find before clicking
- **Social sharing**: When someone shares a group link, it shows the group name

### How it works in Next.js
Use the `generateMetadata` function instead of a static `metadata` object:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const group = await prisma.group.findUnique({ where: { id: params.groupId } })
  
  return {
    title: group?.name || 'Group',
    description: `View leaderboard and sessions for ${group?.name}`,
  }
}
```

### Our Implementation
Each dynamic page now fetches its entity (group/game/session) and generates appropriate titles and descriptions. This means:

- `/groups/abc123` → "Friday Night Gaming | Board Game Tracker"
- `/games/xyz789` → "Catan | Board Game Tracker"
- `/sessions/sess123` → "Catan Session - Jan 21, 2026 | Board Game Tracker"

---

## 5. Structured Data (JSON-LD)

**File**: `components/json-ld.tsx`

### What is Structured Data?
Structured data is a standardized format (JSON-LD) for providing information about a page to search engines. It uses the Schema.org vocabulary.

### Why do we need it?
- **Rich snippets**: Enhanced search results with ratings, images, breadcrumbs, etc.
- **Knowledge Graph**: Your app can appear in Google's Knowledge Panel
- **Voice search**: Better chance of being the answer to voice queries
- **Better understanding**: Helps search engines understand what your content IS, not just what it contains

### Common Schema Types
- `WebApplication` - For web apps like ours
- `SoftwareApplication` - For downloadable software
- `Organization` - For company info
- `BreadcrumbList` - For navigation breadcrumbs
- `FAQPage` - For FAQ sections

### Our Implementation
We created a reusable `JsonLd` component that outputs the proper script tag:

```typescript
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Board Game Tracker",
  "applicationCategory": "GameApplication",
  // ...
}} />
```

This tells Google: "This is a web application for games, here's its name, description, and features."

### Testing Structured Data
Use Google's Rich Results Test: https://search.google.com/test/rich-results

---

## 6. Web Manifest & Icons

**Files**: `public/manifest.json`, `app/layout.tsx` (icons metadata)

### What is a Web Manifest?
A JSON file that tells browsers about your web app - its name, icons, theme colors, and how it should behave when "installed" on a device.

### Why do we need it?
- **PWA support**: Required for "Add to Home Screen" functionality
- **Icon consistency**: Ensures proper icons on all devices
- **Brand experience**: Controls splash screens, theme colors, etc.
- **SEO signal**: Shows Google this is a quality, modern web app

### Icon Sizes Explained
- **16x16, 32x32**: Browser favicon (tab icon)
- **180x180**: Apple touch icon (iOS home screen)
- **192x192, 512x512**: Android/PWA icons

### Our Implementation
```json
{
  "name": "Board Game Tracker",
  "short_name": "BoardTracker",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192" },
    { "src": "/icons/icon-512.png", "sizes": "512x512" }
  ],
  "theme_color": "#0f172a",
  "background_color": "#ffffff"
}
```

**Note**: You'll need to create actual icon files. Use a tool like https://realfavicongenerator.net/ to generate all sizes from one image.

---

## 7. Testing Your SEO

### Free Tools

#### Google Search Console (Essential)
- Submit your sitemap
- Monitor indexing status
- See which queries bring traffic
- Find crawl errors
- URL: https://search.google.com/search-console

#### Google PageSpeed Insights
- Core Web Vitals scores
- Performance recommendations
- Mobile/Desktop analysis
- URL: https://pagespeed.web.dev/

#### Rich Results Test
- Validate structured data
- Preview how rich snippets appear
- URL: https://search.google.com/test/rich-results

#### Meta Tag Checker
- Preview social media cards
- Validate Open Graph tags
- URL: https://metatags.io/

### Quick Checks

1. **site:yourdomain.com** in Google - See what's indexed
2. **View Page Source** - Verify meta tags are present
3. **Share on Discord/Slack** - Check social previews
4. **Lighthouse audit** - Built into Chrome DevTools

---

## Summary of Changes Made

| File | Change | Purpose |
|------|--------|---------|
| `public/robots.txt` | Created | Guide search crawlers, reference sitemap |
| `app/sitemap.ts` | Created | Dynamic sitemap with all pages from database |
| `app/layout.tsx` | Updated | Full metadata config: Open Graph, Twitter cards, icons, canonical URL, theme colors, structured data |
| `app/groups/[groupId]/page.tsx` | Added `generateMetadata` | Dynamic titles like "Friday Night Gaming \| Board Game Tracker" |
| `app/games/[gameId]/page.tsx` | Added `generateMetadata` | Dynamic titles like "Catan \| Board Game Tracker" |
| `app/sessions/[sessionId]/page.tsx` | Added `generateMetadata` | Dynamic titles like "Catan Session - Jan 21, 2026 \| Board Game Tracker" |
| `app/(auth)/login/page.tsx` | Added `metadata` export | "Sign In \| Board Game Tracker" |
| `app/(auth)/register/page.tsx` | Added `metadata` export | "Create Account \| Board Game Tracker" |
| `app/(auth)/check-email/layout.tsx` | Created with `metadata` | "Check Your Email \| Board Game Tracker" (noindex) |
| `app/(auth)/verify-email/layout.tsx` | Created with `metadata` | "Verify Email \| Board Game Tracker" (noindex) |
| `components/json-ld.tsx` | Created | Reusable structured data component with helper functions |
| `public/manifest.json` | Created | PWA support, icon definitions, theme colors |
| `public/icons/` | Created (directory) | Placeholder for icon files |

---

## Next Steps

1. **Create icon assets**: Generate all icon sizes from a logo
2. **Register with Search Console**: Submit sitemap, monitor indexing
3. **Set up analytics**: Track organic traffic growth
4. **Create OG images**: Design compelling social share images
5. **Monitor and iterate**: Use Search Console data to improve

---

## Glossary

- **Crawling**: When search engine bots scan your pages
- **Indexing**: When search engines add your pages to their database
- **SERP**: Search Engine Results Page
- **CTR**: Click-Through Rate (clicks ÷ impressions)
- **Canonical URL**: The "official" URL for a page (prevents duplicate content issues)
- **Rich Snippet**: Enhanced search result with extra info (ratings, images, etc.)
- **Core Web Vitals**: Google's page experience metrics (LCP, INP, CLS)
