import { motion } from 'framer-motion';

const FinalCTA = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 px-4 bg-gradient-to-b from-cinema-dark to-black">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cinema text-4xl md:text-5xl text-white leading-tight mb-6 tracking-tight"
        >
          Sua diversão começa <span className="text-cinema-red">agora</span>.
        </motion.h2>

        <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
          Mais de <span className="text-white font-semibold">2.200 clientes</span> já confiam na CineflixPayment.
        </p>

        <button
          onClick={scrollToPlans}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-semibold text-base md:text-lg uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Quero assinar
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
