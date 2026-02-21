import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import { Language, translations } from '../translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const id = href.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: t.solusi, href: '#problem' },
    { name: t.layanan, href: '#services' },
    { name: t.portfolio, href: '#portfolio' },
    { name: t.kenapa, href: '#why-us' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-2xl' : 'py-6 bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group" onClick={() => window.scrollTo(0, 0)}>
          <img 
            src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/lgo-sc99-panjang.png" 
            alt="Source Code 99" 
            className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.name} to={link.href} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                {link.name}
              </Link>
            ) : (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            )
          ))}
          
          <div className="flex items-center bg-slate-800/40 rounded-full p-1 border border-slate-700/50">
            <button onClick={() => setLang('ID')} className={`px-3 py-1 rounded-full text-[10px] font-black ${lang === 'ID' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>ID</button>
            <button onClick={() => setLang('EN')} className={`px-3 py-1 rounded-full text-[10px] font-black ${lang === 'EN' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>ENG</button>
          </div>

          <Link to="/#cta" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-black flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
            {t.konsultasi} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass border-t border-slate-800 shadow-2xl p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => {
                if(link.href.startsWith('/')) navigate(link.href);
                else handleNavClick(link.href);
                setIsMenuOpen(false);
              }}
              className="text-left text-lg font-bold text-slate-200"
            >
              {link.name}
            </button>
          ))}
          <Link to="/#cta" className="w-full py-4 bg-blue-600 text-white rounded-2xl text-center font-black" onClick={() => setIsMenuOpen(false)}>
            {t.konsultasi}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;