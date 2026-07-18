import { next } from '@vercel/functions';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// This Routing Middleware targets blog article pages (to prerender them for
// crawlers) and the dynamic sitemap endpoint (to keep it in sync with
// Firestore automatically, without needing a manual rebuild/deploy every
// time a new article is published).
export const config = {
  matcher: ['/blog/:path*', '/sitemap.xml'],
  runtime: 'nodejs',
};

// Public, non-secret identifiers for this Firebase project. These are the
// same values already shipped in the client bundle (see
// firebase-applet-config.json), so there is no harm in referencing them
// here directly. Only the service account credentials below are sensitive.
const FIREBASE_PROJECT_ID = 'gen-lang-client-0769814319';
const FIRESTORE_DATABASE_ID = 'ai-studio-502f575a-53ba-47b2-9548-f8e2479c1a84';
const SITE_ORIGIN = 'https://www.sourcecode99.com';

// NOTE: Google Search Console's URL Inspection / "Test Live URL" tool does
// NOT use the regular "Googlebot" user agent - it identifies itself as
// "Google-InspectionTool/1.0". Without that token in this list, this
// middleware treated GSC's live test as a normal visitor and skipped
// prerendering entirely, which is why the live test kept showing 'noindex'
// even after this middleware was deployed. Also added a few other Google
// crawler variants for robustness.
const BOT_USER_AGENTS = [
  'googlebot',
  'google-inspectiontool',
  'googleother',
  'adsbot-google',
  'mediapartners-google',
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'facebot',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
  'applebot',
  'pinterest',
  'redditbot',
  'slackbot',
  'skypeuripreview',
  'embedly',
  'quora link preview',
  'w3c_validator',
];

function isBotRequest(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

function getAdminApp() {
  const existing = getApps();
  if (existing.length > 0) return existing[0];

  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Private keys are usually stored in env vars with literal "\\n" sequences
  // instead of real newlines, so they need to be converted back.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY environment variables in the Vercel project settings.'
    );
  }

  return initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail,
      privateKey,
    }),
  });
}

interface ArticleDoc {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: string;
  status: string;
  createdAt?: string;
}

async function fetchPublishedArticle(slug: string): Promise<ArticleDoc | null> {
  const app = getAdminApp();
  const db = getFirestore(app, FIRESTORE_DATABASE_ID);

  const snapshot = await db
    .collection('articles')
    .where('slug', '==', slug)
    .where('status', '==', 'published')
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    category: data.category,
    tags: data.tags,
    author: data.author,
    status: data.status,
    // Serialize Firestore Timestamp to a plain ISO string so it survives
    // JSON.stringify() when embedded into the page below.
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : undefined,
  };
}

interface ArticleSitemapEntry {
  slug: string;
  lastmod?: string;
}

async function fetchAllPublishedArticleSlugs(): Promise<ArticleSitemapEntry[]> {
  const app = getAdminApp();
  const db = getFirestore(app, FIRESTORE_DATABASE_ID);

  const snapshot = await db.collection('articles').where('status', '==', 'published').get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : undefined;
    return { slug: data.slug, lastmod: createdAt ? createdAt.slice(0, 10) : undefined };
  });
}

// Static, non-article pages that were previously hardcoded in
// public/sitemap.xml. Kept here so the dynamic sitemap fully replaces the
// static one instead of only covering blog articles.
const STATIC_SITEMAP_ENTRIES: { loc: string; priority: string; lastmod: string }[] = [
  { loc: `${SITE_ORIGIN}/`, priority: '1.0', lastmod: '2026-01-01' },
  { loc: `${SITE_ORIGIN}/services`, priority: '0.8', lastmod: '2026-01-01' },
  { loc: `${SITE_ORIGIN}/privacy`, priority: '0.3', lastmod: '2026-01-01' },
  { loc: `${SITE_ORIGIN}/terms`, priority: '0.3', lastmod: '2026-01-01' },
];

async function buildSitemapXml(): Promise<string> {
  const articles = await fetchAllPublishedArticleSlugs();

  const articleEntries = articles
    .filter((a) => !!a.slug)
    .map((a) => ({
      loc: `${SITE_ORIGIN}/blog/${a.slug}`,
      priority: '0.7',
      lastmod: a.lastmod,
    }));

  const allEntries = [...STATIC_SITEMAP_ENTRIES, ...articleEntries];

  const urlXml = allEntries
    .map((entry) => {
      const lastmodTag = entry.lastmod ? `${entry.lastmod}</lastmod>\n` : '';
      return `<url>\n<loc>${entry.loc}</loc>\n${lastmodTag}<priority>${entry.priority}</priority>\n</url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlXml}\n</urlset>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHeadInjection(article: ArticleDoc, canonicalUrl: string): string {
  const title = `${article.title} | Source Code 99`;
  const description = article.excerpt || '';
  const image = article.coverImage;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: image || undefined,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.createdAt,
    mainEntityOfPage: canonicalUrl,
  }).replace(/</g, '\u003c');

  // Embedded so the React app can hydrate instantly from this data instead
  // of re-querying Firestore client-side (which is what was failing for
  // crawlers in the first place - see PR #4 for background).
  const serializedArticle = JSON.stringify(article).replace(/</g, '\u003c');

  return `
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonicalUrl}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(article.title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${canonicalUrl}" />
${image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ''}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(article.title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ''}
<script type="application/ld+json">${jsonLd}</script>
<script>window.__PRERENDERED_ARTICLE__ = ${serializedArticle};</script>
`;
}

export default async function middleware(request: Request) {
  const url = new URL(request.url);

  // Dynamic sitemap: generated on every request (cached at the edge, see
  // headers below) directly from Firestore, so newly published articles
  // show up automatically without a manual rebuild/redeploy. Served for
  // ALL requesters (not just bots) since this needs to work for direct
  // browser checks and Search Console's sitemap fetcher too.
  if (url.pathname === '/sitemap.xml') {
    try {
      const xml = await buildSitemapXml();
      return new Response(xml, {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'cache-control': 'public, s-maxage=3600, stale-while-revalidate=300',
        },
      });
    } catch (err) {
      console.error('[middleware] Failed to generate dynamic sitemap, falling back to static file:', err);
      return next();
    }
  }

  const userAgent = request.headers.get('user-agent');

  if (!isBotRequest(userAgent)) {
    return next();
  }

  const match = url.pathname.match(/^\/blog\/([^/]+)\/?$/);
  const slug = match?.[1];

  if (!slug) {
    return next();
  }

  try {
    const article = await fetchPublishedArticle(decodeURIComponent(slug));

    if (!article) {
      // No matching published article - let the SPA render its own
      // "not found" state (with noindex) as usual.
      return next();
    }

    const baseHtmlRes = await fetch(new URL('/index.html', request.url));
    if (!baseHtmlRes.ok) {
      return next();
    }
    const baseHtml = await baseHtmlRes.text();

    const canonicalUrl = `${SITE_ORIGIN}/blog/${article.slug}`;
    const headInjection = buildHeadInjection(article, canonicalUrl);
    const html = baseHtml.replace('</head>', `${headInjection}</head>`);

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, s-maxage=600, stale-while-revalidate=59',
      },
    });
  } catch (err) {
    console.error('[middleware] Failed to prerender article for bot, falling back to SPA:', err);
    return next();
  }
}
