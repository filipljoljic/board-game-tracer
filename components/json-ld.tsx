/**
 * JSON-LD Structured Data Component
 * 
 * This component outputs structured data in JSON-LD format that helps
 * search engines understand the content and context of your pages.
 * 
 * Why we need this:
 * - Enables rich snippets in search results (ratings, images, breadcrumbs)
 * - Helps Google understand what your content IS (not just what it contains)
 * - Can improve visibility in voice search results
 * - Improves chances of appearing in Knowledge Graph
 * 
 * Common Schema types:
 * - WebApplication: For web apps
 * - Organization: For company info
 * - BreadcrumbList: For navigation breadcrumbs
 * - FAQPage: For FAQ sections
 * - Article: For blog posts
 * 
 * @see https://schema.org/
 * @see https://developers.google.com/search/docs/advanced/structured-data
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Pre-built JSON-LD templates for common use cases
 */

/**
 * Creates breadcrumb structured data
 * Helps search engines understand page hierarchy and can show breadcrumbs in SERPs
 */
export function createBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/**
 * Creates organization structured data
 * Useful for showing company info in search results
 */
export function createOrganizationJsonLd(options: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": options.name,
    "url": options.url,
    ...(options.logo && { "logo": options.logo }),
    ...(options.description && { "description": options.description }),
  };
}

/**
 * Creates FAQ page structured data
 * Can show FAQ accordion directly in search results
 */
export function createFAQJsonLd(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((qa) => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer,
      },
    })),
  };
}
