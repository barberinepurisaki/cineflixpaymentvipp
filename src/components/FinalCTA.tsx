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
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-cinema-dark via-cinema-panel/40 to-cinema-dark">
      <div className="max-w-3xl mx-auto text-center">
        {/* Selos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {seals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-cinema-panel/60 border border-white/10 rounded-xl px-3 py-4"
            >
              <Icon className="w-5 h-5 text-cinema-red" />
              <span className="text-white/80 text-xs md:text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4"
        >
          Sua diversão começa <span className="text-cinema-red">agora</span>.
        </motion.h2>

        <p className="text-white/70 text-lg mb-8">
          Mais de <span className="text-white font-bold">2.200 clientes</span> já confiam. Bora?
        </p>

        <button
          onClick={scrollToPlans}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-base md:text-lg bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.03] animate-pulse-glow"
        >
          QUERO ASSINAR
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
