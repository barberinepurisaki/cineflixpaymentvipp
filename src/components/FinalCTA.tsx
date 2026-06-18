import { motion } from 'framer-motion';
import { Lock, Smartphone, Clock, RotateCcw } from 'lucide-react';

const seals = [
  { icon: Lock, label: 'Pagamento Seguro' },
  { icon: Smartphone, label: 'Acesso Imediato' },
  { icon: Clock, label: 'Suporte 24h' },
  { icon: RotateCcw, label: 'Cancele Quando Quiser' },
];

const FinalCTA = () => {
  const scrollToPlans = () => {
    document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 px-4 bg-gradient-to-b from-cinema-dark to-black">
      <div className="max-w-3xl mx-auto text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {seals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 bg-white/[0.03] border border-white/10 rounded-xl px-3 py-5"
            >
              <Icon className="w-5 h-5 text-cinema-red" strokeWidth={1.75} />
              <span className="text-white/75 text-xs md:text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-cinema text-3xl md:text-4xl text-white leading-tight mb-5 tracking-tight"
        >
          Sua diversão começa <span className="text-cinema-red">agora</span>.
        </motion.h2>

        <p className="text-white/65 text-base md:text-lg mb-10">
          Mais de <span className="text-white font-semibold">2.200 clientes</span> já confiam na CineflixPayment.
        </p>

        <button
          onClick={scrollToPlans}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-lg font-semibold text-sm md:text-base uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          Quero assinar
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
