import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Tv, Smartphone, Trophy, ShieldCheck, Globe } from 'lucide-react';

const features = [
  { icon: Tv, title: '+15.000 Títulos', desc: 'Filmes, séries, animes e novelas atualizados toda semana.' },
  { icon: Zap, title: '4K Ultra HD', desc: 'Qualidade cinematográfica com áudio Dolby imersivo.' },
  { icon: Smartphone, title: 'Multi-Telas', desc: 'TV, celular, tablet, PC e Smart TV — tudo sincronizado.' },
  { icon: Shield, title: 'Sem Anúncios', desc: 'Experiência limpa, sem interrupções, sem propaganda.' },
  { icon: ShieldCheck, title: 'Garantia 30 Dias', desc: 'Satisfação garantida ou seu dinheiro de volta.' },
  { icon: Globe, title: 'Catálogo Global', desc: 'Conteúdo do Brasil, Coreia, Japão, EUA e Europa.' },
];

const stats = [
  { value: '15K+', label: 'Títulos' },
  { value: '4K', label: 'Ultra HD' },
  { value: '9.8', label: 'Avaliação' },
  { value: '24/7', label: 'Suporte' },
];

const SalesPage2026 = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-cinema-dark via-black to-cinema-dark">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-red/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cinema-glow/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Hero badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cinema-red/10 border border-cinema-red/30 rounded-full mb-6 backdrop-blur">
            <Sparkles className="w-4 h-4 text-cinema-red" />
            <span className="text-cinema-red text-xs font-bold tracking-widest">SISTEMA 2026 • NOVA GERAÇÃO</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-cinema font-black text-white mb-6 leading-tight">
            O <span className="bg-gradient-to-r from-cinema-red via-cinema-glow to-cinema-red bg-clip-text text-transparent">streaming</span>
            <br />que reinventa o cinema
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            Tecnologia de ponta, catálogo infinito e a melhor experiência audiovisual da América Latina.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:border-cinema-red/40 transition-colors">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6 hover:border-cinema-red/50 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cinema-red/0 to-cinema-red/0 group-hover:from-cinema-red/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-cinema-red/10 border border-cinema-red/30 flex items-center justify-center mb-4 group-hover:bg-cinema-red/20 group-hover:scale-110 transition-all">
                  <f.icon className="w-6 h-6 text-cinema-red" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-cinema-red via-cinema-glow to-cinema-red rounded-3xl p-1"
        >
          <div className="bg-cinema-dark rounded-3xl p-8 md:p-12 text-center">
            <Trophy className="w-12 h-12 text-cinema-gold mx-auto mb-4" />
            <h3 className="text-3xl md:text-5xl font-cinema font-black text-white mb-4">
              Pronto para a melhor experiência?
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Escolha seu plano abaixo e comece em menos de 60 segundos. Sem cadastro complicado.
            </p>
            <a
              href="#planos"
              className="inline-block px-10 py-4 rounded-xl font-bold text-lg bg-cinema-red hover:bg-cinema-glow text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
            >
              🎬 Ver Planos Agora
            </a>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-white/40 text-xs">
              <span>✓ Pagamento seguro</span>
              <span>✓ Acesso imediato</span>
              <span>✓ Suporte 24/7</span>
              <span>✓ Cancele quando quiser</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SalesPage2026;
