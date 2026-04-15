import React, { useState } from 'react';
import { Sparkles, Loader2, List, RefreshCw, Search } from 'lucide-react';
import { generateArticle, generateOutline, AIArticleResponse } from '../services/aiService';
import { cn } from '../lib/utils';

interface AIAssistantProps {
  onGenerate: (data: AIArticleResponse) => void;
  initialTopic?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onGenerate, initialTopic }) => {
  const [keyword, setKeyword] = useState(initialTopic || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateArticle(keyword);
      onGenerate(data);
    } catch (err) {
      console.error(err);
      setError('Gagal menghasilkan artikel. Pastikan API Key sudah benar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-2 text-blue-400 font-bold">
        <Sparkles size={20} />
        <h2>AI Writing Assistant</h2>
      </div>
      
      <p className="text-sm text-slate-400">
        Masukkan kata kunci atau topik untuk menghasilkan artikel lengkap secara otomatis.
      </p>

      <div className="space-y-3">
        <textarea
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Contoh: Tips SEO 2024 untuk meningkatkan traffic website..."
          className="input-field h-32 resize-none py-3 text-base"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !keyword}
          className="w-full btn-primary py-3 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} />
          )}
          <span className="text-lg">Generate Article</span>
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="grid grid-cols-2 gap-2 pt-2">
        <button className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800/50 text-xs text-slate-300 hover:bg-slate-800 transition-colors">
          <List size={14} /> Outline
        </button>
        <button className="flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-800/50 text-xs text-slate-300 hover:bg-slate-800 transition-colors">
          <RefreshCw size={14} /> Rewrite
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
