
import React from 'react';
import { Zap, MessageCircle, PiggyBank, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Language, translations } from '../translations';

interface WhyUsProps {
  lang: Language;
}

const WhyUs: React.FC<WhyUsProps> = ({ lang }) => {
  const t = translations[lang].why;
  const values = [
    { icon: <Zap className="text-blue-500" />, ...t.item1 },
    { icon: <ShieldCheck className="text-blue-500" />, ...t.item2 },
    { icon: <PiggyBank className="text-blue-500" />, ...t.item3 },
    { icon: <MessageCircle className="text-blue-500" />, ...t.item4 },
    { icon: <HeartHandshake className="text-blue-500" />, ...t.item5 }
  ];

  return (
    <section id="why-us" className="py-24 bg-mesh">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4">{t.badge}</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
              {t.headline} <br /> <span className="gradient-text">{t.headlineGradient}</span>
            </h3>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              {t.subheadline}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 glass rounded-[32px]">
                <div className="text-3xl font-black text-blue-500">100+</div>
                <div className="text-slate-400">{t.stats1}</div>
              </div>
              <div className="flex items-center gap-6 p-6 glass rounded-[32px]">
                <div className="text-3xl font-black text-purple-500">99%</div>
                <div className="text-slate-400">{t.stats2}</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className={`p-8 rounded-[40px] glass transition-transform hover:-translate-y-2 ${idx === 0 ? 'sm:col-span-2 bg-gradient-to-br from-blue-600/10 to-transparent' : ''}`}>
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{v.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
