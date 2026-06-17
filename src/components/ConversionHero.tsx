import { motion } from 'framer-motion';
import { Tv, Smartphone, Monitor, Cast, ShieldCheck, Star, Play } from 'lucide-react';

const benefits = [
  { icon: '🎬', label: 'Filmes e séries' },
  { icon: '⚽', label: 'Futebol ao vivo' },
  { icon: '📺', label: 'Canais ao vivo' },
  { icon: '✨', label: 'Lançamentos' },
];

const devices = [
  { icon: Tv, label: 'Smart TV' },
  { icon: Cast, label: 'TV Box' },
  { icon: Smartphone, label: 'Celular' },
  { icon: Monitor, label: 'PC' },
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
            Filmes, séries, futebol e canais ao vivo{' '}
            <span className="text-cinema-red">por um valor que cabe no seu bolso.</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-6">
            Tudo em um único app: assista quando, onde e como quiser — com suporte humano sempre que precisar.
          </p>

          {/* Benefícios */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-5">
            {benefits.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cinema-panel/70 border border-white/10 text-white/90 text-xs md:text-sm"
              >
                <span>{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>

          {/* Preço + CTA */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <p className="text-white/60 text-sm">
              A partir de{' '}
              <span className="text-cinema-gold font-bold text-lg">R$ 29,90</span>
              <span className="text-white/50"> /mês</span>
            </p>
            <button
              onClick={scrollToPlans}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base md:text-lg bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.03] animate-pulse-glow"
            >
              <Play className="w-5 h-5 fill-white" />
              Começar agora
            </button>
          </div>

          {/* Compatibilidade */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mb-5 text-white/60 text-xs md:text-sm">
            <span className="uppercase tracking-wider text-white/40">Compatível com</span>
            {devices.map((d) => (
              <span key={d.label} className="inline-flex items-center gap-1.5">
                <d.icon className="w-4 h-4 text-cinema-red" />
                {d.label}
              </span>
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
              Clientes satisfeitos
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Suporte humano 24h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-green-500">✓</span>
              Cancele quando quiser
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionHero;
