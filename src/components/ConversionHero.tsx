import { motion } from 'framer-motion';
import { ShieldCheck, Play, Star } from 'lucide-react';
import logoImg from '@/assets/cineflixpayment-logo.png';
import { openWhatsapp } from '@/lib/whatsapp';

const ConversionHero = () => {
  return (
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
          <img
            src={logoImg}
            alt="CineflixPayment"
            width={1696}
            height={608}
            className="mx-auto w-full max-w-[520px] sm:max-w-3xl md:max-w-5xl mb-6 select-none drop-shadow-[0_0_60px_rgba(229,9,20,0.55)]"
          />

          <h1 className="font-cinema text-3xl sm:text-4xl md:text-6xl text-white leading-[1.02] mb-5 tracking-tight">
            Filmes, séries e canais ao vivo
            <br className="hidden md:block" />
            por <span className="text-cinema-red">R$ 29,90</span>.
          </h1>

          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Tudo num só app — no celular, Smart TV, TV Box ou computador.
          </p>

          <div className="flex flex-col items-center gap-3 mb-6">
            <button
              onClick={() => openWhatsapp()}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-xl font-bold text-sm md:text-base bg-cinema-red hover:bg-cinema-red-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.03] tracking-wide uppercase animate-pulse-glow"
            >
              <Play className="w-4 h-4 fill-white" />
              Quero assinar agora
            </button>
            <p className="text-white/60 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-500 mr-1" />
              Atendimento direto no WhatsApp
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs md:text-sm text-white/70">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
              ))}
            </div>
            <span className="font-semibold text-white">4,9/5</span>
            <span className="text-white/60">· clientes ativos</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConversionHero;
