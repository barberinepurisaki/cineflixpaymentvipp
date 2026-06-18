import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Star, Film, Smartphone } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria L., 58 anos',
    text: 'Assino a CineflixPayment há 6 meses. Qualidade 4K, não trava. Melhor que pagar 3 streamings separados.',
    plan: 'Plano Mensal · 2 telas',
  },
  { name: 'Carlos M.', text: 'Catálogo muito completo, tem tudo que eu procurava!', plan: 'Plano Mensal · 1 tela' },
  { name: 'Ana P.', text: 'Cancelei outras plataformas, aqui tem tudo num lugar só.', plan: 'Plano Mensal · 2 telas' },
  { name: 'Lucas R.', text: 'Séries sempre atualizadas, futebol no Premiere sem travar.', plan: 'Plano Mensal · 1 tela' },
];

const SocialProof = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <motion.section 
      className="py-12 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Film, value: '+2.200', label: 'Clientes ativos' },
            { icon: Star, value: '4.8/5', label: 'Avaliação média' },
            { icon: Smartphone, value: '4K', label: 'Ultra HD disponível' },
            { icon: ShieldCheck, value: '24h', label: 'Suporte humano' },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="bg-cinema-panel/50 border border-white/5 rounded-xl p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <stat.icon className="w-5 h-5 text-cinema-red mx-auto mb-2" />
              <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-white/50 text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Rotating testimonial */}
        <div className="bg-cinema-panel/30 border border-white/5 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-red/5 via-transparent to-cinema-red/5" />
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 relative z-10">O que nossos clientes dizem</p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="relative z-10"
            >
              <p className="text-white text-lg md:text-xl mb-3">"{t.text}"</p>
              <p className="text-cinema-red font-bold">{t.name}</p>
              <p className="text-white/40 text-xs">{t.plan}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1.5 mt-4 relative z-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-cinema-red w-6' : 'bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SocialProof;
