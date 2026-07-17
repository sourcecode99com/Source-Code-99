import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Save, ImageIcon, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { generateImage } from '../services/aiService';
import { cn, isValidBase64, base64ToFile, compressImage, uploadImageToCloudflare } from '../lib/utils';

interface ImageGeneratorProps {
  onImageSaved: (url: string) => void;
  defaultPrompt?: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageSaved, defaultPrompt = '' }) => {
  const [prompt, setPrompt] = useState(defaultPrompt);

  useEffect(() => {
    if (defaultPrompt) {
      setPrompt(defaultPrompt);
    }
  }, [defaultPrompt]);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    setError(null);
    setSuccess(false);
    setPreviewUrl(null);

    try {
      const base64Image = await generateImage(prompt);
      if (!isValidBase64(base64Image)) {
        throw new Error('Format gambar tidak valid.');
      }
      setPreviewUrl(base64Image);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal menghasilkan gambar. Silakan coba lagi.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!previewUrl) return;

    setUploading(true);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);

    try {
      const timestamp = Date.now();
      const filename = `ai-gen-${timestamp}.jpg`;

      // 1. Convert Base64 to File safely
      const rawFile = base64ToFile(previewUrl, filename);

      // 2. Compress Image (Max 1MB, 1024px)
      const optimizedFile = await compressImage(rawFile);
      setUploadProgress(50);

      // 3. Upload to Cloudflare Images via our server-side proxy
      const url = await uploadImageToCloudflare(optimizedFile);
      setUploadProgress(100);

      onImageSaved(url);
      setSuccess(true);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Gagal mengunggah gambar ke storage.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-2xl space-y-4 border border-blue-500/10">
      <div className="flex items-center gap-2 text-blue-400 font-bold">
        <ImageIcon size={20} />
        <h2>AI Image Generator</h2>
      </div>

      <div className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Deskripsikan gambar yang ingin dibuat (Contoh: Modern tech office with neon lights, 4k, cinematic)..."
          className="input-field h-24 resize-none py-3 text-sm"
        />

        <button
          onClick={handleGenerate}
          disabled={generating || uploading || !prompt.trim()}
          className="w-full btn-secondary py-3 flex items-center justify-center gap-2"
        >
          {generating ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Sparkles size={18} />
          )}
          <span>{generating ? 'Generating...' : 'Generate Image'}</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-xl">
          <AlertCircle size={14} />
          <p>{error}</p>
        </div>
      )}

      {previewUrl && (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-800 shadow-2xl">
            <img src={previewUrl} alt="AI Generated Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-xs font-medium">AI Generated Preview</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={uploading}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {uploading && (
                <div
                  className="absolute inset-0 bg-blue-400/20 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              )}
              <div className="relative flex items-center gap-2">
                {uploading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                <span>{uploading ? `Saving (${uploadProgress}%)` : 'Save & Use Image'}</span>
              </div>
            </button>

            <button
              onClick={handleGenerate}
              disabled={generating || uploading}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="Regenerate"
            >
              <RefreshCw size={18} className={cn(generating && "animate-spin")} />
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-400/10 p-3 rounded-xl animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={14} />
          <p>Gambar berhasil disimpan dan siap digunakan!</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
