import React from 'react';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
  setPage: (page: 'home' | 'privacy' | 'terms') => void;
  currentPage: string;
}

const Footer: React.FC<FooterProps> = ({ lang, setLang, setPage, currentPage }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      window.location.hash = href;
      setPage('home');
    } else {
      const targetId = href.replace('#', '');
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
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-slate-950 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-8">
              <button 
                onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="block transform hover:scale-105 transition-transform focus:outline-none"
              >
                <img 
                  src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/lgo-sc99-panjang.png" 
                  alt="Source Code 99" 
                  className="h-10 w-auto object-contain"
                />
              </button>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-xs text-sm">
              {t.desc}
            </p>
            <div className="flex gap-4 mb-8">
              <a 
                href="https://www.instagram.com/sourcecode99com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 glass rounded-2xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all hover:scale-110 active:scale-95"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Language Toggle in Footer */}
            <div className="inline-flex items-center bg-slate-900 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setLang('ID')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === 'ID' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ID
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">{t.services}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500 transition-colors">Website Professional</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500 transition-colors">Web Application</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500 transition-colors">Mobile Apps</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500 transition-colors">Custom System</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500 transition-colors">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">{t.company}</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')} className="hover:text-blue-500 transition-colors">{nav.kenapa}</a></li>
              <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className="hover:text-blue-500 transition-colors">{nav.portfolio}</a></li>
              <li><button onClick={() => { setPage('privacy'); window.scrollTo(0, 0); }} className="hover:text-blue-500 text-left transition-colors font-medium">Kebijakan Privasi</button></li>
              <li><button onClick={() => { setPage('terms'); window.scrollTo(0, 0); }} className="hover:text-blue-500 text-left transition-colors font-medium">Syarat & Ketentuan</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact Us</h4>
            <ul className="space-y-5 text-slate-400 text-sm">
              <li className="flex items-start gap-4 group">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
                </div>
                <span className="leading-tight group-hover:text-slate-200 transition-colors">❤️ Yogyakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                </div>
                <a href="mailto:halo@sourcecode99.com" className="hover:text-white transition-colors group-hover:text-slate-200">halo@sourcecode99.com</a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                </div>
                <a 
                  href="https://wa.me/6285123876559?text=Halo%20Sourcecode99.com%20Saya%20ingin%20berdiskusi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors group-hover:text-slate-200 font-bold"
                >
                  WhatsApp 62 8512 3876 559
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] uppercase font-black tracking-widest text-center">
          <p>© 2026 Source Code 99. Digital Agency Partner.</p>
          <div className="flex gap-8">
            <button onClick={() => { setPage('privacy'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => { setPage('terms'); window.scrollTo(0, 0); }} className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;