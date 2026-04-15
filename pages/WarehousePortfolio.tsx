import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, BarChart3, Scan, Boxes, Users, Database, ShieldCheck, Cpu, Layout } from 'lucide-react';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';

interface WarehousePortfolioProps {
  lang: Language;
}

const WarehousePortfolio: React.FC<WarehousePortfolioProps> = ({ lang }) => {
  const t = translations[lang].portfolioWarehouse;

  const images = {
    dashboard: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/dashboard-warehouse%20management%20system-sourcecode99com.jpg',
    mobile: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/barcode%20mobile-warehouse%20management%20system-sourcecode99com.jpg',
    admin: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/admin-warehouse%20management%20system-sourcecode99com.jpg'
  };

  const icons = [Boxes, BarChart3, Scan, Layout, Users];

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content="warehouse management system, sistem manajemen gudang, jasa pembuatan WMS, aplikasi stok gudang, software inventory gudang" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
                Portfolio: Warehouse Management System
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                {t.hero.h1}
              </h1>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <h2 className="text-white font-bold text-xl">{t.hero.overview}</h2>
                <p>{t.hero.desc1}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {t.hero.challenges.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-500 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-blue-400 font-medium italic mt-6">{t.hero.footer}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full opacity-30"></div>
              <div className="relative glass rounded-3xl overflow-hidden border-white/10 shadow-2xl shadow-blue-600/10">
                <img 
                  src={images.dashboard} 
                  alt="WMS Dashboard Mockup" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500">🎯</span>
                {t.goals.title}
              </h3>
              <p className="text-slate-300 mb-8 font-semibold">{t.goals.subtitle}</p>
              <div className="space-y-4">
                {t.goals.problems.map((item, idx) => (
                  <div key={idx} className="p-5 glass rounded-2xl border-white/5 flex items-start gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span className="text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                <img src={images.admin} alt="Admin Interface" className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t.solutions.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.solutions.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="col-span-2 glass rounded-2xl overflow-hidden border-white/10"
              >
                <img src={images.dashboard} alt="WMS Dashboard" className="w-full h-auto" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-2 glass rounded-2xl overflow-hidden border-white/10"
              >
                <img src={images.mobile} alt="Mobile Barcode Scanning" className="w-full h-auto" referrerPolicy="no-referrer" />
              </motion.div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              {t.solutions.items.map((item, idx) => {
                const Icon = icons[idx] || CheckCircle2;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Impact Section */}
          <div className="py-24 border-t border-white/5">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">{t.impact.title}</h2>
              <p className="text-slate-400 text-lg">{t.impact.subtitle}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
              {t.impact.stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 glass rounded-3xl border-white/5 text-center flex flex-col items-center justify-center gap-4 group hover:bg-blue-600/5 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <BarChart3 size={24} />
                  </div>
                  <span className="text-white font-bold text-sm leading-tight">{stat}</span>
                </motion.div>
              ))}
            </div>
            
            <p className="max-w-3xl mx-auto p-6 bg-blue-600/10 border-l-4 border-blue-600 text-blue-400 font-bold rounded-r-2xl italic text-center">
              {t.impact.footer}
            </p>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 bg-slate-900/30 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">{t.why.title}</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">{t.why.subtitle}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {t.why.benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 glass rounded-2xl border-white/5 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-white font-bold">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-10 glass rounded-[2.5rem] border-white/5">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Cpu className="text-blue-500" />
              {t.why.tech.title}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {t.why.tech.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-slate-300">
                  <ShieldCheck className="text-blue-500 shrink-0" size={20} />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-center font-medium border-t border-white/5 pt-8">{t.why.footer}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 glass rounded-[3rem] border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10">
              {t.cta.title}
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto relative z-10">
              {t.cta.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <a 
                href="https://wa.me/6285123876559?text=Halo%20Sourcode99.com%20saya%20ingin%20berdiskusi%20tentang%20Warehouse%20Management%20System" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-lg transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-3"
              >
                {t.cta.btn1} <ArrowRight size={20} />
              </a>
              <Link 
                to="/#cta"
                className="px-10 py-5 glass hover:bg-white/10 text-white rounded-full font-black text-lg transition-all border-white/10 flex items-center justify-center gap-3"
              >
                {t.cta.btn2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WarehousePortfolio;
