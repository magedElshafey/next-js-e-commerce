import type { Metadata } from "next";
import { siteUrl } from "@/utils/siteUrl";
/* ----------------------------- Types ----------------------------- */
export type Locale = "en" | "ar";
export type MetaInput = {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "profile" | string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: { name: string; url?: string }[];
  locale?: Locale;
  alternateLocales?: Locale[];
  noIndex?: boolean;
  twitterHandle?: string;
  additionalMeta?: { name: string; content: string }[];
};
export type metaTypesTypes =
  | "website"
  | "article"
  | "profile"
  | "book"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";
/* -------------------- Dynamic Site defaults -------------------- */
export function getDefaultSiteMeta(messages: any) {
  return {
    siteName: messages.SEO.defaultTitle || "",
    siteUrl,
    defaultTitle: messages.SEO.defaultTitle,
    defaultDescription: messages.SEO.defaultDescription || "",
    defaultImage: `${siteUrl}/assets/og-default.jpg`,
    twitterHandle: "", // official twitter account
    favicon: "/favicon.ico",
    manifest: "/site.webmanifest", // for PWA Applications
    publisher: messages.SEO.company || "",
    defaultKeywords: messages.SEO.keywords || [],
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  };
}

/* ------------------------ Helper functions ----------------------- */
function joinKeywords(defaultKeywords?: string[], pageKeywords?: string[]) {
  const combined = [...(defaultKeywords || []), ...(pageKeywords || [])]
    .filter(Boolean)
    .slice(0, 20);
  return combined.join(", ");
}

function cleanCanonicalUrl(rawUrl?: string) {
  try {
    const url = new URL(rawUrl || siteUrl || "");
    [...url.searchParams.keys()].forEach((key) => {
      if (key.startsWith("utm_")) url.searchParams.delete(key);
    });
    return url.origin + url.pathname;
  } catch {
    return siteUrl || "";
  }
}

function buildOpenGraph(
  meta: MetaInput,
  siteMeta: ReturnType<typeof getDefaultSiteMeta>
): Metadata["openGraph"] {
  const title = meta.title || siteMeta.siteName;
  const description = meta.description || siteMeta?.defaultDescription;
  const url = cleanCanonicalUrl(meta.url);
  const image =
    meta.image ||
    `${siteMeta?.siteUrl}/api/og?title=${encodeURIComponent(title)}`;
  const validTypes = [
    "website",
    "article",
    "profile",
    "book",
    "music.song",
    "music.album",
    "music.playlist",
    "music.radio_station",
    "video.movie",
    "video.episode",
    "video.tv_show",
    "video.other",
  ];
  const type = (
    meta.type && validTypes.includes(meta.type) ? meta.type : "website"
  ) as metaTypesTypes;
  return {
    title,
    description,
    url,
    siteName: siteMeta?.siteName,
    images: [image],
    type,
    locale: meta.locale === "ar" ? "ar_AR" : "en_US",
  };
}

function buildTwitter(
  meta: MetaInput,
  siteMeta: ReturnType<typeof getDefaultSiteMeta>
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: meta.title || siteMeta?.siteName,
    description: meta.description || siteMeta?.defaultDescription,
    images: [
      meta.image ||
        `${siteMeta?.siteUrl}/api/og?title=${encodeURIComponent(
          meta.title || siteMeta?.siteName
        )}`,
    ],
    creator: meta.twitterHandle || siteMeta?.twitterHandle,
  };
}

/* ------------------------ Main builder ------------------------- */
export function buildMetadata(
  input: MetaInput,
  siteMeta: ReturnType<typeof getDefaultSiteMeta>
): Metadata {
  const title = input.title
    ? `${input.title} | ${siteMeta?.siteName}` // page-specific title
    : siteMeta?.defaultTitle; // default site title

  const description = input.description || siteMeta?.defaultDescription;
  const canonical = cleanCanonicalUrl(input.url);

  const metadata: Metadata = {
    title,
    description,
    keywords: joinKeywords(siteMeta?.defaultKeywords, input.keywords),
    openGraph: buildOpenGraph(input, siteMeta),
    twitter: buildTwitter(input, siteMeta),
    alternates: {
      canonical,
      languages: (input.alternateLocales || []).reduce<Record<string, string>>(
        (acc, loc) => {
          acc[loc === "ar" ? "ar" : "en-US"] =
            canonical + (loc === "ar" ? "/ar" : "/en");
          return acc;
        },
        {}
      ),
    },
    authors: input.authors,
    robots: input.noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    icons: {
      icon: siteMeta?.favicon || "",
      shortcut: siteMeta?.favicon || "",
      apple: "/apple-touch-icon.png",
    },
    manifest: siteMeta?.manifest || "",
    metadataBase: new URL(siteMeta?.siteUrl || siteUrl),
    // Verification
    other: {
      ...(siteMeta?.verification.google
        ? { "google-site-verification": siteMeta?.verification.google || "" }
        : {}),
      ...(siteMeta?.verification.bing
        ? { "msvalidate.01": siteMeta?.verification.bing || "" }
        : {}),
    },
  };

  if (input.type === "article" || input.type === "product") {
    metadata.openGraph = {
      ...((metadata.openGraph as any) || {}),
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: input.authors?.map((a) => a.name),
    } as any;
  }

  return metadata;
}
export async function generatePageMetadata(
  locale: string,
  pageKey: string,
  overrides?: {
    title?: string;
    description?: string;
    keywords?: string[];
  }
) {
  const messages = (await import(`@/messages/${locale}.json`)).default;

  // page-specific data من messages
  const t = messages.PageMetaData[pageKey];

  const siteMeta = getDefaultSiteMeta(messages);

  const metadata = buildMetadata(
    {
      title: overrides?.title || t?.title,
      description: overrides?.description || t?.description,
      keywords: overrides?.keywords,
    },
    siteMeta
  );

  return metadata;
}
/* ------------------------ JSON-LD Helpers ------------------------ */
export function buildJsonLdForArticle({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  authors,
  siteMeta,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: { name: string }[];
  siteMeta: ReturnType<typeof getDefaultSiteMeta>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: title,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: authors?.map((a) => ({ "@type": "Person", name: a.name })),
    publisher: {
      "@type": "Organization",
      name: siteMeta.publisher,
      logo: { "@type": "ImageObject", url: siteMeta.defaultImage },
    },
    description,
  };
}
