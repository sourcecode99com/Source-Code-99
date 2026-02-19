import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LegalPage from './components/LegalPage';
import { ArrowRight, Zap } from 'lucide-react';
import { Language, translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ID');
  const [page, setPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const t = translations[lang].cta;

  // Resilient scroll handling for section links
  useEffect(() => {
    if (page === 'home' && window.location.hash) {
      const hash = window.location.hash;
      const targetId = hash.replace('#', '');
      
      const scrollToHash = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

      // Slight timeout to ensure components are mounted after page state change
      const timer = setTimeout(scrollToHash, 200);
      return () => clearTimeout(timer);
    }
  }, [page]);

  const navigateToHome = () => {
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
  };

  if (page !== 'home') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Navbar lang={lang} setLang={setLang} setPage={setPage} currentPage={page} />
        <main className="flex-grow">
          <LegalPage type={page as 'privacy' | 'terms'} lang={lang} onBack={navigateToHome} />
        </main>
        <Footer lang={lang} setLang={setLang} setPage={setPage} currentPage={page} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-blue-600/30 selection:text-white">
      <Navbar lang={lang} setLang={setLang} setPage={setPage} currentPage={page} />
      
      <main className="flex-grow">
        <Hero lang={lang} />
        
        <ProblemSection lang={lang} />

        {/* Feature Highlights */}
        <section className="py-24 relative overflow-hidden bg-slate-950">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-8 border border-blue-500/20">
              <Zap className="text-blue-500 h-8 w-8" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight">
              Di Sini <span className="text-blue-500">Source Code 99</span> Bantu Kamu
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

        {/* Final CTA */}
        <section id="cta" className="py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="relative glass p-12 md:p-24 rounded-[3.5rem] overflow-hidden border border-white/10 text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
              
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
                    className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl text-xl font-black transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 active:scale-95"
                  >
                    {t.btn1} <ArrowRight className="h-6 w-6" />
                  </a>
                  <button 
                    onClick={() => {
                      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="w-full sm:w-auto px-10 py-5 glass hover:bg-white/5 text-white rounded-3xl text-xl font-black transition-all flex items-center justify-center gap-3 active:scale-95"
                  >
                    {t.btn2}
                  </button>
                </div>
                <p className="mt-16 text-slate-500 font-bold italic text-sm tracking-wide">
                  {t.footerQuote}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} setLang={setLang} setPage={setPage} currentPage={page} />
    </div>
  );
};

export default App;