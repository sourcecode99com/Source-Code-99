import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import { Zap, ArrowRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const t = translations[lang].cta;

  return (
    <>
      <Helmet>
        <title>Source Code 99 | Jasa Pembuatan Website & Aplikasi Professional</title>
        <meta name="description" content="Source Code 99 bantu UMKM & startup punya sistem digital yang simpel, keren, dan benar-benar membantu bisnis tumbuh pesat." />
        <meta property="og:title" content="Source Code 99 | Digital Transformation Partner" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Hero lang={lang} />
      <ProblemSection lang={lang} />

      <section className="py-24 relative overflow-hidden bg-slate-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-8 border border-blue-500/20">
            <Zap className="text-blue-500 h-8 w-8" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight">
            {lang === 'ID' ? 'Di Sini ' : 'Here '} 
            <span className="text-blue-500">Source Code 99</span> {lang === 'ID' ? 'Bantu Kamu' : 'Helps You'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {(lang === 'ID' 
              ? ["Mudah dipakai", "Nggak ribet", "Bisa disesuaikan", "Siap tumbuh"]
              : ["Easy to use", "Hassle-free", "Customizable", "Ready to grow"]).map((item, idx) => (
              <div key={idx} className="p-6 glass rounded-3xl border border-white/5 text-white font-bold flex items-center justify-center gap-3 transition-all hover:border-blue-500/30 hover:scale-105">
                <div className="h-2 w-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services lang={lang} />
      <WhyUs lang={lang} />
      <Portfolio lang={lang} />
      <Testimonials lang={lang} />

      <section id="cta" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative glass p-12 md:p-24 rounded-[3.5rem] overflow-hidden border border-white/10 text-center shadow-2xl">
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
                {t.headline} <br /> <span className="gradient-text">{t.headlineGradient}</span>
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                {t.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="https://wa.me/6285123876559?text=Halo%20Sourcecode99.com%20Saya%20ingin%20berdiskusi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl text-xl font-black transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3"
                >
                  {t.btn1} <ArrowRight size={24} />
                </a>
              </div>
              <p className="mt-16 text-slate-500 font-bold italic text-sm tracking-wide">
                {t.footerQuote}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;