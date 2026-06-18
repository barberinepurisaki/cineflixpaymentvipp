import { motion } from 'framer-motion';
import { ShieldCheck, Star, Play } from 'lucide-react';

const differentials = [
  { icon: '🎬', title: 'Filmes e Séries 4K', desc: 'Catálogo completo e lançamentos' },
  { icon: '⚽', title: 'Futebol ao Vivo', desc: 'Premiere, ESPN, Sportv' },
  { icon: '📺', title: 'Canais Fechados', desc: 'Disney+, Max, Paramount+' },
  { icon: '📱', title: 'Suporte 24h', desc: 'Resolvemos qualquer B.O. na hora' },
  { icon: '💰', title: 'Preço Justo', desc: 'R$ 29,90/mês (menos que um streaming)' },
];

const ConversionHero = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      aria-label="Oferta principal"
      className="relative px-4 pt-6 pb-10 md:pt-10 md:pb-14 bg-gradient-to-b from-black via-cinema-dark to-cinema-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Badge topo */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cinema-red/15 border border-cinema-red/40 mb-4">
            <span className="w-2 h-2 rounded-full bg-cinema-red animate-pulse" />
            <span className="text-[11px] font-bold text-cinema-red tracking-wider uppercase">
              Oferta ativa hoje
            </span>
          </div>

          {/* H1 forte */}
          <h1 className="font-cinema text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 glow-text">
            A mesma coisa que Netflix, Disney+ e Premiere.{' '}
            <span className="text-cinema-red">Por R$ 29,90.</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-6">
            CineflixPayment — Filmes, séries, futebol 4K e suporte 24h.
          </p>

          {/* CTA principal */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <button
              onClick={scrollToPlans}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base md:text-lg bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.03] animate-pulse-glow"
            >
              <Play className="w-5 h-5 fill-white" />
              QUERO ASSINAR AGORA
            </button>
            <p className="text-white/50 text-xs">A partir de <span className="text-cinema-gold font-bold">R$ 29,90/mês</span> · Cancele quando quiser</p>
          </div>

          {/* Diferenciais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6 text-left">
            {differentials.map((d) => (
              <div
                key={d.title}
                className="bg-cinema-panel/60 border border-white/10 rounded-xl px-4 py-3 hover:border-cinema-red/40 transition-colors"
              >
                <div className="text-2xl mb-1">{d.icon}</div>
                <p className="text-white font-bold text-sm leading-tight">{d.title}</p>
                <p className="text-white/55 text-xs leading-snug mt-0.5">{d.desc}</p>
              </div>
            ))}
          </div>

          {/* Mini prova social */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-cinema-gold text-cinema-gold" />
                ))}
              </div>
              +2.200 clientes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Suporte humano 24h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              Acesso imediato
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionHero;

