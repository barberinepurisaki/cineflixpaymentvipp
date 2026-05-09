import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Clock, CreditCard, MessageCircle, ArrowLeft,
  ShieldCheck, Ticket, Film, Lock, Headphones, Sparkles, Star, Calendar,
} from 'lucide-react';
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

  useEffect(() => { setCurrentTime(new Date()); }, []);

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
  const authCode = Math.random().toString(36).substring(2, 8).toUpperCase();

  const dateStr = currentTime.toLocaleDateString('pt-BR');
  const timeStr = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // Validade do acesso conforme plano
  const validityLabel = (() => {
    const d = new Date(currentTime);
    if (plan.id === 'apk') return 'Acesso vitalício';
    if (plan.id === 'anual') { d.setFullYear(d.getFullYear() + 1); return `Válido até ${d.toLocaleDateString('pt-BR')}`; }
    if (plan.id === 'trimestral') { d.setMonth(d.getMonth() + 3); return `Válido até ${d.toLocaleDateString('pt-BR')}`; }
    d.setMonth(d.getMonth() + 1); return `Válido até ${d.toLocaleDateString('pt-BR')}`;
  })();

  const buildWhatsMessage = () => {
    const upsellLines = selectedUpsells
      .map(u => u ? `• ${u.name} — R$ ${u.price.toFixed(2)}` : '')
      .filter(Boolean).join('\n');
    return [
      `*Pedido CINEFLIXPAYMENT* (${orderId})`, ``,
      `Cliente: ${nome}`, email ? `E-mail: ${email}` : '', ``,
      `Plano: ${plan.name} — R$ ${plan.price.toFixed(2)} (${plan.period})`,
      hasUpsells ? `\nAdicionais:\n${upsellLines}` : '', ``,
      `*Total: R$ ${total.toFixed(2)}*`, ``,
      `Quero finalizar meu pedido agora.`,
    ].filter(Boolean).join('\n');
  };

  const handlePayCard = () => window.open(KIRVANO_LINKS[plan.id], '_blank');
  const handlePayWhats = () => {
    const message = buildWhatsMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Barras simulando código de barras
  const barcodeBars = Array.from({ length: 48 }, (_, i) => {
    const w = (i * 7) % 5 === 0 ? 3 : (i % 3 === 0 ? 2 : 1);
    return <div key={i} className="bg-white" style={{ width: `${w}px`, height: '100%' }} />;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cinema-dark to-black flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </button>

        {/* CARD PRINCIPAL */}
        <div className="rounded-2xl overflow-hidden border border-cinema-red/40 shadow-glow bg-gradient-to-b from-cinema-panel to-black relative">
          {/* faixa superior decorativa */}
          <div className="h-1.5 bg-gradient-to-r from-cinema-red via-red-500 to-cinema-red" />

          {/* HEADER */}
          <div className="bg-gradient-to-br from-cinema-red via-red-700 to-black px-6 py-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 mb-3">
                <Ticket className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-[10px] font-bold tracking-[0.3em]">INGRESSO DIGITAL</span>
              </div>
              <img src={cineflixLogo} alt="CINEFLIXPAYMENT" className="h-10 mx-auto mb-2" />
              <p className="text-white/90 text-[11px] tracking-[0.35em] font-bold">COMPROVANTE DE PEDIDO</p>
              <p className="text-white/60 text-[10px] mt-1">Sua sessão começa após a confirmação</p>
            </div>
          </div>

          {/* STATUS + ID */}
          <div className="px-6 pt-5">
            <div className="flex items-center justify-between gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-yellow-300 text-xs font-bold tracking-wide">AGUARDANDO PAGAMENTO</span>
              </div>
              <span className="text-white/50 text-[10px] font-mono">#{orderId}</span>
            </div>
          </div>

          {/* CLIENTE + AUTH */}
          <div className="px-6 pt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Cliente</p>
              <p className="text-white font-bold truncate">{nome}</p>
              {email && <p className="text-white/60 text-[11px] truncate">{email}</p>}
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Cód. Auth</p>
              <p className="text-cinema-red font-mono font-bold tracking-widest">{authCode}</p>
              <p className="text-white/40 text-[10px]">{dateStr} · {timeStr}</p>
            </div>
          </div>

          <div className="mx-6 my-4 border-t border-dashed border-white/15" />

          {/* DESTAQUE DO PLANO */}
          <div className="px-6">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Plano selecionado</p>
            <div className="rounded-xl bg-gradient-to-br from-cinema-red/20 via-black to-cinema-red/10 border border-cinema-red/40 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-lg bg-cinema-red/20 border border-cinema-red/40 flex items-center justify-center flex-shrink-0">
                    <Film className="w-5 h-5 text-cinema-red" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold leading-tight">{plan.name}</p>
                    <p className="text-white/60 text-[11px]">
                      {plan.period === 'único' ? 'Pagamento único · Vitalício' : `Cobrança ${plan.period}`}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white font-bold whitespace-nowrap">R$ {plan.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/60 pt-2 border-t border-white/10">
                <Calendar className="w-3.5 h-3.5 text-cinema-red" />
                {validityLabel}
              </div>
            </div>
          </div>

          {/* ADICIONAIS */}
          {hasUpsells && (
            <>
              <div className="mx-6 my-4 border-t border-dashed border-white/15" />
              <div className="px-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-cinema-red text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Adicionais selecionados
                  </p>
                  <span className="text-white/40 text-[10px]">{selectedUpsells.length} item(ns)</span>
                </div>
                <div className="space-y-2 rounded-xl bg-white/5 border border-white/10 p-3">
                  {selectedUpsells.map((u) => u && (
                    <div key={u.id} className="flex items-start justify-between gap-3 pb-2 last:pb-0 last:border-0 border-b border-white/5">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-cinema-red flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium truncate">{u.name}</p>
                          {u.description && (
                            <p className="text-white/50 text-[11px] line-clamp-2">{u.description}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-white text-sm whitespace-nowrap font-bold">+R$ {u.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SUBTOTAIS */}
          <div className="mx-6 my-4 border-t border-dashed border-white/15" />
          <div className="px-6 space-y-1.5 text-sm">
            <div className="flex items-center justify-between text-white/60">
              <span>Subtotal plano</span>
              <span>R$ {plan.price.toFixed(2)}</span>
            </div>
            {hasUpsells && (
              <div className="flex items-center justify-between text-white/60">
                <span>Subtotal adicionais</span>
                <span>R$ {upsellTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-white/60">
              <span>Desconto aplicado</span>
              <span className="text-green-400">— R$ 0,00</span>
            </div>
          </div>

          {/* TOTAL */}
          <div className="px-6 mt-4">
            <div className="bg-cinema-red border border-cinema-red rounded-xl px-4 py-4 flex items-center justify-between shadow-glow">
              <div>
                <p className="text-white/80 text-[10px] uppercase tracking-widest">Total a pagar</p>
                <p className="text-white text-3xl font-bold leading-none mt-1">R$ {total.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-[10px]">Em até</p>
                <p className="text-white font-bold text-sm">12x no cartão</p>
              </div>
            </div>
          </div>

          {/* AÇÕES */}
          <div className="px-6 pt-5 space-y-3">
            <button
              onClick={handlePayCard}
              className="w-full py-4 rounded-xl bg-cinema-red hover:bg-cinema-glow text-white font-bold flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <CreditCard className="w-5 h-5" />
              Finalizar pagamento
            </button>
            <button
              onClick={handlePayWhats}
              className="w-full py-4 rounded-xl bg-black border border-white/20 hover:border-green-500/60 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              Finalizar no WhatsApp
            </button>
          </div>

          {/* GARANTIAS */}
          <div className="px-6 pt-5 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-center">
              <ShieldCheck className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-white/70 text-[10px] font-bold leading-tight">Compra<br/>segura</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-center">
              <Lock className="w-4 h-4 text-cinema-red mx-auto mb-1" />
              <p className="text-white/70 text-[10px] font-bold leading-tight">Dados<br/>protegidos</p>
            </div>
            <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 text-center">
              <Headphones className="w-4 h-4 text-white mx-auto mb-1" />
              <p className="text-white/70 text-[10px] font-bold leading-tight">Suporte<br/>24/7</p>
            </div>
          </div>

          {/* PERFURAÇÃO TICKET */}
          <div className="relative my-5">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cinema-dark border border-cinema-red/40" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cinema-dark border border-cinema-red/40" />
            <div className="mx-6 border-t-2 border-dashed border-white/20" />
          </div>

          {/* CANHOTO COM CÓDIGO DE BARRAS */}
          <div className="px-6 pb-6">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Canhoto</p>
                <p className="text-white/40 text-[10px] font-mono">{orderId}</p>
              </div>
              <div className="h-12 flex items-center gap-[1px] bg-black rounded px-2">
                {barcodeBars}
              </div>
              <p className="text-center text-white/50 text-[10px] mt-2 font-mono tracking-widest">
                {orderId} · {authCode}
              </p>
            </div>

            <p className="text-center text-white/40 text-[10px] mt-4">
              Obrigado por escolher a <span className="text-cinema-red font-bold">CINEFLIXPAYMENT</span> · Deus abençoe 🙏
            </p>
          </div>

          {/* faixa inferior */}
          <div className="h-1.5 bg-gradient-to-r from-cinema-red via-red-500 to-cinema-red" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutReceipt;
