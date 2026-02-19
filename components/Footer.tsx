
import React from 'react';
import { Instagram, Mail, MapPin, Phone, Globe } from 'lucide-react';
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
    if (currentPage !== 'home') {
      e.preventDefault();
      setPage('home');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = href;
        }
      }, 100);
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <button onClick={() => { setPage('home'); window.scrollTo(0, 0); }} className="block">
                <img 
                  src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/logo-sc99com-panjang.png" 
                  alt="Source Code 99" 
                  className="h-10 w-auto object-contain"
                />
              </button>
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {t.desc}
            </p>
            <div className="flex gap-4 mb-8">
              <a href="https://www.instagram.com/sourcecode99com/" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Language Toggle in Footer */}
            <div className="inline-flex items-center bg-slate-900 rounded-full p-1 border border-slate-800">
              <button 
                onClick={() => setLang('ID')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${lang === 'ID' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ID
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${lang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.services}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500">Website Professional</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500">Web Application</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500">Mobile Apps</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500">Custom System</a></li>
              <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-blue-500">UI/UX Design</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.company}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')} className="hover:text-blue-500">{nav.kenapa}</a></li>
              <li><a href="#portfolio" onClick={(e) => handleLinkClick(e, '#portfolio')} className="hover:text-blue-500">{nav.portfolio}</a></li>
              <li><button onClick={() => setPage('privacy')} className="hover:text-blue-500 text-left">{t.privacy}</button></li>
              <li><button onClick={() => setPage('terms')} className="hover:text-blue-500 text-left">{t.terms}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.contact}</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span>❤️ Yogyakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <a href="mailto:halo@sourcecode99.com" className="hover:text-white">halo@sourcecode99.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                <a href="https://wa.me/6285123876559?text=Halo%20Sourcecode99.com%20Saya%20ingin%20berdiskusi" target="_blank" rel="noopener noreferrer" className="hover:text-white text-sm">
                  WhatsApp Diskusi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm text-center">
          <p>© 2026 Source Code 99. All rights reserved.</p>
          <div className="flex gap-8">
            <button onClick={() => setPage('privacy')} className="hover:text-white">{t.privacy}</button>
            <button onClick={() => setPage('terms')} className="hover:text-white">{t.terms}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
