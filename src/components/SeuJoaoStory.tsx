import { motion } from 'framer-motion';
import scene1 from '@/assets/story-joao-01.jpg';
import scene2 from '@/assets/story-joao-02.jpg';
import scene3 from '@/assets/story-joao-03.jpg';
import scene4 from '@/assets/story-joao-04.jpg';
import scene5 from '@/assets/story-joao-05.jpg';
import scene6 from '@/assets/story-joao-06.jpg';

type Scene = {
  image: string;
  alt: string;
  caption: React.ReactNode;
};

const scenes: Scene[] = [
  {
    image: scene1,
    alt: 'Seu João vendendo DVDs em uma barraca na Rua Grande, em São Luís',
    caption: (
      <>
        Ele vendia DVD na <span className="text-cinema-red">Rua Grande</span> de São Luís.
      </>
    ),
  },
  {
    image: scene2,
    alt: 'Seu João pensativo em uma rua do centro histórico',
    caption: <>Até que um dia, ele <span className="text-cinema-red">parou para pensar</span>.</>,
  },
  {
    image: scene3,
    alt: 'Seu João sorrindo segurando o aplicativo CINEFLIXPAYMENT no celular',
    caption: (
      <>
        E se existisse um único aplicativo com <span className="text-cinema-red">todos os filmes e séries</span>?
      </>
    ),
  },
  {
    image: scene4,
    alt: 'Seu João assistindo a CINEFLIXPAYMENT na TV da sala',
    caption: (
      <>
        Hoje ele tem <span className="text-cinema-red">acesso ilimitado</span> a tudo que gosta.
      </>
    ),
  },
  {
    image: scene5,
    alt: 'Seu João sorrindo aliviado em uma rua iluminada à noite',
    caption: (
      <>
        Mais prático, mais barato e <span className="text-cinema-red">sem complicação</span>.
      </>
    ),
  },
  {
    image: scene6,
    alt: 'Seu João relaxado no sofá assistindo CINEFLIXPAYMENT',
    caption: (
      <>
        Entretenimento de verdade. Do seu jeito. <span className="text-cinema-red">Quando e onde quiser.</span>
      </>
    ),
  },
];

const SeuJoaoStory = () => {
  return (
    <section className="relative py-20 md:py-28 px-4 bg-cinema-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(229,9,20,0.08),_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-4">
            Nossa história
          </p>
          <h2 className="text-3xl md:text-5xl font-cinema text-white leading-[1.1] tracking-tight">
            Lembra do <span className="text-cinema-red">Seu João</span>?
          </h2>
          <p className="mt-5 text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A história que inspirou a forma como entregamos entretenimento na CINEFLIXPAYMENT.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {scenes.map((scene, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)] hover:border-cinema-red/50 transition-colors duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={scene.image}
                  alt={scene.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.22em] uppercase text-white/70 bg-black/55 backdrop-blur px-2.5 py-1 rounded-full border border-white/15">
                  Cena {String(i + 1).padStart(2, '0')}
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="text-white text-base md:text-lg leading-snug font-medium">
                    {scene.caption}
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-20 text-center"
        >
          <p className="text-white text-xl md:text-2xl font-cinema leading-snug max-w-2xl mx-auto">
            Porque não vendemos apenas planos.
            <br />
            Entregamos <span className="text-cinema-red">tranquilidade</span>.
          </p>

          <button
            onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 inline-block px-9 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300 hover:scale-[1.02] shadow-button"
          >
            Conhecer os planos
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SeuJoaoStory;
