import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Language, translations } from '../translations';

interface FooterProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

const Footer: React.FC<FooterProps> = ({ lang, setLang }) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <footer className="pt-24 pb-12 bg-slate-950 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="block mb-8 hover:scale-105 transition-transform" onClick={() => window.scrollTo(0, 0)}>
              <img 
                src="https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/lgo-sc99-panjang.png" 
                alt="Source Code 99" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 mb-8 leading-relaxed text-sm">{t.desc}</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sourcecode99com/" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-2xl text-slate-400 hover:text-white hover:bg-blue-600 transition-all"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">{t.services}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><HashLink smooth to="/services#web" className="hover:text-blue-500">{t.serviceItems.web}</HashLink></li>
              <li><HashLink smooth to="/services#app" className="hover:text-blue-500">{t.serviceItems.app}</HashLink></li>
              <li><HashLink smooth to="/services#mobile" className="hover:text-blue-500">{t.serviceItems.mobile}</HashLink></li>
              <li><HashLink smooth to="/services#financial" className="hover:text-blue-500">{t.serviceItems.financial}</HashLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">{t.navigation}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><HashLink smooth to="/#problem" className="hover:text-blue-500">{nav.solusi}</HashLink></li>
              <li><HashLink smooth to="/services" className="hover:text-blue-500">{nav.layanan}</HashLink></li>
              <li><HashLink smooth to="/#portfolio" className="hover:text-blue-500">{nav.portfolio}</HashLink></li>
              <li><HashLink smooth to="/#why-us" className="hover:text-blue-500">{nav.kenapa}</HashLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact</h3>
            <ul className="space-y-5 text-slate-400 text-sm">
              <li className="flex items-center gap-4"><MapPin size={16} className="text-blue-500" /> ❤️ Yogyakarta, ID</li>
              <li className="flex items-center gap-4">
                <Mail size={16} className="text-blue-500" /> 
                <a href="mailto:halo@sourcecode99.com" className="hover:text-blue-500 transition-colors">halo@sourcecode99.com</a>
              </li>
              <li className="flex items-center gap-4 font-bold text-white">
                <Phone size={16} className="text-blue-500" /> 
                <a href="https://wa.me/6285123876559?text=Halo%20Sourcode99.com%20saya%20ingin%20berdiskusi" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Whatsapp</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] uppercase font-black tracking-widest">
          <p>© 2026 Source Code 99. Digital Agency.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;