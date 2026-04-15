import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, count } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Article } from '../../types';
import { FileText, Eye, Clock, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const articlesRef = collection(db, 'articles');
        
        // Get total count (simple way for small collections)
        const snapshot = await getDocs(articlesRef);
        const allArticles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
        
        setStats({
          total: allArticles.length,
          published: allArticles.filter(a => a.status === 'published').length,
          drafts: allArticles.filter(a => a.status === 'draft').length,
        });

        // Get recent 5
        const recent = allArticles
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
          .slice(0, 5);
        
        setRecentArticles(recent);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="animate-pulse space-y-8">...</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400">Selamat datang kembali di panel admin SourceCode99.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Articles', value: stats.total, icon: FileText, color: 'text-blue-500' },
          { label: 'Published', value: stats.published, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Drafts', value: stats.drafts, icon: Clock, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">{stat.label}</span>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Articles</h2>
          <Link to="/admin/articles" className="text-blue-500 text-sm hover:underline">View All</Link>
        </div>
        <div className="divide-y divide-slate-800">
          {recentArticles.map((article) => (
            <div key={article.id} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="space-y-1">
                <h3 className="font-bold text-white">{article.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{format(article.createdAt.toDate(), 'MMM dd, yyyy')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                  article.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {article.status}
                </span>
                <Link to={`/admin/editor/${article.id}`} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <FileText size={18} className="text-slate-400" />
                </Link>
              </div>
            </div>
          ))}
          {recentArticles.length === 0 && (
            <div className="p-12 text-center text-slate-500">Belum ada artikel.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
