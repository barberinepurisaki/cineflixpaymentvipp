import { motion } from 'framer-motion';
import { ShieldCheck, Play, Truck, Lock, Award, Star } from 'lucide-react';

const trustBar = [
  { Icon: Truck, label: 'Acesso Imediato' },
  { Icon: ShieldCheck, label: 'Garantia de 7 dias' },
  { Icon: Lock, label: 'Pagamento Seguro' },
  { Icon: Award, label: 'Catálogo 4K' },
];

const ConversionHero = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* HERO com fundo colmeia vermelho */}
      <section
        aria-label="Oferta principal"
        className="relative bg-honeycomb px-4 pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden"
      >
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cinema-dark pointer-events-none" />

        <div className="container relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cinema-red/15 border border-cinema-red/50 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cinema-red animate-pulse" />
              <span className="text-[11px] font-bold text-white tracking-[0.18em] uppercase">
                Oferta limitada · Vagas reduzidas
              </span>
            </div>

            <h1 className="font-cinema text-3xl sm:text-4xl md:text-6xl text-white leading-[1.02] mb-5 tracking-tight">
              Pare de pagar
              <span className="text-cinema-red"> R$ 179</span> em streamings.
              <br className="hidden md:block" />
              Tenha tudo por <span className="text-cinema-red">R$ 29,90</span>.
            </h1>

            <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto mb-7 leading-relaxed">
              Filmes, séries, futebol em 4K e canais fechados — em um único plano com suporte humano 24h.
            </p>

            {/* Comparação de preço */}
            <div className="max-w-md mx-auto mb-8 bg-black/40 backdrop-blur-sm border border-cinema-red/30 rounded-2xl p-5 text-left">
              <p className="text-white/60 text-[11px] uppercase tracking-widest mb-3 text-center">
                Compare e comprove
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between text-white/70">
                  <span>Netflix Premium</span>
                  <span className="line-through text-white/50">R$ 55,90</span>
                </li>
                <li className="flex items-center justify-between text-white/70">
                  <span>Disney+ Padrão</span>
                  <span className="line-through text-white/50">R$ 33,90</span>
                </li>
                <li className="flex items-center justify-between text-white/70">
                  <span>Premiere (futebol)</span>
                  <span className="line-through text-white/50">R$ 89,90</span>
                </li>
                <li className="flex items-center justify-between pt-3 mt-2 border-t border-white/10">
                  <span className="text-white font-semibold">CineflixPayment</span>
                  <span className="text-cinema-red font-bold text-lg">R$ 29,90</span>
                </li>
              </ul>
              <p className="text-center text-emerald-400 text-xs font-semibold mt-3">
                Economia de R$ 149,80 por mês
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <button
                onClick={scrollToPlans}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-bold text-sm md:text-base bg-cinema-red hover:bg-cinema-red-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.03] tracking-wide uppercase animate-pulse-glow"
              >
                <Play className="w-4 h-4 fill-white" />
                Quero economizar agora
              </button>
              <p className="text-white/60 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-500 mr-1" />
                Garantia de 7 dias · Cancele quando quiser
              </p>
            </div>

            {/* Mini prova social */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/70">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
                ))}
              </div>
              <span className="font-semibold text-white">4,9/5</span>
              <span className="text-white/60">· +2.200 clientes ativos</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Barra de selos (estilo referência) */}
      <section className="bg-cinema-dark border-y border-white/5 py-6">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBar.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="w-5 h-5 text-cinema-red" strokeWidth={1.75} />
                <span className="text-white/85 text-xs md:text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ConversionHero;
