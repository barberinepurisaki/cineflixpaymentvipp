import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle, ShieldCheck } from 'lucide-react';
import cineflixLogo from '@/assets/cineflix-logo.png';
import { WHATSAPP_NUMBER, SUPPORT_EMAIL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/data/cineflix';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img src={cineflixLogo} alt="Logo CineflixPayment" className="w-10 h-10 object-contain" />
              <span className="font-cinema text-xl text-white tracking-wide">
                CINEFLIX<span className="text-cinema-red">PAYMENT</span>
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-sm mb-6">
              Filmes, séries, futebol em 4K e canais fechados em um único plano —
              com suporte humano 24 horas, todos os dias.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-white/50 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Pagamento 100% seguro
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">Navegação</h4>
            <ul className="space-y-3">
              <li><a href="#planos" className="text-white/55 hover:text-white transition-colors text-sm">Planos</a></li>
              <li><a href="#filmes" className="text-white/55 hover:text-white transition-colors text-sm">Catálogo</a></li>
              <li><Link to="/faq" className="text-white/55 hover:text-white transition-colors text-sm">Perguntas frequentes</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">Empresa</h4>
            <ul className="space-y-3">
              <li><Link to="/termos" className="text-white/55 hover:text-white transition-colors text-sm">Termos de uso</Link></li>
              <li><Link to="/privacidade" className="text-white/55 hover:text-white transition-colors text-sm">Privacidade</Link></li>
              <li><Link to="/faq" className="text-white/55 hover:text-white transition-colors text-sm">Central de ajuda</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-5">Contato</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="flex items-center gap-2.5 text-white/55 hover:text-white transition-colors text-sm break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/55 hover:text-emerald-400 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  (98) 98146-5166
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/55 hover:text-pink-400 transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center md:text-left">
            © {currentYear} CineflixPayment. Todos os direitos reservados.
          </p>
          <p className="text-white/35 text-xs">
            CNPJ e razão social informados no contrato de assinatura.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
