import { motion } from 'framer-motion';
import seal from '@/assets/guarantee-seal-30days.png';

const Guarantee = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-cinema-dark to-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.03] border border-cinema-red/30 rounded-3xl p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-cinema-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cinema-red/10 rounded-full blur-3xl pointer-events-none" />


          <div className="relative grid md:grid-cols-[200px_1fr] gap-8 items-center text-center md:text-left">
            <img
              src={seal}
              alt="Selo de Garantia 30 dias CineflixPayment"
              width={1024}
              height={1024}
              loading="lazy"
              className="w-40 h-40 md:w-48 md:h-48 mx-auto drop-shadow-2xl"
            />

            <div>
              <h2 className="font-cinema text-2xl md:text-3xl text-white mb-3 tracking-tight">
                Garantia incondicional de <span className="text-cinema-red">30 dias</span>
              </h2>

              <p className="text-white/75 text-sm md:text-base leading-relaxed">
                Assine, instale e teste por <span className="text-white font-semibold">30 dias completos</span>.
                Se a CineflixPayment não te entregar a melhor experiência de streaming que você já teve,
                devolvemos <span className="text-cinema-red font-semibold">100% do seu dinheiro</span> —
                sem burocracia, sem perguntas. Todo o risco é nosso.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
