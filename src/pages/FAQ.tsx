import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import cineflixLogo from '@/assets/cineflix-logo.png';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'O que é a CINEFLIXPAYMENT?',
    a: 'A CINEFLIXPAYMENT é uma plataforma de streaming que oferece acesso a milhares de filmes, séries, animes, K-dramas, futebol ao vivo e muito mais. Temos planos acessíveis a partir de R$ 29,90/mês e o APK Vitalício por R$ 97,90 (pagamento único).'
  },
  {
    q: 'Como funciona o APK Vitalício?',
    a: 'O APK Vitalício é um aplicativo exclusivo para Android. Você paga apenas R$ 97,90 uma única vez e tem acesso vitalício a todo o catálogo, sem mensalidades, sem anúncios, sem senhas e sem travamentos. Ele inclui todas as atualizações futuras de lançamentos de cinema e possui garantia de 360 dias.'
  },
  {
    q: 'O APK funciona em Smart TV?',
    a: 'O APK é compatível apenas com dispositivos Android (celulares e TV Box Android). Para assistir na TV, você pode espelhar a tela do celular usando apps como Screen Mirroring, Google Home ou LetsView, disponíveis gratuitamente na Play Store.'
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos cartão de crédito (Visa, Mastercard, Amex), PIX e boleto bancário. Os pagamentos dos planos de assinatura são processados pela Kirvano, e o APK Vitalício pela Cakto. Ambas são plataformas 100% seguras.'
  },
  {
    q: 'Posso cancelar minha assinatura a qualquer momento?',
    a: 'Sim! Você pode cancelar sua assinatura quando quiser. O acesso permanece ativo até o final do período pago. Não há multa ou taxa de cancelamento. Para o APK Vitalício, não há necessidade de cancelamento — é seu para sempre.'
  },
  {
    q: 'Quantas telas posso usar simultaneamente?',
    a: 'Depende do seu plano: Mensal — 1 tela, Trimestral — 2 telas, Anual VIP — 4 telas. Você pode adicionar telas extras como complemento por R$ 9,90. O APK Vitalício funciona no dispositivo onde foi instalado.'
  },
  {
    q: 'O conteúdo tem legendas em português?',
    a: 'Sim! A grande maioria do nosso catálogo possui legendas e dublagem em português. Séries asiáticas (K-dramas, animes) também contam com legendas em português.'
  },
  {
    q: 'Como funciona a garantia de 360 dias do APK?',
    a: 'Se por qualquer motivo você não ficar satisfeito com o APK Vitalício dentro de 360 dias após a compra, basta entrar em contato com nosso suporte via WhatsApp e solicitar o reembolso integral. Sem perguntas, sem burocracia.'
  },
  {
    q: 'Posso assistir offline?',
    a: 'Sim! Os planos Trimestral e Anual VIP permitem download de conteúdo para assistir offline. O APK Vitalício também possui essa funcionalidade nativa.'
  },
  {
    q: 'Como entro em contato com o suporte?',
    a: 'Você pode falar com a Ashley, nossa assistente virtual, diretamente no site (clique no botão de chat). Também estamos disponíveis pelo WhatsApp 24/7 para atendimento VIP.'
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-cinema-dark text-white">
      <header className="border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/">
            <img src={cineflixLogo} alt="CINEFLIXPAYMENT" className="h-8" />
          </Link>
          <Link to="/" className="text-white/60 hover:text-white text-sm">← Voltar</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Perguntas Frequentes</h1>
        <p className="text-white/60 mb-8">Encontre respostas para as dúvidas mais comuns sobre a CINEFLIXPAYMENT.</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                <ChevronDown className={cn('w-5 h-5 text-white/50 flex-shrink-0 transition-transform', openIndex === i && 'rotate-180')} />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-white/70 text-sm leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQ;