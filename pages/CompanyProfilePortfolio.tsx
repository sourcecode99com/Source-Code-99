import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Layout, Search, Smartphone, MessageSquare, Globe, TrendingUp, BarChart3 } from 'lucide-react';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';

interface CompanyProfilePortfolioProps {
  lang: Language;
}

const CompanyProfilePortfolio: React.FC<CompanyProfilePortfolioProps> = ({ lang }) => {
  const t = translations[lang].portfolioCompanyProfile;

  const images = {
    hero: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/homepage-company%20profile-sourcecode99com.jpg',
    homepage: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/homepage-company%20profile-sourcecode99com.jpg',
    traffic: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/Traffic-company%20profile-sourcecode99com.jpg',
    seo: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/SEO-growth-company%20profile-sourcecode99com.jpg'
  };

  const icons = [Layout, Globe, Search, Smartphone, MessageSquare];

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content="website company profile, jasa pembuatan website company profile, website perusahaan profesional, company profile online, website bisnis UMKM" />
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
                Portfolio: Company Profile
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                {t.hero.h1}
              </h1>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <h2 className="text-white font-bold text-xl">{t.hero.overview}</h2>
                <p>{t.hero.desc1}</p>
                <p>{t.hero.desc2}</p>
                <p className="text-blue-400 font-medium italic">{t.hero.footer}</p>
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
                  src={images.hero} 
                  alt="Company Profile Mockup" 
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500">🎯</span>
              {t.goals.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {t.goals.items.map((item, idx) => (
                <div key={idx} className="p-6 glass rounded-2xl border-white/5 text-left flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 font-medium italic">{t.goals.footer}</p>
          </motion.div>
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
                <img src={images.homepage} alt="Homepage Design" className="w-full h-auto" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl overflow-hidden border-white/10"
              >
                <img src={images.traffic} alt="Traffic Analytics" className="w-full h-auto" referrerPolicy="no-referrer" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl overflow-hidden border-white/10"
              >
                <img src={images.seo} alt="SEO Growth" className="w-full h-auto" referrerPolicy="no-referrer" />
              </motion.div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center py-20 border-t border-white/5">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8">{t.impact.title}</h2>
              <p className="text-slate-300 mb-8 font-semibold">{t.impact.subtitle}</p>
              <ul className="space-y-5 mb-10">
                {t.impact.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="p-6 bg-blue-600/10 border-l-4 border-blue-600 text-blue-400 font-bold rounded-r-2xl italic">
                {t.impact.footer}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                <img src={images.seo} alt="Business Impact" className="w-full h-auto" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 bg-slate-900/30 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">{t.why.title}</h2>
          <p className="text-slate-400 mb-12 text-lg">{t.why.subtitle}</p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12 text-left">
            {t.why.benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 glass rounded-2xl border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 font-medium">{t.why.footer}</p>
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
                href="https://wa.me/6285123876559?text=Halo%20Sourcode99.com%20saya%20ingin%20berdiskusi%20tentang%20Website%20Company%20Profile" 
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

export default CompanyProfilePortfolio;
