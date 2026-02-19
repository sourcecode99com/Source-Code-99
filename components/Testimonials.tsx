
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Language, translations } from '../translations';

interface TestimonialsProps {
  lang: Language;
}

const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const t = translations[lang].testimonials;
  const testimonials = [
    {
      name: "Andi Wijaya",
      role: "Founder Kopi Lokal",
      content: lang === 'ID' 
        ? "Website saya sekarang jauh lebih keren dan loadingnya cepet banget. Pelanggan jadi lebih percaya pas mau order." 
        : "My website is now much cooler and loads very fast. Customers trust us more when ordering.",
      image: "https://picsum.photos/id/64/100/100"
    },
    {
      name: "Siska Putri",
      role: "Owner Fashionista",
      content: lang === 'ID'
        ? "Source Code 99 bantu buatin sistem inventory yang simpel banget. Nggak pusing lagi rekap stok di buku manual."
        : "Source Code 99 helped build a very simple inventory system. No more headache managing stock in manual books.",
      image: "https://picsum.photos/id/65/100/100"
    },
    {
      name: "Budi Santoso",
      role: "CEO Tech Startup",
      content: lang === 'ID'
        ? "Aplikasi mobile kami dapet feedback positif dari user. UI-nya modern dan UX-nya fluid banget. Top!"
        : "Our mobile app received positive feedback from users. Modern UI and very fluid UX. Top notch!",
      image: "https://picsum.photos/id/66/100/100"
    }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-bold tracking-wider uppercase text-sm mb-4">{t.badge}</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">{t.headline}</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-8 glass rounded-[40px] relative">
              <Quote className="absolute top-8 right-8 text-blue-500/10 h-16 w-16" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-slate-300 mb-8 italic leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full border-2 border-blue-500" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
