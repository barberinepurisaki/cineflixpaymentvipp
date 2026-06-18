import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, Mail, Instagram, ArrowLeft } from 'lucide-react';
import cineflixLogo from '@/assets/cineflix-logo.png';
import { cn } from '@/lib/utils';
import { WHATSAPP_NUMBER, SUPPORT_EMAIL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/data/cineflix';

const faqs = [
  {
    q: 'A CineflixPayment trava ou tem propaganda?',
    a: 'Não. Nossa estrutura roda em servidores premium 4K com baixa latência. Sem anúncios, sem pop-ups, sem travamentos — qualidade de cinema em casa.',
  },
  {
    q: 'Funciona na minha Smart TV?',
    a: 'Sim. Funciona em Smart TVs (Samsung, LG, Roku, Android TV), TV Box, Fire Stick, celular, tablet e computador. Após pagar, enviamos o passo a passo de instalação no seu WhatsApp.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Cartão de crédito (Visa, Mastercard, Elo, Amex), PIX e boleto. Processado pela Cakto em ambiente 100% seguro — seus dados ficam protegidos.',
  },
  {
    q: 'Quanto tempo leva para receber o acesso?',
    a: 'O acesso é liberado automaticamente após a confirmação do pagamento (PIX é instantâneo). Enviamos seu login e o passo a passo direto no WhatsApp em poucos minutos.',
  },
  {
    q: 'Quantas telas posso usar ao mesmo tempo?',
    a: 'O Plano Mensal · 1 Tela permite uma tela simultânea. O Plano Mensal · 2 Telas (o mais escolhido) permite assistir em duas telas ao mesmo tempo — ideal para a família.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim. Não há fidelidade, não há multa. Você cancela a qualquer momento e mantém o acesso até o fim do período pago.',
  },
  {
    q: 'Tem garantia se eu não gostar?',
    a: 'Sim — garantia incondicional de 30 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas.',
  },
  {
    q: 'É legal? É seguro?',
    a: 'Operamos com CNPJ ativo, suporte humano e plataforma de pagamento regulada (Cakto). Seu pagamento e seus dados estão 100% protegidos.',
  },
  {
    q: 'O conteúdo tem legendas e dublagem em português?',
    a: 'Sim. A grande maioria do catálogo conta com áudio dublado e legenda em português, incluindo séries asiáticas, K-dramas e animes.',
  },
  {
    q: 'Como falo com o suporte?',
    a: 'Estamos disponíveis 24h pelo WhatsApp, e-mail e Instagram. Veja os canais logo abaixo desta página — respondemos rápido, de verdade.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-cinema-dark text-white">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={cineflixLogo} alt="Logo CineflixPayment" className="h-8 w-auto" />
            <span className="font-cinema text-base text-white tracking-wide">
              CINEFLIX<span className="text-cinema-red">PAYMENT</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/65 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Hero */}
        <div className="text-center mb-12">
          <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-3">
            Central de ajuda
          </p>
          <h1 className="font-cinema text-3xl md:text-5xl text-white tracking-tight mb-3">
            Suporte & <span className="text-cinema-red">Perguntas frequentes</span>
          </h1>
          <p className="text-white/65 text-base md:text-lg max-w-2xl mx-auto">
            Estamos aqui para te ajudar. Encontre respostas rápidas abaixo ou fale com a gente nos canais oficiais.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Preciso de suporte da CineflixPayment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-emerald-500/50 rounded-2xl p-5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-emerald-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-white/55 text-[11px] uppercase tracking-widest mb-1">WhatsApp · 24h</p>
              <p className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                (98) 98146-5166
              </p>
            </div>
          </a>

          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="group flex flex-col items-start gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cinema-red/50 rounded-2xl p-5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-cinema-red/15 flex items-center justify-center">
              <Mail className="w-5 h-5 text-cinema-red" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-white/55 text-[11px] uppercase tracking-widest mb-1">E-mail oficial</p>
              <p className="text-white font-semibold text-sm group-hover:text-cinema-red transition-colors break-all">
                {SUPPORT_EMAIL}
              </p>
            </div>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-pink-500/50 rounded-2xl p-5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center">
              <Instagram className="w-5 h-5 text-pink-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-white/55 text-[11px] uppercase tracking-widest mb-1">Instagram</p>
              <p className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors">
                {INSTAGRAM_HANDLE}
              </p>
            </div>
          </a>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-cinema text-2xl md:text-3xl text-white mb-6 tracking-tight">
            Dúvidas mais comuns
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={i}
                  className={cn(
                    'border rounded-xl overflow-hidden transition-colors',
                    open ? 'border-cinema-red/40 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02]'
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-white text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-cinema-red flex-shrink-0 transition-transform duration-300',
                        open && 'rotate-180'
                      )}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-white/70 text-sm leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-14 text-center bg-gradient-to-br from-cinema-red/15 via-white/[0.02] to-transparent border border-cinema-red/25 rounded-2xl p-8">
          <h3 className="font-cinema text-2xl text-white mb-2 tracking-tight">
            Não encontrou sua resposta?
          </h3>
          <p className="text-white/65 text-sm mb-6">
            Fale com a gente agora pelo WhatsApp — respondemos em poucos minutos.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre a CineflixPayment.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300 hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
};

export default FAQ;
