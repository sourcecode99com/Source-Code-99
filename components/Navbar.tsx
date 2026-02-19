import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  setPage: (page: 'home' | 'privacy' | 'terms') => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, setPage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.solusi, href: '#problem' },
    { name: t.layanan, href: '#services' },
    { name: t.portfolio, href: '#portfolio' },
    { name: t.kenapa, href: '#why-us' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (currentPage !== 'home') {
      // Store the target hash and navigate to home
      window.location.hash = href;
      setPage('home');
    } else {
      // Manual smooth scroll for local anchors
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100; // Account for sticky header
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-2xl' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <img 
              src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/lgo-sc99-panjang.png" 
              alt="Source Code 99" 
              className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800/40 rounded-full p-1 border border-slate-700/50 backdrop-blur-sm">
              <button 
                onClick={() => setLang('ID')}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'ID' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}
              >
                ID
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${lang === 'EN' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>

            <a 
              href="#cta" 
              onClick={(e) => handleLinkClick(e, '#cta')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-black flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.konsultasi} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button 
              className="text-slate-400 flex items-center gap-1 text-[10px] font-black border border-slate-800 rounded-full px-3 py-1.5 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
            >
              <Globe className="h-3 w-3" /> {lang}
            </button>
            <button className="text-white p-2 rounded-xl hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass animate-in fade-in slide-in-from-top-4 border-t border-slate-800 shadow-2xl overflow-hidden rounded-b-[2rem] mx-4 mt-3 z-50">
          <div className="flex flex-col p-6 space-y-5">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-bold text-slate-200 active:text-blue-500 py-1" 
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#cta" 
              className="w-full py-4 bg-blue-600 text-white rounded-2xl text-center font-black shadow-xl shadow-blue-900/20 active:scale-[0.98] transition-transform"
              onClick={(e) => handleLinkClick(e, '#cta')}
            >
              {t.konsultasi}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;