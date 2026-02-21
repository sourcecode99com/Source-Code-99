import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Layout, Database, Smartphone, CheckCircle2, BarChart3, ArrowRight, Target, Users, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { Language, translations } from '../translations';

interface ServicesPageProps {
  lang: Language;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ lang }) => {
  const t = translations[lang].servicesDetail;
  const common = translations[lang].services;

  const services = [
    {
      id: 'web',
      content: t.web,
      icon: <Layout className="h-10 w-10 text-blue-500" />,
      image: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/homepage-company%20profile-sourcecode99com.jpg',
      color: 'blue'
    },
    {
      id: 'app',
      content: t.app,
      icon: <Database className="h-10 w-10 text-purple-500" />,
      image: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/admin-dashboard-ecommerce-sourcecode99com.jpg',
      color: 'purple'
    },
    {
      id: 'mobile',
      content: t.mobile,
      icon: <Smartphone className="h-10 w-10 text-cyan-500" />,
      image: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/mobile-delivery%20apps-sourcecode99com.jpg',
      color: 'cyan'
    },
    {
      id: 'financial',
      content: t.financial,
      icon: <BarChart3 className="h-10 w-10 text-emerald-500" />,
      image: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/pitch-financial%20projection-sourcecode99com.jpg',
      color: 'emerald'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-slate-950">
      <Helmet>
        <title>{lang === 'ID' ? 'Layanan Detail - Website, Aplikasi & Strategi' : 'Detailed Services - Web, Apps & Strategy'} | Source Code 99</title>
        <meta name="description" content="Pelajari detail layanan kami: Jasa pembuatan website profesional, aplikasi web custom, mobile apps Android/iOS, serta feasibility study untuk startup." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              {lang === 'ID' ? 'Solusi ' : 'Digital '} <span className="gradient-text">{lang === 'ID' ? 'Digital' : 'Solutions'}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl">
              {common.subheadline}
            </p>
          </motion.div>
        </header>

        <div className="space-y-40">
          {services.map((s, idx) => (
            <section key={s.id} id={s.id} className="scroll-mt-32">
              <div className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-start mb-20`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex-1"
                >
                  <div className={`inline-flex p-4 rounded-2xl mb-8 border ${
                    s.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' :
                    s.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20' :
                    s.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20' :
                    'bg-emerald-500/10 border-emerald-500/20'
                  }`}>
                    {s.icon}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">{(s.content as any).h1}</h2>
                  
                  {/* Why Section */}
                  <div className="mb-12">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Target className="text-blue-500" size={20} />
                      {(s.content as any).why.title}
                    </h3>
                    <div className="space-y-4 text-slate-400 text-lg">
                      {(s.content as any).why.desc1 && <p>{(s.content as any).why.desc1}</p>}
                      {(s.content as any).why.desc2 && <p>{(s.content as any).why.desc2}</p>}
                      {(s.content as any).why.desc && <p>{(s.content as any).why.desc}</p>}
                    </div>
                    {(s.content as any).why.footer && (
                      <p className="mt-6 p-4 glass rounded-xl border-l-4 border-blue-500 text-slate-300 italic">
                        {(s.content as any).why.footer}
                      </p>
                    )}
                  </div>

                  {/* What Section */}
                  {(s.content as any)?.what && (
                    <div className="mb-12">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Zap className="text-yellow-500" size={20} />
                        {(s.content as any).what.title}
                      </h3>
                      {(s.content as any).what.desc && <p className="text-slate-400 mb-6">{(s.content as any).what.desc}</p>}
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(s.content as any).what.items?.map((item: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-slate-300">
                            <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {(s.content as any).what.footer && (
                        <p className="mt-6 text-slate-500 font-medium">{(s.content as any).what.footer}</p>
                      )}
                    </div>
                  )}
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-1 w-full"
                >
                  <div className="relative glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                    <img 
                      src={s.image} 
                      alt={(s.content as any)?.h1} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                  </div>
                </motion.div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Features */}
                {(s.content as any)?.features && (
                  <div className="p-8 glass rounded-3xl border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <ShieldCheck className="text-emerald-500" size={20} />
                      {(s.content as any).features.title}
                    </h3>
                    <ul className="space-y-4">
                      {(s.content as any).features.items?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Case Study */}
                {(s.content as any)?.caseStudy && (
                  <div className="lg:col-span-2 p-8 glass rounded-3xl border-white/5 bg-blue-600/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <TrendingUp className="text-blue-500" size={20} />
                      {(s.content as any).caseStudy.title}
                    </h3>
                    <p className="text-slate-300 mb-6 font-medium">{(s.content as any).caseStudy.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-red-400">Sebelumnya:</p>
                        <ul className="space-y-2">
                          {(s.content as any).caseStudy.before?.map((item: string, i: number) => (
                            <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                              <span className="text-red-500">•</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">Setelahnya:</p>
                        <ul className="space-y-2">
                          {(s.content as any).caseStudy.after?.map((item: string, i: number) => (
                            <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <p className="mt-8 text-slate-500 text-sm italic border-t border-white/5 pt-4">
                      {(s.content as any).caseStudy.footer}
                    </p>
                  </div>
                )}

                {/* Who is it for */}
                {(s.content as any)?.who && (
                  <div className="p-8 glass rounded-3xl border-white/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Users className="text-purple-500" size={20} />
                      {(s.content as any).who.title}
                    </h3>
                    <ul className="space-y-4">
                      {(s.content as any).who.items?.map((item: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Card */}
                {(s.content as any)?.cta && (
                  <div className="lg:col-span-2 p-10 glass rounded-[2.5rem] border-blue-600/20 bg-blue-600/5 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left max-w-md">
                      <h3 className="text-3xl font-black text-white mb-4 leading-tight">{(s.content as any).cta.title}</h3>
                      <p className="text-slate-400 text-base">{lang === 'ID' ? 'Konsultasikan sekarang untuk hasil terbaik.' : 'Consult now for the best results.'}</p>
                    </div>
                    <div className="shrink-0">
                      <a 
                        href="https://wa.me/6285123876559?text=Halo%20Sourcode99.com%20saya%20ingin%20berdiskusi%20tentang%20layanan" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
                      >
                        {(s.content as any).cta.btn1} <ArrowRight size={20} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Final CTA */}
        <section className="mt-40 text-center py-20 glass rounded-[3rem] border-white/5 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full"></div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">
            {lang === 'ID' ? 'Siap Bertransformasi?' : 'Ready to Transform?'}
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10 italic">
            "{common.closing}"
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <a 
              href="https://wa.me/6285123876559?text=Halo%20Sourcode99.com%20saya%20ingin%20mulai%20proyek" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg transition-all shadow-2xl shadow-blue-600/40"
            >
              {lang === 'ID' ? 'Mulai Sekarang' : 'Get Started Now'}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
