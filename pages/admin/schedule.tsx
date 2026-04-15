import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Search,
  Eye
} from 'lucide-react';
import { generateWeeklyTopics } from '../../src/services/aiService';
import { 
  getSchedules, 
  createSchedule, 
  deleteSchedule, 
  runAutoPublish,
  processSchedule 
} from '../../src/services/scheduleService';
import { Schedule } from '../../src/types';
import { format } from 'date-fns';
import { cn } from '../../src/lib/utils';

import { useRouter } from 'next/router';

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  
  // Topic Generation State
  const [niche, setNiche] = useState('Website UMKM & Startup Digital');
  const [generatingTopics, setGeneratingTopics] = useState(false);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [publishDates, setPublishDates] = useState<Record<string, string>>({});

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleGenerateTopics = async () => {
    if (!niche.trim()) return;
    setGeneratingTopics(true);
    try {
      const topics = await generateWeeklyTopics(niche);
      setSuggestedTopics(topics);
      // Default dates: starting from tomorrow
      const dates: Record<string, string> = {};
      topics.forEach((topic, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        dates[topic] = date.toISOString().split('T')[0];
      });
      setPublishDates(dates);
    } catch (err) {
      console.error(err);
      alert('Gagal generate topik.');
    } finally {
      setGeneratingTopics(false);
    }
  };

  const toggleTopicSelection = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleAddSchedules = async () => {
    if (selectedTopics.length === 0) return;
    setLoading(true);
    try {
      for (const topic of selectedTopics) {
        const dateStr = publishDates[topic];
        const date = new Date(dateStr);
        // Set time to morning (e.g. 08:00)
        date.setHours(8, 0, 0, 0);
        await createSchedule(topic, date);
      }
      setSuggestedTopics([]);
      setSelectedTopics([]);
      await fetchSchedules();
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan jadwal.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus jadwal ini?')) return;
    try {
      await deleteSchedule(id);
      setSchedules(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const results = await runAutoPublish();
      const successCount = results.filter(r => r.status === 'success').length;
      if (successCount > 0) {
        alert(`${successCount} artikel berhasil dipublikasikan otomatis!`);
        await fetchSchedules();
      } else {
        alert('Tidak ada artikel yang perlu dipublikasikan saat ini.');
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menjalankan sinkronisasi.');
    } finally {
      setSyncing(false);
    }
  };

  const handleGenerateNow = (schedule: Schedule) => {
    router.push(`/admin/editor?topic=${encodeURIComponent(schedule.topic)}&scheduleId=${schedule.id}`);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Schedule Posts</h1>
          <p className="text-slate-400">Otomatisasi konten blog Anda dengan AI.</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={syncing}
          className="btn-secondary flex items-center gap-2"
        >
          {syncing ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
          Sync & Publish Due
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Generator */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <Sparkles size={20} />
              <h2>Weekly Topic Generator</h2>
            </div>
            <p className="text-sm text-slate-400">
              Masukkan niche bisnis Anda untuk mendapatkan 7 ide topik artikel SEO-friendly.
            </p>
            <div className="space-y-3">
              <input 
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Contoh: Digital Marketing UMKM"
                className="input-field"
              />
              <button 
                onClick={handleGenerateTopics}
                disabled={generatingTopics || !niche}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {generatingTopics ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                Generate Topics
              </button>
            </div>
          </div>

          {suggestedTopics.length > 0 && (
            <div className="glass p-6 rounded-3xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="font-bold text-white">Pilih Topik & Jadwal</h3>
              <div className="space-y-4">
                {suggestedTopics.map((topic, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => toggleTopicSelection(topic)}
                        className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                      />
                      <p className="text-sm text-slate-200 font-medium leading-tight">{topic}</p>
                    </div>
                    {selectedTopics.includes(topic) && (
                      <div className="flex items-center gap-2 pl-7">
                        <CalendarIcon size={14} className="text-slate-500" />
                        <input 
                          type="date"
                          value={publishDates[topic]}
                          onChange={(e) => setPublishDates(prev => ({ ...prev, [topic]: e.target.value }))}
                          className="bg-transparent text-xs text-blue-400 outline-none border-none p-0"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button 
                onClick={handleAddSchedules}
                disabled={selectedTopics.length === 0 || loading}
                className="w-full btn-primary py-3"
              >
                Tambahkan ke Jadwal ({selectedTopics.length})
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Schedule List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h2 className="font-bold text-white">Daftar Jadwal</h2>
              <span className="text-xs text-slate-500">{schedules.length} Items</span>
            </div>
            
            <div className="divide-y divide-slate-800">
              {loading ? (
                <div className="p-12 text-center text-slate-500 animate-pulse">Memuat jadwal...</div>
              ) : schedules.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto text-slate-600">
                    <CalendarIcon size={32} />
                  </div>
                  <p className="text-slate-500">Belum ada jadwal konten.</p>
                </div>
              ) : (
                schedules.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/20 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                          item.status === 'published' ? "bg-emerald-500/10 text-emerald-500" :
                          item.status === 'generated' ? "bg-blue-500/10 text-blue-500" :
                          "bg-amber-500/10 text-amber-500"
                        )}>
                          {item.status}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock size={12} />
                          {format(item.publishDate.toDate(), 'dd MMM yyyy, HH:mm')}
                        </span>
                      </div>
                      <h3 className="font-bold text-white">{item.topic}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {item.status === 'scheduled' && (
                        <button 
                          onClick={() => handleGenerateNow(item)}
                          disabled={syncing}
                          className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition-colors flex items-center gap-2 text-xs font-bold"
                          title="Generate Now"
                        >
                          <Sparkles size={16} /> Generate Now
                        </button>
                      )}
                      {item.articleId && (
                        <a 
                          href={`/blog/${item.topic.toLowerCase().replace(/ /g, '-')}`} // Fallback slug logic
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 transition-colors"
                        >
                          <Eye size={18} />
                        </a>
                      )}
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
