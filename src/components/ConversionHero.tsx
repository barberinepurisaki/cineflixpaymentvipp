import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import logoImg from '@/assets/cineflixpayment-logo.png';
import heroTitle from '@/assets/hero-title.png';
import { openWhatsapp } from '@/lib/whatsapp';

const ConversionHero = () => {
  return (
    <section
      aria-label="Oferta principal"
      className="relative bg-black text-white flex flex-col items-center justify-center px-6 pt-24 pb-8 md:pt-28 md:pb-10 overflow-hidden"
    >
      {/* Subtle red radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.20),_transparent_60%)] pointer-events-none" />
      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full"
      >
        {/* Logo with flash */}
        <img
          src={logoImg}
          alt="CineflixPayment"
          width={1696}
          height={608}
          className="w-full max-w-[320px] md:max-w-md mb-6 select-none animate-logo-flash"
        />

        {/* Cinematic title image (replaces plain headline for brand consistency) */}
        <img
          src={heroTitle}
          alt="Filmes, séries e muito mais"
          width={1280}
          height={640}
          className="w-full max-w-[340px] md:max-w-md mb-5 select-none"
        />

        {/* Subhead */}
        <p className="text-base md:text-lg text-white/70 font-medium mb-6 max-w-xs">
          Assista onde quiser. Cancele quando quiser.
        </p>

        {/* Primary CTA */}
        <button
          onClick={() => openWhatsapp()}
          className="w-full inline-flex items-center justify-center gap-2 bg-cinema-red hover:bg-cinema-red-glow text-white font-bold py-4 px-8 rounded-md text-base md:text-lg uppercase tracking-wide transition-all duration-300 shadow-glow hover:shadow-glow-lg active:scale-[0.98]"
        >
          <Play className="w-4 h-4 fill-white" />
          Quero assinar agora
        </button>

        {/* Micro trust */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/60">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-cinema-gold text-cinema-gold" />
            ))}
          </div>
          <span className="text-white/80 font-semibold">4,9/5</span>
          <span>· +2.200 clientes</span>
        </div>
      </motion.div>
    </section>
  );
};

export default ConversionHero;
