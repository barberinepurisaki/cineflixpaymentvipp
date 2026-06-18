import { motion } from 'framer-motion';
import { CreditCard, MessageCircle, Tv } from 'lucide-react';

const steps = [
  {
    n: '01',
    Icon: CreditCard,
    title: 'Escolha seu plano',
    desc: 'Selecione 1 ou 2 telas e pague com PIX ou cartão em ambiente 100% seguro.',
  },
  {
    n: '02',
    Icon: MessageCircle,
    title: 'Receba seu acesso',
    desc: 'Em poucos minutos enviamos seu login e instruções direto no seu WhatsApp.',
  },
  {
    n: '03',
    Icon: Tv,
    title: 'Assista onde quiser',
    desc: 'Celular, Smart TV, TV Box ou computador. Em 4K e sem travamentos.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-cinema-dark">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-3">
            Como funciona
          </p>
          <h2 className="font-cinema text-3xl md:text-4xl text-white tracking-tight">
            Comece a assistir em <span className="text-cinema-red">3 passos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map(({ n, Icon, title, desc }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-cinema-red/40 transition-colors"
            >
              <span className="absolute top-4 right-5 font-cinema text-3xl text-cinema-red/30">
                {n}
              </span>
              <div className="w-11 h-11 rounded-xl bg-cinema-red/15 border border-cinema-red/30 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-cinema-red" strokeWidth={1.75} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
