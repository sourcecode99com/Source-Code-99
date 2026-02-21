
import React from 'react';
import { ArrowRight, CheckCircle2, Monitor, Smartphone } from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8">
              {t.headline} <br /> 
              <span className="gradient-text">{t.headlineGradient}</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a href="#cta" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-lg font-bold transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 flex items-center justify-center gap-3">
                {t.ctaPrimary} <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/5 text-white rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3">
                {t.ctaSecondary}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <span>{t.check1}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <span>{t.check2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                <span>{t.check3}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative glass rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/pitch-financial%20projection-sourcecode99com.jpg" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-10 -right-8 glass p-4 rounded-2xl animate-bounce shadow-xl hidden sm:block">
                  <Monitor className="text-blue-500 mb-2" />
                  <div className="h-2 w-12 bg-slate-700 rounded mb-1"></div>
                  <div className="h-2 w-8 bg-slate-800 rounded"></div>
                </div>
                
                <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl shadow-xl hidden sm:block">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Smartphone className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">User Growth</div>
                      <div className="text-lg font-bold text-white">+125%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
