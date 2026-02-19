
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language, translations } from '../translations';

interface PortfolioProps {
  lang: Language;
}

const Portfolio: React.FC<PortfolioProps> = ({ lang }) => {
  const t = translations[lang].portfolio;
  const items = [
    { title: "E-Commerce Local Brand", category: "Web Development", img: "https://picsum.photos/id/1/600/400" },
    { title: "Sistem Booking Klinik", category: "Custom Web App", img: "https://picsum.photos/id/2/600/400" },
    { title: "Startup Delivery App", category: "Mobile App", img: "https://picsum.photos/id/3/600/400" },
    { title: "Dashboard Manajemen Gudang", category: "System Solution", img: "https://picsum.photos/id/4/600/400" },
    { title: "Company Profile High-End", category: "Web Development", img: "https://picsum.photos/id/5/600/400" },
    { title: "Financial Tracker Pro", category: "Mobile App", img: "https://picsum.photos/id/6/600/400" },
  ];

  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4">{t.badge}</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">{t.headline}</h3>
          </div>
          <button className="px-6 py-3 border-b-2 border-blue-500 text-blue-500 font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all">
            {t.cta} <ExternalLink className="h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">{item.category}</span>
                <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                <div className="h-0.5 w-12 bg-blue-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
