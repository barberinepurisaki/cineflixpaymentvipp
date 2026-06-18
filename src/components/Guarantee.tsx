import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const Guarantee = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-cinema-dark to-black">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.03] border border-cinema-red/30 rounded-3xl p-8 md:p-10 text-center overflow-hidden"
        >
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-cinema-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cinema-red/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-cinema-red items-center justify-center mb-5 shadow-glow">
              <ShieldCheck className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            <h2 className="font-cinema text-2xl md:text-3xl text-white mb-3 tracking-tight">
              Garantia incondicional de <span className="text-cinema-red">7 dias</span>
            </h2>

            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Experimente a CineflixPayment por 7 dias. Se por qualquer motivo você não ficar
              satisfeito, devolvemos <span className="text-white font-semibold">100% do seu dinheiro</span>.
              Sem burocracia, sem perguntas. O risco é todo nosso.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
