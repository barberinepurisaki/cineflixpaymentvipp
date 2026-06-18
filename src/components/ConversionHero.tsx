import { motion } from 'framer-motion';
import { ShieldCheck, Star, Play, Film, Tv, Trophy, Headphones, BadgeCheck } from 'lucide-react';

const differentials = [
  { Icon: Film, title: 'Filmes e Séries 4K', desc: 'Catálogo completo e lançamentos' },
  { Icon: Trophy, title: 'Futebol ao Vivo', desc: 'Premiere, ESPN e SporTV' },
  { Icon: Tv, title: 'Canais Fechados', desc: 'Disney+, Max e Paramount+' },
  { Icon: Headphones, title: 'Suporte 24h', desc: 'Atendimento humano todos os dias' },
  { Icon: BadgeCheck, title: 'Preço Justo', desc: 'A partir de R$ 29,90/mês' },
];

const ConversionHero = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      aria-label="Oferta principal"
      className="relative px-4 pt-24 pb-14 md:pt-32 md:pb-20 bg-gradient-to-b from-black via-cinema-dark to-cinema-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cinema-red/10 border border-cinema-red/30 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-pulse" />
            <span className="text-[11px] font-semibold text-cinema-red tracking-[0.18em] uppercase">
              Oferta disponível hoje
            </span>
          </div>

          <h1 className="font-cinema text-3xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-5 tracking-tight">
            A mesma experiência da Netflix, Disney+ e Premiere.
            <br className="hidden md:block" />
            <span className="text-cinema-red">Por R$ 29,90.</span>
          </h1>

          <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Filmes, séries, futebol em 4K e suporte humano 24 horas — em um único plano.
          </p>

          <div className="flex flex-col items-center gap-3 mb-12">
            <button
              onClick={scrollToPlans}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-lg font-semibold text-sm md:text-base bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02] tracking-wide uppercase"
            >
              <Play className="w-4 h-4 fill-white" />
              Quero assinar agora
            </button>
            <p className="text-white/45 text-xs">
              A partir de <span className="text-white font-medium">R$ 29,90/mês</span> · Cancele quando quiser
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 text-left">
            {differentials.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 hover:border-cinema-red/40 hover:bg-white/[0.05] transition-all"
              >
                <Icon className="w-5 h-5 text-cinema-red mb-2.5" strokeWidth={1.75} />
                <p className="text-white font-semibold text-sm leading-tight">{title}</p>
                <p className="text-white/50 text-xs leading-snug mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm text-white/55">
            <span className="inline-flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-cinema-gold text-cinema-gold" />
                ))}
              </div>
              Mais de 2.200 clientes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Suporte humano 24h
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-emerald-500" />
              Acesso imediato
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionHero;
