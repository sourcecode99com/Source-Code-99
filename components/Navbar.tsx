
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
    if (currentPage !== 'home') {
      e.preventDefault();
      setPage('home');
      // Delay to allow home page to mount before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = href;
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          <button onClick={() => { setPage('home'); window.scrollTo(0, 0); }} className="flex items-center space-x-2 group">
            <img 
              src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/logo-sc99com-panjang.png" 
              alt="Source Code 99" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800/50 rounded-full p-1 border border-slate-700">
              <button 
                onClick={() => setLang('ID')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ID' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ID
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                ENG
              </button>
            </div>

            <a 
              href="#cta" 
              onClick={(e) => handleLinkClick(e, '#cta')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              {t.konsultasi} <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              className="text-slate-400 flex items-center gap-1 text-xs font-bold border border-slate-800 rounded-full px-3 py-1"
              onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
            >
              <Globe className="h-3 w-3" /> {lang}
            </button>
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass animate-in fade-in slide-in-from-top-4 border-t border-slate-800 shadow-2xl">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-slate-300" 
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#cta" 
              className="w-full py-4 bg-blue-600 text-white rounded-xl text-center font-bold"
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
