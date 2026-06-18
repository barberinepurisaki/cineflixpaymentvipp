import { motion } from 'framer-motion';

const SeuJoaoStory = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-background via-cinema-panel/30 to-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cinema-red/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-5xl mb-4">🍿</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Lembra do <span className="text-cinema-red">seu João</span>,<br className="hidden md:block" />
            da barraca de DVD na rua grande?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed text-center md:text-left"
        >
          <p>
            Os DVD dele funcionavam tudo, mesmo sendo mais barato.
            O cliente confiava e <span className="text-white font-semibold">sempre voltava</span>.
          </p>

          <p className="text-white font-bold text-xl md:text-2xl">
            É assim com a CineflixPayment.
          </p>

          <p>
            Não é que somos TV pirata. É que entregamos{' '}
            <span className="text-cinema-red font-semibold">a mesma coisa</span> que as outras plataformas,
            só que cobrando mais barato.
          </p>

          <p>
            E o melhor: <span className="text-white font-semibold">suporte 24h</span>,
            resolvendo qualquer B.O., sempre procurando saber se está tudo certo.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-cinema-red/40 to-transparent my-8" />

          <p className="text-center text-white font-bold text-xl md:text-2xl">
            A gente não vende planos. A gente vende <span className="text-cinema-red">experiência</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-8 py-3.5 rounded-xl font-bold bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300 hover:scale-105 shadow-button"
          >
            QUERO ASSINAR AGORA
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeuJoaoStory;
