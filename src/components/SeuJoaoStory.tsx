import { motion } from 'framer-motion';

const SeuJoaoStory = () => {
  return (
    <section className="relative py-20 md:py-28 px-4 bg-cinema-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.06),_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            Nossa história
          </p>
          <h2 className="text-3xl md:text-5xl font-cinema text-white leading-[1.1] tracking-tight">
            Lembra do <span className="text-cinema-red">seu João</span>,
            <br className="hidden md:block" />
            da barraca de DVDs da Rua Grande?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6 text-base md:text-lg text-white/70 leading-[1.8] max-w-2xl mx-auto"
        >
          <p>
            Todo mundo conhecia alguém assim. Os filmes funcionavam, o atendimento era bom
            e o preço cabia no bolso. Por isso as pessoas sempre voltavam.
          </p>

          <p>
            Não era só sobre economizar — era sobre confiança. Era saber que, ao chegar em casa,
            tudo estaria funcionando.
          </p>

          <p className="text-white font-medium">
            A CineflixPayment nasceu com essa mesma ideia.
          </p>

          <p>
            Entregar uma experiência completa de entretenimento, com praticidade, suporte
            e um valor que faz sentido para o seu bolso. E o melhor: você não fica sozinho.
            Nosso time está disponível sempre que precisar.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-10" />

          <p className="text-center text-white text-xl md:text-2xl font-cinema leading-snug">
            Porque não vendemos apenas planos.
            <br />
            Entregamos <span className="text-cinema-red">tranquilidade</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-9 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300 hover:scale-[1.02] shadow-button"
          >
            Conhecer os planos
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeuJoaoStory;
