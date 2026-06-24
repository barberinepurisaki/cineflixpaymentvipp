import { motion } from 'framer-motion';
import scene1 from '@/assets/story-joao-01.jpg';
import scene2 from '@/assets/story-joao-02.jpg';
import scene3 from '@/assets/story-joao-03.jpg';
import scene4 from '@/assets/story-joao-04.jpg';
import scene5 from '@/assets/story-joao-05.jpg';
import scene6 from '@/assets/story-joao-06.jpg';

type Scene = { image: string; alt: string; chapter: string; caption: string };

const scenes: Scene[] = [
  {
    image: scene1,
    alt: 'Vendedor de DVD na rua',
    chapter: 'Capítulo 1',
    caption: 'A Netflix não surgiu de uma ideia boba. Nasceu de alguém observando um vendedor de DVD faturar alto com filmes.',
  },
  {
    image: scene2,
    alt: 'Ideia surgindo',
    chapter: 'Capítulo 2',
    caption: 'Veio a ideia maluca: alugar filmes direto da própria casa, com papo de vendedor convencendo o cliente a levar mais um.',
  },
  {
    image: scene3,
    alt: 'Cliente cansado de sair de casa',
    chapter: 'Capítulo 3',
    caption: 'Mas algo incomodava: o cliente ter que sair do conforto pra alugar um DVD era cansativo demais.',
  },
  {
    image: scene4,
    alt: 'Estudando a solução',
    chapter: 'Capítulo 4',
    caption: 'Foi estudar o problema. E descobriu: se todos os filmes e séries do planeta estivessem em um só app, tudo mudaria.',
  },
  {
    image: scene5,
    alt: 'App fácil, sem travamento',
    chapter: 'Capítulo 5',
    caption: 'Fácil de usar, sem anúncio, sem travamento — a praticidade de ter um cinema inteiro na palma da mão.',
  },
  {
    image: scene6,
    alt: 'CineflixPayment hoje',
    chapter: 'Hoje',
    caption: 'A CineflixPayment opera no dia a dia da sua casa. Filmes, séries & muito + — a melhor do Brasil, por tão pouco.',
  },
];

// duplica para o loop infinito sem corte
const loop = [...scenes, ...scenes];

const SeuJoaoStory = () => {
  return (
    <section className="relative py-14 md:py-20 bg-cinema-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.10),_transparent_60%)] pointer-events-none" />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10 px-4 max-w-3xl mx-auto"
        >
          <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-3">
            Como tudo começou
          </p>
          <h2 className="text-3xl md:text-5xl font-cinema text-white leading-tight tracking-tight mb-4">
            Da locadora de DVD para o <span className="text-cinema-red">cinema na palma da sua mão</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            A maior plataforma de streaming do mundo começou observando um simples vendedor de DVD.
            A <span className="text-white font-semibold">CineflixPayment</span> nasceu pra terminar essa história
            do jeito certo — aqui no Brasil, por um preço justo.
          </p>
        </motion.div>

        {/* Carrossel automático (marquee) */}
        <div
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-label="Carrossel da história da CineflixPayment"
        >
          <div className="flex gap-4 md:gap-5 w-max animate-marquee">
            {loop.map((scene, i) => (
              <figure
                key={i}
                className="relative w-[260px] md:w-[300px] flex-shrink-0 rounded-xl overflow-hidden border border-cinema-red/30 bg-black/40 shadow-[0_10px_40px_-15px_rgba(229,9,20,0.4)]"
              >
                <div className="relative aspect-[4/5]">
                  <img
                    src={scene.image}
                    alt={scene.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-cinema-red text-[10px] font-semibold tracking-[0.22em] uppercase mb-1.5">
                      {scene.chapter}
                    </p>
                    <p className="text-white text-sm md:text-[15px] font-medium leading-snug">
                      {scene.caption}
                    </p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 md:mt-12 px-4 max-w-2xl mx-auto">
          <p className="text-white/80 text-base md:text-lg mb-5 leading-relaxed">
            Hoje você não precisa mais sair de casa nem pagar caro.
            A <span className="text-cinema-red font-semibold">CineflixPayment</span> é
            <span className="text-white font-semibold"> filmes, séries & muito +</span> num app só.
          </p>
          <button
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-block px-8 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300 hover:scale-[1.02] shadow-button"
          >
            Conhecer os planos
          </button>
        </div>
      </div>
    </section>
  );
};

export default SeuJoaoStory;
