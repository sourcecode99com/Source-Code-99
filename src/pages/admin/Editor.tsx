import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { db, auth, storage } from '../../services/firebase';
import { Article, ArticleInput } from '../../types';
import { Save, ArrowLeft, Image as ImageIcon, Sparkles, Loader2, Eye, Trash2 } from 'lucide-react';
import { slugify, cn, compressImage } from '../../lib/utils';
import AIAssistant from '../../components/AIAssistant';
import ImageGenerator from '../../components/ImageGenerator';
import TiptapEditor from '../../components/TiptapEditor';
import { useTheme } from '../../context/ThemeContext';

const Editor: React.FC = () => {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTopic = queryParams.get('topic') || '';
  const scheduleId = queryParams.get('scheduleId') || '';

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [preview, setPreview] = useState(false);

  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: 'Technology',
    tags: [],
    author: auth.currentUser?.displayName || 'Admin',
    status: 'draft',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [imageGeneratorPrompt, setImageGeneratorPrompt] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadSuccess(false);
    setUploadProgress(0);
    try {
      // 1. Compress Image (Max 1MB, 1024px)
      const optimizedFile = await compressImage(file);
      
      const fileName = `covers/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, optimizedFile, {
        contentType: optimizedFile.type
      });

      const performUpload = (): Promise<string> => {
        return new Promise((resolve, reject) => {
          // 2. Timeout Handling (60s)
          const timeout = setTimeout(() => {
            uploadTask.cancel();
            reject(new Error('Waktu unggah habis (Timeout). Silakan coba lagi.'));
          }, 60000);

          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
              console.log('Upload is ' + Math.round(progress) + '% done');
            }, 
            (error) => {
              clearTimeout(timeout);
              if (error.code === 'storage/canceled') {
                reject(new Error('Unggahan dibatalkan karena koneksi lambat atau timeout.'));
              } else {
                reject(error);
              }
            }, 
            async () => {
              clearTimeout(timeout);
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(url);
              } catch (err) {
                reject(err);
              }
            }
          );
        });
      };

      const url = await performUpload();
      setFormData(prev => ({ ...prev, coverImage: url }));
      setUploadSuccess(true);
      setUploadingImage(false);
    } catch (err: any) {
      console.error('Upload failed:', err);
      alert('Gagal mengunggah gambar: ' + (err.message || 'Terjadi kesalahan.'));
      setUploadingImage(false);
    }
  };

  // Helper to upload image from URL to Firebase Storage
  const uploadImageFromUrl = async (url: string, path: string, retries = 2): Promise<string> => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      
      // 1. Compress Image
      const file = new File([blob], 'image.jpg', { type: blob.type });
      const optimizedFile = await compressImage(file);
      
      const storageRef = ref(storage, path);
      
      const performUpload = async (retryCount: number): Promise<string> => {
        try {
          const uploadTask = uploadBytesResumable(storageRef, optimizedFile, {
            contentType: optimizedFile.type || 'image/jpeg'
          });

          return await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              uploadTask.cancel();
              reject(new Error('Timeout'));
            }, 60000);

            uploadTask.on('state_changed', null, 
              (err) => {
                clearTimeout(timeout);
                reject(err);
              }, 
              async () => {
                clearTimeout(timeout);
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadUrl);
              }
            );
          });
        } catch (err) {
          if (retryCount > 0) {
            console.log(`Retrying uploadFromUrl... attempts left: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return performUpload(retryCount - 1);
          }
          throw err;
        }
      };

      return await performUpload(retries);
    } catch (err) {
      console.error('Error uploading image:', err);
      return url; // Fallback to original URL if upload fails
    }
  };

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const docRef = doc(db, 'articles', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as ArticleInput);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setFetching(false);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: id ? prev.slug : slugify(title)
    }));
  };

  const handleSave = async (shouldPublish?: boolean) => {
    if (!formData.title || !formData.content) {
      alert('Judul dan konten wajib diisi.');
      return;
    }

    setLoading(true);
    try {
      let finalCoverImage = formData.coverImage;
      let finalContent = formData.content;

      // Fallback for cover image if empty
      if (!finalCoverImage) {
        // Try to find first image in content
        const parser = new DOMParser();
        const docObj = parser.parseFromString(finalContent, 'text/html');
        const firstImg = docObj.querySelector('img');
        if (firstImg) {
          finalCoverImage = firstImg.getAttribute('src') || '';
        }
        
        // If still empty, use default image
        if (!finalCoverImage) {
          finalCoverImage = 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/dashboard%20admin-booking%20online-sourcecode99com.jpg';
        }
      }

      // If cover image is an external AI generated URL (pollinations), upload it to Firebase
      if (finalCoverImage && finalCoverImage.includes('pollinations.ai')) {
        const fileName = `covers/${Date.now()}-${formData.slug}.jpg`;
        finalCoverImage = await uploadImageFromUrl(finalCoverImage, fileName);
      }

      // If content contains external AI generated images, upload them too
      if (finalContent.includes('pollinations.ai')) {
        const parser = new DOMParser();
        const docObj = parser.parseFromString(finalContent, 'text/html');
        const images = docObj.querySelectorAll('img');
        
        const uploadPromises: Promise<void>[] = [];
        
        images.forEach((img, i) => {
          const src = img.getAttribute('src');
          if (src && src.includes('pollinations.ai')) {
            const fileName = `content/${Date.now()}-img-${i}.jpg`;
            const tryUpload = async (retries = 2): Promise<void> => {
              try {
                const newUrl = await uploadImageFromUrl(src, fileName);
                img.setAttribute('src', newUrl);
              } catch (err) {
                if (retries > 0) {
                  console.log(`Retrying content image upload... attempts left: ${retries}`);
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  return tryUpload(retries - 1);
                }
                console.error('Failed to upload content image after retries:', err);
              }
            };
            uploadPromises.push(tryUpload());
          }
        });
        
        await Promise.all(uploadPromises);
        finalContent = docObj.body.innerHTML;
      }

      const data = {
        ...formData,
        coverImage: finalCoverImage,
        content: finalContent,
        status: shouldPublish ? 'published' : formData.status,
        updatedAt: serverTimestamp(),
      };

      if (id) {
        await updateDoc(doc(db, 'articles', id), data);
      } else {
        const articleRef = await addDoc(collection(db, 'articles'), {
          ...data,
          createdAt: serverTimestamp(),
        });

        // If this was generated from a schedule, update the schedule status
        if (scheduleId) {
          await updateDoc(doc(db, 'schedules', scheduleId), {
            status: 'published',
            articleId: articleRef.id,
            updatedAt: serverTimestamp()
          });
        }
      }
      navigate('/admin/articles');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan artikel.');
    } finally {
      setLoading(false);
      setShowPublishModal(false);
    }
  };

  if (fetching) return <div className="animate-pulse">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {showPublishModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass p-8 rounded-3xl max-w-sm w-full space-y-6 text-center shadow-2xl border-blue-500/20">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="text-blue-500" size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Publish Artikel?</h3>
              <p className="text-slate-400 text-sm">Apakah Anda ingin langsung mempublikasikan artikel ini agar muncul di blog?</p>
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button 
                onClick={() => handleSave(true)}
                disabled={loading}
                className="btn-primary py-3 w-full font-bold flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                {loading ? 'Memproses...' : 'Ya, Publish Sekarang'}
              </button>
              <button 
                onClick={() => handleSave(false)}
                disabled={loading}
                className="btn-secondary py-3 w-full font-bold flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" size={18} />}
                Simpan sebagai {formData.status === 'published' ? 'Published' : 'Draft'}
              </button>
              <button 
                onClick={() => setShowPublishModal(false)}
                disabled={loading}
                className="text-slate-500 hover:text-slate-300 text-sm font-medium pt-2 disabled:opacity-50"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">{id ? 'Edit Article' : 'New Article'}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreview(!preview)}
            className="btn-secondary flex items-center gap-2"
          >
            <Eye size={18} /> {preview ? 'Edit' : 'Preview'}
          </button>
          <button 
            onClick={() => setShowPublishModal(true)}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save Article
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {preview ? (
            <div className="glass p-8 rounded-2xl min-h-[600px]">
              <h1 className="text-4xl font-bold text-white mb-6">{formData.title}</h1>
              {formData.coverImage && (
                <img src={formData.coverImage} alt="" className="w-full aspect-video object-cover rounded-xl mb-8" />
              )}
              <div className="prose" dangerouslySetInnerHTML={{ __html: formData.content }} />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Article Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter title..."
                  className="input-field text-xl font-bold py-4"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Content</label>
                <TiptapEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Mulai menulis artikel Anda di sini..."
                />
              </div>
            </>
          )}
        </div>

        <div className="space-y-6">
          <AIAssistant 
            initialTopic={initialTopic}
            onGenerate={(data) => {
              setFormData(prev => ({
                ...prev,
                title: data.title,
                content: data.content,
                excerpt: data.excerpt,
                slug: slugify(data.title),
                coverImage: data.coverImageUrl || ''
              }));
              setImageGeneratorPrompt(data.coverImagePrompt || '');
            }} 
          />

          <ImageGenerator 
            defaultPrompt={imageGeneratorPrompt || formData.title}
            onImageSaved={(url) => {
              setFormData(prev => ({ ...prev, coverImage: url }));
            }}
          />

          <div className="glass p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white">Publishing Settings</h3>
            
            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="input-field text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field text-sm"
              >
                <option>Technology</option>
                <option>Business</option>
                <option>Tutorial</option>
                <option>News</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="input-field text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">Cover Image</label>
              <div className="space-y-3">
                {formData.coverImage && (
                  <div className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-800 shadow-lg">
                    <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                    {uploadSuccess && (
                      <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm shadow-md animate-pulse">
                        <span>✓ Berhasil diunggah</span>
                      </div>
                    )}
                    <button 
                      onClick={() => {
                        setFormData(prev => ({ ...prev, coverImage: '' }));
                        setUploadSuccess(false);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                {uploadingImage && (
                  <div className="space-y-1.5 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-blue-400 font-medium">Mengunggah gambar...</span>
                      <span className="text-slate-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <label className={cn(
                    "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer text-sm font-medium text-slate-400",
                    uploadingImage && "opacity-50 cursor-not-allowed"
                  )}>
                    {uploadingImage ? <Loader2 className="animate-spin" size={18} /> : <ImageIcon size={18} />}
                    {uploadingImage ? `Mengunggah (${uploadProgress}%)` : 'Browse Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploadingImage} />
                  </label>
                </div>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="Atau masukkan URL gambar..."
                  className="input-field text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-500 uppercase font-bold">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="input-field text-sm h-24 resize-none"
                placeholder="Short description..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
