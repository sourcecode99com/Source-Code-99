import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Article } from '../../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Search, ArrowRight } from 'lucide-react';
import { Language, translations } from '../../../translations';

interface BlogListProps {
  lang: Language;
}

const BlogList: React.FC<BlogListProps> = ({ lang }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[lang].blog;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(
          collection(db, 'articles'),
          where('status', '==', 'published')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
        setArticles(data.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-24">
      <Helmet>
        <title>Blog | Insight Transformasi Digital - Source Code 99</title>
        <meta name="description" content="Kumpulan artikel seputar transformasi digital, pengembangan website, aplikasi, dan strategi pertumbuhan bisnis dari Source Code 99." />
        <link rel="canonical" href="https://www.sourcecode99.com/blog" />
        <meta property="og:title" content="Blog | Source Code 99" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sourcecode99.com/blog" />
      </Helmet>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-white tracking-tight">{t.title}</h1>
          <p className="text-slate-400 text-lg">
            {t.subtitle}
          </p>
          <div className="relative max-w-md mx-auto pt-4">
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-500 transition-colors z-10"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-3 pl-12 pr-6 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[400px] glass rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group glass rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.coverImage || `https://picsum.photos/seed/${article.slug}/800/600`}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-blue-500">
                    <span>{article.category}</span>
                    <span className="text-slate-500">{format(article.createdAt.toDate(), 'MMM dd, yyyy')}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-slate-400 text-sm line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-blue-500 font-bold text-sm group-hover:gap-4 transition-all">
                    {t.readMore} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <p className="text-2xl text-slate-500">{t.noResults}</p>
            <button onClick={() => setSearchTerm('')} className="text-blue-500 hover:underline">{t.clearSearch}</button>
          </div>
        )}
      </main>

      <section id="cta" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative glass p-12 md:p-24 rounded-[3.5rem] overflow-hidden border border-white/10 text-center shadow-2xl">
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                {translations[lang].cta.headline} <br /> <span className="gradient-text">{translations[lang].cta.headlineGradient}</span>
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                {translations[lang].cta.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://wa.me/6285123876559?text=Halo%20Sourcecode99.com%20Saya%20ingin%20berdiskusi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl text-xl font-black transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3"
                >
                  {translations[lang].cta.btn1} <ArrowRight size={24} />
                </a>
              </div>
              <p className="mt-16 text-slate-500 font-bold italic text-sm tracking-wide">
                {translations[lang].cta.footerQuote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;
