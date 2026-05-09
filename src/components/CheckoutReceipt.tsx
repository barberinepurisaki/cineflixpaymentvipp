import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, CreditCard, MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { plans, upsells, KIRVANO_LINKS, WHATSAPP_NUMBER } from '@/data/cineflix';
import cineflixLogo from '@/assets/cineflix-logo.png';

const CheckoutReceipt = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const planId = searchParams.get('plano') || '';
  const nome = searchParams.get('nome') || 'Cliente';
  const email = searchParams.get('email') || '';
  const upsellIds = searchParams.get('upsells')?.split(',').filter(Boolean) || [];
  const plan = plans.find(p => p.id === planId);
  const selectedUpsells = upsellIds.map(id => upsells.find(u => u.id === id)).filter(Boolean);

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  if (!plan) {
    return (
      <div className="min-h-screen bg-cinema-dark flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Plano não encontrado</p>
          <button onClick={() => navigate('/')} className="text-cinema-red underline">Voltar ao início</button>
        </div>
      </div>
    );
  }

  const upsellTotal = selectedUpsells.reduce((sum, u) => sum + (u?.price || 0), 0);
  const total = plan.price + upsellTotal;
  const hasUpsells = selectedUpsells.length > 0;
  const orderId = `CFX-${currentTime.getTime().toString().slice(-8)}`;

  const dateStr = currentTime.toLocaleDateString('pt-BR');
  const timeStr = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const buildWhatsMessage = () => {
    const upsellLines = selectedUpsells
      .map(u => u ? `• ${u.name} — R$ ${u.price.toFixed(2)}` : '')
      .filter(Boolean)
      .join('\n');
    return [
      `*Pedido CINEFLIXPAYMENT* (${orderId})`,
      ``,
      `Cliente: ${nome}`,
      email ? `E-mail: ${email}` : '',
      ``,
      `Plano: ${plan.name} — R$ ${plan.price.toFixed(2)} (${plan.period})`,
      hasUpsells ? `\nAdicionais:\n${upsellLines}` : '',
      ``,
      `*Total: R$ ${total.toFixed(2)}*`,
      ``,
      `Quero finalizar meu pedido agora.`,
    ].filter(Boolean).join('\n');
  };

  const handlePayCard = () => {
    window.open(KIRVANO_LINKS[plan.id], '_blank');
  };

  const handlePayWhats = () => {
    const message = buildWhatsMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cinema-dark to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </button>

        {/* Card */}
        <div className="rounded-2xl overflow-hidden border border-cinema-red/40 shadow-glow bg-gradient-to-b from-cinema-panel to-black">
          {/* Header */}
          <div className="bg-gradient-to-r from-cinema-red via-red-700 to-cinema-red px-6 py-5 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
            <img src={cineflixLogo} alt="CINEFLIXPAYMENT" className="h-9 mx-auto mb-2 relative z-10" />
            <p className="text-white/90 text-[11px] tracking-[0.3em] font-bold relative z-10">
              COMPROVANTE DE PEDIDO
            </p>
          </div>

          {/* Status */}
          <div className="px-6 pt-5">
            <div className="flex items-center justify-between gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-xs font-bold tracking-wide">AGUARDANDO PAGAMENTO</span>
              </div>
              <span className="text-white/40 text-[10px] font-mono">#{orderId}</span>
            </div>
          </div>

          {/* Cliente */}
          <div className="px-6 pt-5">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Cliente</p>
            <div className="space-y-1">
              <p className="text-white font-bold truncate">{nome}</p>
              {email && <p className="text-white/60 text-xs truncate">{email}</p>}
            </div>
          </div>

          <div className="mx-6 my-4 border-t border-dashed border-white/15" />

          {/* Resumo do pedido */}
          <div className="px-6">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Resumo do pedido</p>

            {/* Plano */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm">{plan.name}</p>
                <p className="text-white/50 text-xs">
                  {plan.period === 'único' ? 'Acesso vitalício' : `Cobrança ${plan.period}`}
                </p>
              </div>
              <p className="text-white font-bold whitespace-nowrap">R$ {plan.price.toFixed(2)}</p>
            </div>

            {/* Adicionais */}
            {hasUpsells && (
              <>
                <div className="border-t border-dashed border-white/10 my-3" />
                <p className="text-cinema-red text-[10px] uppercase tracking-widest font-bold mb-2">
                  Adicionais selecionados
                </p>
                <div className="space-y-2">
                  {selectedUpsells.map((u) => u && (
                    <div key={u.id} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-cinema-red flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-white text-sm truncate">{u.name}</p>
                          {u.description && (
                            <p className="text-white/40 text-[11px] line-clamp-1">{u.description}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-white/90 text-sm whitespace-nowrap">+R$ {u.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-white/10 my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Subtotal plano</span>
                  <span className="text-white/80">R$ {plan.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-white/50">Subtotal adicionais</span>
                  <span className="text-white/80">R$ {upsellTotal.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          {/* Total */}
          <div className="mx-6 my-4 border-t border-dashed border-white/15" />
          <div className="px-6">
            <div className="bg-cinema-red/10 border border-cinema-red/40 rounded-xl px-4 py-4 flex items-center justify-between">
              <div>
                <p className="text-white/60 text-[10px] uppercase tracking-widest">Total a pagar</p>
                <p className="text-white text-3xl font-bold leading-none mt-1">
                  R$ {total.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[10px]">{dateStr}</p>
                <p className="text-white/40 text-[10px]">{timeStr}</p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="px-6 pt-5 pb-6 space-y-3">
            <button
              onClick={handlePayCard}
              className="w-full py-4 rounded-xl bg-cinema-red hover:bg-cinema-glow text-white font-bold flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <CreditCard className="w-5 h-5" />
              Finalizar pagamento
            </button>

            <button
              onClick={handlePayWhats}
              className="w-full py-4 rounded-xl bg-black border border-white/20 hover:border-cinema-red/60 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              Finalizar no WhatsApp
            </button>

            <div className="flex items-center justify-center gap-2 text-white/40 text-[11px] pt-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Pagamento seguro · CINEFLIXPAYMENT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReceipt;
