import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../../src/services/firebase';
import { Article, Schedule } from '../../src/types';
import { Search, Plus, Edit2, Trash2, Eye, Filter, MoreVertical, Calendar, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '../../src/lib/utils';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'published' | 'scheduled'>('published');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'articles'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
      setArticles(data.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async () => {
    try {
      const q = query(collection(db, 'schedules'), orderBy('publishDate', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Schedule));
      setSchedules(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchSchedules();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      if (activeTab === 'published') {
        await deleteDoc(doc(db, 'articles', deleteId));
        setArticles(prev => prev.filter(a => a.id !== deleteId));
      } else {
        await deleteDoc(doc(db, 'schedules', deleteId));
        setSchedules(prev => prev.filter(s => s.id !== deleteId));
      }
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus data.');
    }
  };

  const toggleStatus = async (article: Article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    try {
      await updateDoc(doc(db, 'articles', article.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, status: newStatus } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredArticles = articles.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Articles</h1>
          <p className="text-slate-400">Kelola semua konten blog Anda di sini.</p>
        </div>
        <Link href="/admin/editor" className="btn-primary flex items-center gap-2">
          <Plus size={20} /> New Article
        </Link>
      </header>

      <div className="flex items-center gap-4 border-b border-slate-800">
        <button 
          onClick={() => setActiveTab('published')}
          className={cn(
            "pb-4 px-2 text-sm font-bold transition-all relative",
            activeTab === 'published' ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Published Articles
          {activeTab === 'published' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
        </button>
        <button 
          onClick={() => setActiveTab('scheduled')}
          className={cn(
            "pb-4 px-2 text-sm font-bold transition-all relative",
            activeTab === 'scheduled' ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
          )}
        >
          Scheduled Posts
          {activeTab === 'scheduled' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
        </button>
      </div>

      {activeTab === 'published' ? (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <button 
                onClick={() => fetchArticles()}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-500 transition-colors z-10"
              >
                <Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchArticles()}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="input-field w-auto"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Article</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0">
                            {article.coverImage && (
                              <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="max-w-xs">
                            <p className="font-bold text-white truncate">{article.title}</p>
                            <p className="text-xs text-slate-500 truncate">/{article.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-400">{article.category}</span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleStatus(article)}
                          className={cn(
                            "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                            article.status === 'published' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                          )}
                        >
                          {article.status}
                        </button>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-400">{format(article.createdAt.toDate(), 'MMM dd, yyyy')}</p>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/blog/${article.slug}`} 
                            target="_blank"
                            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link 
                            href={`/admin/editor/${article.id}`} 
                            className="p-2 hover:bg-slate-700 rounded-lg text-blue-400 transition-colors"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button 
                            onClick={() => setDeleteId(article.id)}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredArticles.length === 0 && !loading && (
                <div className="p-12 text-center text-slate-500">Tidak ada artikel yang ditemukan.</div>
              )}
              {loading && (
                <div className="p-12 text-center text-slate-500 animate-pulse">Memuat data...</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Topic</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Publish Date</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {schedules.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-white">{item.topic}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock size={14} />
                        {format(item.publishDate.toDate(), 'dd MMM yyyy, HH:mm')}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                        item.status === 'published' ? "bg-emerald-500/10 text-emerald-500" :
                        item.status === 'generated' ? "bg-blue-500/10 text-blue-500" :
                        "bg-amber-500/10 text-amber-500"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === 'scheduled' && (
                          <Link 
                            href={`/admin/editor?topic=${encodeURIComponent(item.topic)}&scheduleId=${item.id}`}
                            className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition-colors flex items-center gap-2 text-xs font-bold"
                          >
                            <Sparkles size={16} /> Generate
                          </Link>
                        )}
                        <button 
                          onClick={() => {
                            setDeleteId(item.id);
                            // Note: we need to handle schedule deletion separately or check type
                          }}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {schedules.length === 0 && (
              <div className="p-12 text-center text-slate-500">Tidak ada jadwal konten.</div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass p-8 rounded-3xl max-w-sm w-full space-y-6 text-center shadow-2xl border-red-500/20">
            <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto">
              <Trash2 className="text-red-500" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Hapus Artikel?</h3>
              <p className="text-slate-400 text-sm">Tindakan ini tidak dapat dibatalkan. Artikel akan dihapus secara permanen.</p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={handleDelete}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all"
              >
                Ya, Hapus Permanen
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
