import { motion } from 'framer-motion';
import { Film, Trophy, Tv, Sparkles, Smartphone, HeartHandshake } from 'lucide-react';

const benefits = [
  { icon: Film, text: 'Filmes e séries' },
  { icon: Trophy, text: 'Futebol e esportes ao vivo' },
  { icon: Tv, text: 'Canais ao vivo' },
  { icon: Sparkles, text: 'Lançamentos' },
  { icon: Smartphone, text: 'Celular, Smart TV, TV Box ou computador' },
];

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
            da barraca de DVDs na Rua Grande?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5 text-lg md:text-xl text-white/80 leading-relaxed text-center md:text-left"
        >
          <p>Todo mundo conhecia alguém assim.</p>
          <p>Os filmes funcionavam, o atendimento era bom e o preço cabia no bolso.</p>
          <p className="text-white font-medium">Por isso as pessoas sempre voltavam.</p>
          <p>Não era só sobre economizar. Era sobre <span className="text-cinema-red font-semibold">confiança</span>.</p>
          <p>Era saber que, quando chegasse em casa, tudo estaria funcionando.</p>

          <div className="h-px bg-gradient-to-r from-transparent via-cinema-red/40 to-transparent my-8" />

          <p>
            A <span className="text-white font-bold">CINEFLIXPAYMENT</span> nasceu com essa mesma ideia.
          </p>
          <p>
            Entregar uma experiência completa de entretenimento, com praticidade, suporte
            e um valor que faz sentido para o seu bolso.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-3 my-10"
        >
          {benefits.map(({ icon: Icon, text }, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-cinema-panel/60 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cinema-red/15 text-cinema-red shrink-0">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-white/90 text-sm md:text-base">{text}</span>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="space-y-5 text-lg md:text-xl text-white/80 leading-relaxed text-center md:text-left"
        >
          <div className="flex items-start gap-3 bg-cinema-panel/40 border border-cinema-red/20 rounded-2xl p-5">
            <HeartHandshake className="h-7 w-7 text-cinema-red shrink-0 mt-1" />
            <p>
              E o melhor: <span className="text-white font-semibold">você não fica sozinho</span>.
              Nosso suporte está disponível para ajudar sempre que precisar.
            </p>
          </div>

          <p className="text-center pt-2">
            Porque não vendemos apenas planos.
          </p>
          <p className="text-center text-white font-bold text-xl md:text-2xl">
            Entregamos tranquilidade, praticidade e uma experiência pensada para você e sua família.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-cinema-red font-extrabold tracking-wide text-lg md:text-xl">
            CINEFLIXPAYMENT — Filmes, séries e muito mais.
          </p>
          <button
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 inline-block px-8 py-3.5 rounded-xl font-bold bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300 hover:scale-105 shadow-button"
          >
            Começar agora
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeuJoaoStory;
