import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Smartphone, MapPin, Layout, CreditCard, Cpu, ShieldCheck, Bell } from 'lucide-react';
import { Language, translations } from '../translations';
import { Link } from 'react-router-dom';

interface DeliveryPortfolioProps {
  lang: Language;
}

const DeliveryPortfolio: React.FC<DeliveryPortfolioProps> = ({ lang }) => {
  const t = translations[lang].portfolioDelivery;

  const images = {
    customer: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/mobile-delivery%20apps-sourcecode99com.jpg',
    driver: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/gps%20mobile-delivery%20apps-sourcecode99com.jpg',
    dashboard: 'https://f4emyvqrnyc7uxog.public.blob.vercel-storage.com/web-sc99com/admin%20dashboard-delivery%20apps-sourcecode99com.jpg'
  };

  return (
    <div className="pt-24 pb-20 bg-slate-950">
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.description} />
        <meta name="keywords" content="aplikasi delivery startup, jasa pembuatan aplikasi delivery, aplikasi pengantaran makanan, sistem delivery berbasis aplikasi, mobile app development untuk startup" />
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
                Portfolio: Delivery App
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
              <div className="relative grid grid-cols-2 gap-4">
                <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                  <img src={images.customer} alt="Customer App" className="w-full h-auto" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-4">
                  <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                    <img src={images.driver} alt="Driver App" className="w-full h-auto" referrerPolicy="no-referrer" />
                  </div>
                  <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                    <img src={images.dashboard} alt="Admin Dashboard" className="w-full h-auto" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-12 flex items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500">🎯</span>
              {t.goals.title}
            </h3>
            <p className="text-slate-300 mb-8 font-semibold">{t.goals.subtitle}</p>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {t.goals.items.map((item, idx) => (
                <div key={idx} className="p-6 glass rounded-2xl border-white/5 text-left flex items-start gap-4">
                  <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={20} />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { data: t.solutions.customer, icon: Smartphone, color: 'blue' },
              { data: t.solutions.driver, icon: MapPin, color: 'green' },
              { data: t.solutions.admin, icon: Layout, color: 'purple' },
              { data: t.solutions.payment, icon: CreditCard, color: 'amber' }
            ].map((box, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 glass rounded-3xl border-white/5 hover:border-white/10 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${box.color}-600/10 border border-${box.color}-600/20 flex items-center justify-center text-${box.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                  <box.icon size={28} />
                </div>
                <h4 className="text-white font-bold text-xl mb-6">{box.data.title}</h4>
                <ul className="space-y-3">
                  {box.data.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <div className={`mt-1.5 w-1 h-1 rounded-full bg-${box.color}-500 shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
                <img src={images.dashboard} alt="Business Impact" className="w-full h-auto" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 bg-slate-900/30 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8">{t.why.title}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{t.why.subtitle}</p>
          </div>
          
          <div className="p-10 glass rounded-[2.5rem] border-white/5">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <Cpu className="text-blue-500" />
              {t.why.tech.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {t.why.tech.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-slate-300">
                  <ShieldCheck className="text-blue-500 shrink-0" size={20} />
                  {item}
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
                href="https://wa.me/6285123876559?text=Halo%20Sourcode99.com%20saya%20ingin%20berdiskusi%20tentang%20Aplikasi%20Delivery" 
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

export default DeliveryPortfolio;
