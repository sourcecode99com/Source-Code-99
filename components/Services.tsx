
import React from 'react';
import { Layout, Database, Smartphone, BarChart3, CheckCircle2 } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { Language, translations } from '../translations';

interface ServicesProps {
  lang: Language;
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = translations[lang].services;
  const services = [
    {
      id: 'web',
      icon: <Layout className="h-8 w-8 text-blue-500" />,
      ...t.web,
      color: "blue"
    },
    {
      id: 'app',
      icon: <Database className="h-8 w-8 text-purple-500" />,
      ...t.app,
      color: "purple"
    },
    {
      id: 'mobile',
      icon: <Smartphone className="h-8 w-8 text-cyan-500" />,
      ...t.mobile,
      color: "cyan"
    },
    {
      id: 'financial',
      icon: <BarChart3 className="h-8 w-8 text-emerald-500" />,
      ...t.financial,
      color: "emerald"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${
                s.color === 'blue' ? 'from-blue-600' : 
                s.color === 'purple' ? 'from-purple-600' : 
                s.color === 'cyan' ? 'from-cyan-600' : 
                'from-emerald-600'
              } to-slate-900 rounded-[32px] blur opacity-10 group-hover:opacity-100 transition duration-500`}></div>
              <div className="relative h-full bg-slate-950 p-8 rounded-[32px] border border-slate-800 transition-all duration-500 group-hover:-translate-y-2 flex flex-col">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  s.color === 'blue' ? 'bg-blue-500/10' : 
                  s.color === 'purple' ? 'bg-purple-500/10' : 
                  s.color === 'cyan' ? 'bg-cyan-500/10' : 
                  'bg-emerald-500/10'
                }`}>
                  {s.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{s.title}</h4>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${
                  s.color === 'blue' ? 'text-blue-400' : 
                  s.color === 'purple' ? 'text-purple-400' : 
                  s.color === 'cyan' ? 'text-cyan-400' : 
                  'text-emerald-400'
                }`}>{s.tagline}</p>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">{s.desc}</p>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-xs">
                      <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${
                        s.color === 'blue' ? 'text-blue-500' : 
                        s.color === 'purple' ? 'text-purple-500' : 
                        s.color === 'cyan' ? 'text-cyan-500' : 
                        'text-emerald-500'
                      }`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {s.footer && (
                  <p className="text-xs text-slate-500 italic mb-6 border-t border-slate-800 pt-4">
                    {s.footer}
                  </p>
                )}

                <HashLink 
                  smooth 
                  to={`/services#${s.id}`}
                  className="w-full py-3 glass text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-colors text-center"
                >
                  {t.cta}
                </HashLink>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-400 italic text-lg">
            "{t.closing}"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
