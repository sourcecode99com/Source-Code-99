import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../translations';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  lang: Language;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, lang }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy 
    ? (lang === 'ID' ? 'Kebijakan Privasi' : 'Privacy Policy') 
    : (lang === 'ID' ? 'Syarat & Ketentuan' : 'Terms of Service');
  
  return (
    <article className="pt-32 pb-24 min-h-screen bg-slate-950">
      <Helmet>
        <title>{title} | Source Code 99</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="flex items-center gap-2 text-blue-500 font-bold mb-12 hover:translate-x-1 transition-transform">
          <ArrowLeft size={20} /> {lang === 'ID' ? 'Kembali ke Beranda' : 'Back to Home'}
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-12">{title}</h1>
        
        <div className="prose prose-invert max-w-none text-slate-400 space-y-8 text-lg leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. {lang === 'ID' ? 'Pengantar' : 'Introduction'}</h2>
                <p>Source Code 99 menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda menggunakan layanan kami.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. {lang === 'ID' ? 'Data Koleksi' : 'Data Collection'}</h2>
                <p>Kami mengumpulkan data yang diberikan secara sukarela melalui formulir konsultasi dan interaksi layanan teknis kami.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. {lang === 'ID' ? 'Penerimaan Ketentuan' : 'Acceptance of Terms'}</h2>
                <p>Dengan menggunakan layanan kami, Anda menyetujui semua syarat dan ketentuan yang berlaku di Source Code 99.</p>
              </section>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default LegalPage;