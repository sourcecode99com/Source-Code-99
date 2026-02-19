
import React from 'react';
import { Layout, Database, Smartphone, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../translations';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = translations[lang].services;
  const services = [
    {
      icon: <Layout className="h-8 w-8 text-blue-500" />,
      ...t.web,
      color: "blue"
    },
    {
      icon: <Database className="h-8 w-8 text-purple-500" />,
      ...t.app,
      color: "purple"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-cyan-500" />,
      ...t.mobile,
      color: "cyan"
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4">{t.badge}</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6">{t.headline}</h3>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">{t.subheadline}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${s.color === 'blue' ? 'from-blue-600' : s.color === 'purple' ? 'from-purple-600' : 'from-cyan-600'} to-slate-900 rounded-[32px] blur opacity-10 group-hover:opacity-100 transition duration-500`}></div>
              <div className="relative h-full bg-slate-950 p-10 rounded-[32px] border border-slate-800 transition-all duration-500 group-hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${s.color === 'blue' ? 'bg-blue-500/10' : s.color === 'purple' ? 'bg-purple-500/10' : 'bg-cyan-500/10'}`}>
                  {s.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">{s.title}</h4>
                <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${s.color === 'blue' ? 'text-blue-400' : s.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'}`}>{s.tagline}</p>
                <p className="text-slate-400 mb-8 leading-relaxed">{s.desc}</p>
                
                <ul className="space-y-4 mb-10">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className={`h-5 w-5 ${s.color === 'blue' ? 'text-blue-500' : s.color === 'purple' ? 'text-purple-500' : 'text-cyan-500'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
                  {t.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
