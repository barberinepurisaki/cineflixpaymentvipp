import { Smartphone, Shield, Zap, RefreshCw, Ban, CheckCircle, Monitor, ExternalLink } from 'lucide-react';
import { KIRVANO_LINKS } from '@/data/cineflix';

const features = [
  { icon: Smartphone, title: 'Android Compatível', desc: 'Funciona em qualquer celular ou TV Box Android' },
  { icon: Shield, title: 'Sem Senhas', desc: 'Acesso direto, sem login ou travamentos' },
  { icon: Ban, title: 'Zero Anúncios', desc: 'Experiência limpa, sem interrupções' },
  { icon: RefreshCw, title: 'Atualizações Grátis', desc: 'Lançamentos de cinema atualizados automaticamente' },
  { icon: Zap, title: 'Pagamento Único', desc: 'Pague uma vez, use pra sempre — R$ 97,90' },
  { icon: CheckCircle, title: 'Garantia 360 Dias', desc: 'Satisfação garantida ou seu dinheiro de volta' },
];

const mirroringApps = [
  { name: 'Screen Mirroring', desc: 'Espelhe seu celular para Smart TV facilmente', url: 'https://play.google.com/store/search?q=screen+mirroring&c=apps' },
  { name: 'Google Home', desc: 'Transmita via Chromecast para sua TV', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.chromecast.app' },
  { name: 'LetsView', desc: 'Espelhamento gratuito para qualquer TV', url: 'https://play.google.com/store/search?q=letsview&c=apps' },
];

const AppPromoSection = () => {
  return (
    <section id="app" className="py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-red/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold mb-4">
            🤖 EXCLUSIVO ANDROID
          </span>
          <h2 className="text-3xl md:text-5xl font-cinema text-white mb-4">
            APK <span className="text-cinema-red">VITALÍCIO</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tenha todo o catálogo de filmes e séries direto no seu celular Android. 
            Sem mensalidade, sem anúncios, sem complicação. Pague uma vez e aproveite para sempre!
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {features.map((feat, i) => (
            <div 
              key={i} 
              className="bg-cinema-panel/50 border border-white/5 rounded-2xl p-5 text-center hover:border-cinema-red/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-cinema-red/10 flex items-center justify-center group-hover:bg-cinema-red/20 transition-colors">
                <feat.icon className="w-6 h-6 text-cinema-red" />
              </div>
              <h3 className="text-white font-bold text-sm md:text-base mb-1">{feat.title}</h3>
              <p className="text-white/50 text-xs md:text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-cinema-red/20 to-green-500/20 border border-cinema-red/30 rounded-2xl p-8 max-w-lg">
            <p className="text-4xl font-cinema text-white mb-1">R$ 97,90</p>
            <p className="text-white/50 text-sm mb-6">Pagamento único • Acesso vitalício</p>
            <a
              href={KIRVANO_LINKS.apk}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
            >
              <Smartphone className="w-5 h-5" />
              COMPRAR APK AGORA
            </a>
            <p className="text-white/40 text-xs mt-4">Garantia de 360 dias • Pagamento via Cakto</p>
          </div>
        </div>

        {/* Screen Mirroring Section */}
        <div className="bg-cinema-panel/50 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold mb-3">
              <Monitor className="w-4 h-4" />
              TELA GRANDE
            </div>
            <h3 className="text-2xl md:text-3xl font-cinema text-white mb-2">
              Assista na sua <span className="text-cinema-red">TV</span>
            </h3>
            <p className="text-white/50 text-sm max-w-md mx-auto">
              O app funciona no celular Android, mas você pode espelhar a tela para sua Smart TV! 
              Baixe um dos apps abaixo direto da Play Store:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mirroringApps.map((app, i) => (
              <a
                key={i}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-cinema-dark/50 border border-white/5 hover:border-cinema-red/30 rounded-xl p-4 transition-all duration-300 group no-underline"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Smartphone className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{app.name}</p>
                  <p className="text-white/40 text-xs">{app.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-cinema-red flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>

          <p className="text-white/30 text-xs text-center mt-4">
            📺 Conecte seu celular Android à sua TV via Wi-Fi e aproveite o cinema em casa!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppPromoSection;
