
import React from 'react';
import { AlertCircle, FileX, Users, TrendingDown, LayoutPanelLeft } from 'lucide-react';
import { Language, translations } from '../translations';

interface ProblemSectionProps {
  lang: Language;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({ lang }) => {
  const t = translations[lang].problem;
  const problems = [
    { icon: <LayoutPanelLeft className="text-red-400" />, ...t.item1 },
    { icon: <FileX className="text-red-400" />, ...t.item2 },
    { icon: <Users className="text-red-400" />, ...t.item3 },
    { icon: <TrendingDown className="text-red-400" />, ...t.item4 }
  ];

  return (
    <section id="problem" className="py-24 bg-slate-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <h2 className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" /> {t.badge}
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            {t.headline}
          </h3>
          <p className="mt-6 text-xl text-slate-400 leading-relaxed">
            {t.subheadline}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((p, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-slate-800 bg-slate-900/50 hover:border-red-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{p.title}</h4>
              <p className="text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 glass p-10 rounded-[40px] border border-blue-500/20 text-center">
          <p className="text-2xl md:text-3xl font-medium text-slate-300 italic">
            {t.quote}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
