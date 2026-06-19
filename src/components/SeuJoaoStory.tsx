import { motion } from 'framer-motion';
import scene1 from '@/assets/story-joao-01.jpg';
import scene2 from '@/assets/story-joao-02.jpg';
import scene3 from '@/assets/story-joao-03.jpg';
import scene4 from '@/assets/story-joao-04.jpg';
import scene5 from '@/assets/story-joao-05.jpg';
import scene6 from '@/assets/story-joao-06.jpg';

type Scene = { image: string; alt: string; caption: string };

const scenes: Scene[] = [
  { image: scene1, alt: 'Seu João vendendo DVDs', caption: 'Ele vendia DVD na Rua Grande.' },
  { image: scene2, alt: 'Seu João pensativo',     caption: 'Até que parou para pensar.' },
  { image: scene3, alt: 'Seu João com o app',     caption: 'E se tudo estivesse num app só?' },
  { image: scene4, alt: 'Seu João assistindo TV', caption: 'Hoje tem acesso ilimitado.' },
  { image: scene5, alt: 'Seu João aliviado',      caption: 'Mais barato e sem complicação.' },
  { image: scene6, alt: 'Seu João no sofá',       caption: 'Do seu jeito. Quando quiser.' },
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
          className="text-center mb-8 md:mb-10 px-4"
        >
          <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-3">
            Nossa história
          </p>
          <h2 className="text-2xl md:text-4xl font-cinema text-white leading-tight tracking-tight">
            Lembra do <span className="text-cinema-red">Seu João</span>?
          </h2>
        </motion.div>

        {/* Carrossel automático (marquee) */}
        <div
          className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-label="Carrossel da história do Seu João"
        >
          <div className="flex gap-4 md:gap-5 w-max animate-marquee">
            {loop.map((scene, i) => (
              <figure
                key={i}
                className="relative w-[240px] md:w-[280px] flex-shrink-0 rounded-xl overflow-hidden border border-cinema-red/30 bg-black/40 shadow-[0_10px_40px_-15px_rgba(229,9,20,0.4)]"
              >
                <div className="relative aspect-[4/5]">
                  <img
                    src={scene.image}
                    alt={scene.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white text-sm md:text-base font-medium leading-snug">
                    {scene.caption}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-10 px-4">
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
