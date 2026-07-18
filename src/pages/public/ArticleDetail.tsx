import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { collection, query, where, getDocs, limit } from 'firebase/firestore/lite';
import { dbLite } from '../../services/firebase';
import { Article } from '../../types';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Tag, Share2, ArrowRight } from 'lucide-react';
import { Language, translations } from '../../../translations';

interface ArticleDetailProps {
  lang: Language;
}

const MAX_FETCH_RETRIES = 3;
const FETCH_RETRY_DELAY_MS = 1500;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Articles can arrive from two places: the client-side Firestore fetch below
// (where createdAt is a Firestore Timestamp with a .toDate() method), or a
// pre-rendered <script> tag injected server-side for crawlers (see
// middleware.ts), where createdAt has already been serialized to an ISO
// string. This helper normalizes both shapes to a plain Date.
const resolveArticleDate = (createdAt: unknown): Date | undefined => {
  if (!createdAt) return undefined;
  if (typeof (createdAt as { toDate?: () => Date }).toDate === 'function') {
    return (createdAt as { toDate: () => Date }).toDate();
  }
  if (typeof createdAt === 'string') {
    const parsed = new Date(createdAt);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }
  return undefined;
};

const ArticleDetail: React.FC<ArticleDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundConfirmed, setNotFoundConfirmed] = useState(false);
  const t = translations[lang].blog;

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setNotFoundConfirmed(false);
    setArticle(null);

    // If this page was served to a crawler, middleware.ts already fetched
    // the article server-side (bypassing the client Firestore round-trip
    // entirely) and injected it here. Use it directly instead of re-fetching,
    // so the correct <head> tags set by the server are never replaced by a
    // client-side "not found" state while data is (re)loading.
    const preloaded = (window as any).__PRERENDERED_ARTICLE__;
    if (preloaded && preloaded.slug === slug) {
      setArticle(preloaded as Article);
      setLoading(false);
      window.scrollTo(0, 0);
      return;
    }

    const fetchArticle = async () => {
      for (let attempt = 0; attempt <= MAX_FETCH_RETRIES; attempt++) {
        try {
          const q = query(
            collection(dbLite, 'articles'),
            where('slug', '==', slug),
            limit(1)
          );
          const snapshot = await getDocs(q);

          if (isCancelled) return;

          if (!snapshot.empty) {
            setArticle({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Article);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error(err);
        }

        // Article not found (or fetch failed) on this attempt.
        // Retry with a delay instead of immediately concluding "not found",
        // since this could just be a slow Firestore response (e.g. for crawlers).
        if (attempt < MAX_FETCH_RETRIES) {
          await wait(FETCH_RETRY_DELAY_MS);
          if (isCancelled) return;
        }
      }

      // Only after exhausting all retries do we confirm the article is missing.
      if (!isCancelled) {
        setNotFoundConfirmed(true);
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  if (loading || (!article && !notFoundConfirmed)) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">{t.loading}</div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">
        <Helmet>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        {t.notFound}
      </div>
    );
  }

  const canonicalUrl = `https://www.sourcecode99.com/blog/${article.slug}`;
  const articleDate = resolveArticleDate(article.createdAt);
  const publishedDate = articleDate ? articleDate.toISOString() : undefined;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-24 pt-24">
      <Helmet>
        <title>{article.title} | Source Code 99</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        {article.coverImage && <meta property="og:image" content={article.coverImage} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        {article.coverImage && <meta name="twitter:image" content={article.coverImage} />}

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: article.coverImage || undefined,
            author: { '@type': 'Person', name: article.author },
            datePublished: publishedDate,
            mainEntityOfPage: canonicalUrl
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/blog" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold">
          <ArrowLeft size={20} /> {t.backToBlog}
        </Link>
        <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
          <Share2 size={20} />
        </button>
      </div>

      <article className="max-w-4xl mx-auto px-6 pt-8 space-y-8">
        <header className="space-y-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-500 text-sm font-bold uppercase tracking-widest">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <User size={16} className="text-blue-500" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
              <span>{articleDate ? format(articleDate, 'MMMM dd, yyyy') : ''}</span>
            </div>
          </div>
        </header>

        <div className="aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
          <img
            src={article.coverImage || `https://picsum.photos/seed/${article.slug}/1200/600`}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="prose prose-invert mx-auto" dangerouslySetInnerHTML={{ __html: article.content }} />

        {article.tags && article.tags.length > 0 && (
          <div className="pt-12 border-t border-slate-800 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <section id="cta" className="py-24 mt-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative glass p-12 rounded-[3rem] overflow-hidden border border-white/10 text-center shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                {translations[lang].cta.headline} <br /> <span className="gradient-text">{translations[lang].cta.headlineGradient}</span>
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
                {translations[lang].cta.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://wa.me/6285123876559?text=Halo%20Sourcecode99.com%20Saya%20ingin%20berdiskusi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-lg font-black transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3"
                >
                  {translations[lang].cta.btn1} <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
