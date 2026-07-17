import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { encrypt, decrypt } from '../../services/crypto';
import { 
  Key, 
  Sparkles, 
  ImageIcon, 
  Eye, 
  EyeOff, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  RefreshCw, 
  Info 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Settings: React.FC = () => {
  const [articleKey, setArticleKey] = useState('');
  const [imageKey, setImageKey] = useState('');
  const [articleUsage, setArticleUsage] = useState(0);
  const [imageUsage, setImageUsage] = useState(0);
  
  const [showArticleKey, setShowArticleKey] = useState(false);
  const [showImageKey, setShowImageKey] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const docRef = doc(db, 'settings', 'apikeys');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setArticleUsage(data.articleUsage || 0);
        setImageUsage(data.imageUsage || 0);
        
        if (data.articleKey) {
          setArticleKey(decrypt(data.articleKey));
        } else {
          setArticleKey('');
        }
        
        if (data.imageKey) {
          setImageKey(decrypt(data.imageKey));
        } else {
          setImageKey('');
        }
      } else {
        // Doc doesn't exist yet, initialize state as blank
        setArticleKey('');
        setImageKey('');
        setArticleUsage(0);
        setImageUsage(0);
      }
    } catch (err: any) {
      console.error('Error fetching API settings:', err);
      setErrorMsg('Gagal memuat pengaturan API keys. Pastikan Anda punya izin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const encryptedArticle = encrypt(articleKey.trim());
      const encryptedImage = encrypt(imageKey.trim());
      
      const docRef = doc(db, 'settings', 'apikeys');
      await setDoc(docRef, {
        articleKey: encryptedArticle,
        imageKey: encryptedImage,
        updatedAt: new Date(),
        // Keep existing usage counters if they exist (or set to 0 as fallback merge)
        articleUsage: articleUsage || 0,
        imageUsage: imageUsage || 0
      }, { merge: true });

      setSuccessMsg('API Keys berhasil disimpan secara terenkripsi dan siap digunakan.');
      
      // Auto dismiss success toast
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      console.error('Error saving API settings:', err);
      setErrorMsg('Gagal menyimpan API keys ke database.');
    } finally {
      setSaving(false);
    }
  };

  const resetUsageStats = async () => {
    if (!window.confirm('Apakah Anda yakin ingin mereset data statistik penggunaan API Key?')) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'settings', 'apikeys');
      await setDoc(docRef, {
        articleUsage: 0,
        imageUsage: 0
      }, { merge: true });
      
      setArticleUsage(0);
      setImageUsage(0);
      setSuccessMsg('Statistik penggunaan API Keys berhasil di-reset.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Error resetting core stats:', err);
      setErrorMsg('Gagal mengatur ulang data penggunaan.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pt-5 animate-pulse">
        <div className="h-8 bg-slate-800 w-1/4 rounded-md"></div>
        <div className="h-4 bg-slate-800 w-2/5 rounded-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="h-64 bg-slate-900 border border-slate-800 rounded-2xl"></div>
          <div className="h-64 bg-slate-900 border border-slate-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <header className="flex justify-between items-center sm:items-start flex-wrap gap-4 border-b border-slate-800/40 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Key className="text-blue-500" size={32} />
            Pengaturan API Keys
          </h1>
          <p className="text-slate-400 mt-1.5 text-sm sm:text-base">
            Kelola kredensial API untuk proses penulisan artikel dan generator gambar dengan aman.
          </p>
        </div>
        
        <button
          onClick={fetchSettings}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs rounded-xl transition"
          title="Segarkan data dari database"
        >
          <RefreshCw size={14} className={cn(loading && "animate-spin")} />
          Refresh
        </button>
      </header>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl animate-fadeIn">
          <CheckCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl animate-fadeIn">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{errorMsg}</p>
        </div>
      )}

      {/* Usage Analytics Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="text-blue-500" size={18} />
          Statistik Penggunaan Kunci (Usage Analytics)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Article Generator Usage Card */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden flex items-center justify-between border border-slate-800/80 bg-slate-900/40">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Text Generator Key Usage</span>
              <p className="text-4xl font-black text-white tracking-tight mt-1">{articleUsage}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <Sparkles size={12} className="text-blue-400" />
                Jumlah generate artikel menggunakan API Key custom.
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
              <Sparkles size={28} />
            </div>
          </div>

          {/* Image Generator Usage Card */}
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden flex items-center justify-between border border-slate-800/80 bg-slate-900/40">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block">Image Generator Key Usage</span>
              <p className="text-4xl font-black text-white tracking-tight mt-1">{imageUsage}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <ImageIcon size={12} className="text-emerald-400" />
                Jumlah generate gambar menggunakan API Key custom.
              </p>
            </div>
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <ImageIcon size={28} />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={resetUsageStats}
            className="text-xs text-slate-500 hover:text-red-400 transition underline cursor-pointer"
          >
            Reset statistik penggunaan
          </button>
        </div>
      </section>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-card p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-6">
          <h2 className="text-xl font-bold text-white border-b border-slate-800/60 pb-3 flex items-center gap-2">
            <Key size={20} className="text-blue-500" />
            Konfigurasi Kunci API (Custom API Credentials)
          </h2>

          <div className="flex gap-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-slate-300 text-xs">
            <Info className="text-blue-400 shrink-0" size={16} />
            <div className="space-y-1 leading-relaxed">
              <p className="font-semibold text-blue-400">Keamanan Enkripsi Kunci</p>
              <p>
                Semua kunci yang Anda ketikkan di bawah ini akan dienkripsi dengan sandi asimetris/XOR khusus sebelum diunggah ke database Firestore. Kunci didekripsi secara langsung di memori browser hanya saat memanggil API Gemini. Ini mencegah orang asing melihat kunci Anda di konsol Firebase.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* ARTICLE WRITING KEY */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400" />
                API Key Penulisan Artikel (Gemini Text Model)
              </label>
              <div className="relative">
                <input
                  type={showArticleKey ? 'text' : 'password'}
                  value={articleKey}
                  onChange={(e) => setArticleKey(e.target.value)}
                  placeholder="Masukkan Gemini API Key untuk menulis artikel (misal: AIzaSy...)"
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-mono placeholder:font-sans placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowArticleKey(!showArticleKey)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition"
                >
                  {showArticleKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Kunci ini digunakan untuk memanggil model <span className="text-slate-400 font-mono">gemini-3.5-flash</span> guna menyusun artikel, rancangan judul, outline, dan ide artikel mingguan.
              </p>
            </div>

            {/* IMAGE GENERATION KEY */}
            <div className="space-y-2.5 pt-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <ImageIcon size={16} className="text-emerald-400" />
                API Key Pembuat Gambar (Gemini Image Model)
              </label>
              <div className="relative">
                <input
                  type={showImageKey ? 'text' : 'password'}
                  value={imageKey}
                  onChange={(e) => setImageKey(e.target.value)}
                  placeholder="Masukkan Gemini API Key untuk pembuat gambar (misal: AIzaSy...)"
                  className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition font-mono placeholder:font-sans placeholder:text-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowImageKey(!showImageKey)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition"
                >
                  {showImageKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Kunci ini didedikasikan untuk model <span className="text-slate-400 font-mono">gemini-2.5-flash-image</span> guna menghasilkan gambar penutup (cover) artikel AI yang menakjubkan.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer disabled:opacity-40 select-none transition"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={16} />
                Simpan API Keys
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
