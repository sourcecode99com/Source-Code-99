
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../translations';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  lang: Language;
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, lang, onBack }) => {
  const isPrivacy = type === 'privacy';
  
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-blue-500 font-bold mb-12 hover:translate-x-1 transition-transform"
        >
          <ArrowLeft className="h-5 w-5" /> {lang === 'ID' ? 'Kembali' : 'Back'}
        </button>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-12">
          {isPrivacy 
            ? (lang === 'ID' ? 'Kebijakan Privasi' : 'Privacy Policy') 
            : (lang === 'ID' ? 'Syarat & Ketentuan' : 'Terms of Service')}
        </h1>
        
        <div className="prose prose-invert prose-slate max-w-none text-slate-400 space-y-8 text-lg leading-relaxed">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. {lang === 'ID' ? 'Pengantar' : 'Introduction'}</h2>
                <p>
                  {lang === 'ID' 
                    ? 'Source Code 99 menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda ketika Anda menggunakan layanan kami.'
                    : 'Source Code 99 values your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our services.'}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. {lang === 'ID' ? 'Informasi yang Kami Kumpulkan' : 'Information We Collect'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Kami mengumpulkan informasi yang Anda berikan langsung kepada kami, seperti nama, email, dan rincian kontak lainnya saat Anda melakukan konsultasi atau memesan layanan kami.'
                    : 'We collect information you provide directly to us, such as your name, email, and other contact details when you consult or order our services.'}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. {lang === 'ID' ? 'Penggunaan Informasi' : 'Use of Information'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Informasi yang kami kumpulkan digunakan untuk memproses pesanan Anda, memberikan dukungan teknis, dan meningkatkan layanan kami.'
                    : 'The information we collect is used to process your orders, provide technical support, and improve our services.'}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. {lang === 'ID' ? 'Keamanan' : 'Security'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses yang tidak sah.'
                    : 'We take reasonable security measures to protect your information from unauthorized access.'}
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. {lang === 'ID' ? 'Penerimaan Ketentuan' : 'Acceptance of Terms'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Dengan menggunakan layanan Source Code 99, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini.'
                    : 'By using Source Code 99 services, you agree to be bound by these Terms and Conditions.'}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. {lang === 'ID' ? 'Layanan Kami' : 'Our Services'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Source Code 99 menyediakan jasa pembuatan website, aplikasi web, dan aplikasi mobile. Rincian proyek akan disepakati melalui kontrak terpisah.'
                    : 'Source Code 99 provides website, web app, and mobile app development services. Project details will be agreed upon through separate contracts.'}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. {lang === 'ID' ? 'Pembayaran' : 'Payment'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Syarat pembayaran akan ditentukan pada setiap penawaran proyek. Kami berhak menghentikan pengerjaan jika pembayaran tidak dilakukan tepat waktu.'
                    : 'Payment terms will be specified in each project proposal. We reserve the right to suspend work if payments are not made on time.'}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. {lang === 'ID' ? 'Hak Kekayaan Intelektual' : 'Intellectual Property'}</h2>
                <p>
                  {lang === 'ID'
                    ? 'Setelah pelunasan, hak kekayaan intelektual dari hasil pekerjaan akan dialihkan kepada klien sesuai dengan kesepakatan kontrak.'
                    : 'Upon full payment, the intellectual property rights of the work product will be transferred to the client as per the contract agreement.'}
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
