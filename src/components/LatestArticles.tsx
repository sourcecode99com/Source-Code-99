import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Article } from '../types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, Calendar } from 'lucide-react';
import { Language } from '../../translations';

interface LatestArticlesProps {
  lang: Language;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ lang }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(
          collection(db, 'articles'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              {lang === 'ID' ? 'Artikel ' : 'Latest '} 
              <span className="text-blue-500">{lang === 'ID' ? 'Terkini' : 'Articles'}</span>
            </h2>
            <p className="text-slate-400 max-w-xl">
              {lang === 'ID' 
                ? 'Wawasan terbaru seputar teknologi dan strategi digital untuk pertumbuhan bisnis Anda.'
                : 'Latest insights on technology and digital strategies for your business growth.'}
            </p>
          </div>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-blue-500 font-bold hover:gap-4 transition-all"
          >
            {lang === 'ID' ? 'Lihat Semua Artikel' : 'View All Articles'} <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-[400px] glass rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            articles.map((article) => (
              <Link 
                key={article.id} 
                to={`/blog/${article.slug}`}
                className="group glass rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.coverImage || `https://picsum.photos/seed/${article.slug}/800/600`} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-blue-500">
                    <span className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">{article.category}</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {format(article.createdAt.toDate(), 'MMM dd, yyyy')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 flex-1 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-blue-500 font-bold text-sm group-hover:gap-4 transition-all">
                    {lang === 'ID' ? 'Baca Selengkapnya' : 'Read More'} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
