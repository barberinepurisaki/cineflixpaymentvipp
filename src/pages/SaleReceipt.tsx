import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, ArrowLeft, ShieldCheck, Ticket, Film, Lock, Headphones,
  Sparkles, Star, Calendar, Download, KeyRound, Globe, Smartphone, MessageCircle,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import cineflixLogo from '@/assets/cineflix-logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { WHATSAPP_NUMBER } from '@/data/cineflix';

interface Sale {
  id: string;
  order_code: string;
  customer_name: string;
  customer_whatsapp: string | null;
  plan_name: string;
  plan_period: string | null;
  price: number;
  addons: { name: string; price: number }[];
  total: number;
  access_username: string | null;
  access_password: string | null;
  server_url: string | null;
  app_name: string | null;
  app_instructions: string | null;
  status: string;
  created_at: string;
}

const SaleReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from('sales').select('*').eq('id', id).maybeSingle()
      .then(({ data }) => {
        setSale(data as any);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Carregando...</div>;
  }
  if (!sale) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-3 p-4">
        <p>Comprovante não encontrado.</p>
        <button onClick={() => navigate('/admin')} className="text-red-500 underline">Voltar ao painel</button>
      </div>
    );
  }

  const date = new Date(sale.created_at);
  const dateStr = date.toLocaleDateString('pt-BR');
  const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const authCode = sale.order_code.replace('CFX-', '').toUpperCase();
  const hasUpsells = (sale.addons || []).length > 0;

  const buildWhatsMessage = () => {
    const lines = [
      `*COMPROVANTE CINEFLIXPAYMENT*`,
      `Pedido: ${sale.order_code}`,
      ``,
      `Cliente: ${sale.customer_name}`,
      `Plano: ${sale.plan_name}`,
      hasUpsells ? `Adicionais:\n${sale.addons.map(a => `• ${a.name} — R$ ${Number(a.price).toFixed(2)}`).join('\n')}` : '',
      ``,
      `*Total pago: R$ ${Number(sale.total).toFixed(2)}*`,
      ``,
      `*SEUS DADOS DE ACESSO:*`,
      sale.access_username ? `Usuário: ${sale.access_username}` : '',
      sale.access_password ? `Senha: ${sale.access_password}` : '',
      sale.server_url ? `Servidor: ${sale.server_url}` : '',
      sale.app_name ? `\nApp recomendado: ${sale.app_name}` : '',
      sale.app_instructions ? `\nPasso a passo:\n${sale.app_instructions}` : '',
    ].filter(Boolean).join('\n');
    return lines;
  };

  const handleSendWhats = () => {
    const target = sale.customer_whatsapp?.replace(/\D/g, '') || WHATSAPP_NUMBER;
    window.open(`https://wa.me/${target}?text=${encodeURIComponent(buildWhatsMessage())}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    if (!ticketRef.current || downloading) return;
    setDownloading(true);
    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentMaxY = pageHeight - margin;

      const paintBg = () => {
        pdf.setFillColor(0, 0, 0);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      };
      paintBg();

      const sections = Array.from(
        ticketRef.current.querySelectorAll<HTMLElement>('[data-pdf-section]')
      );
      const targets: HTMLElement[] = sections.length ? sections : [ticketRef.current];

      let currentY = margin;
      const gap = 3;

      for (const el of targets) {
        const canvas = await html2canvas(el, {
          backgroundColor: '#000000', scale: 2, useCORS: true, logging: false,
        });
        const imgData = canvas.toDataURL('image/png');
        let h = (canvas.height * contentWidth) / canvas.width;
        let w = contentWidth;

        // If a single section is taller than a full page, scale it down to fit one page.
        const maxH = pageHeight - margin * 2;
        if (h > maxH) {
          const ratio = maxH / h;
          h = maxH;
          w = contentWidth * ratio;
        }

        if (currentY + h > contentMaxY && currentY > margin) {
          pdf.addPage();
          paintBg();
          currentY = margin;
        }

        const x = margin + (contentWidth - w) / 2;
        pdf.addImage(imgData, 'PNG', x, currentY, w, h);
        currentY += h + gap;
      }

      pdf.save(`comprovante-${sale.order_code}.pdf`);
    } finally {
      setDownloading(false);
    }
  };


  const barcodeBars = Array.from({ length: 56 }, (_, i) => {
    const w = (i * 7) % 5 === 0 ? 3 : (i % 3 === 0 ? 2 : 1);
    return <div key={i} className="bg-white" style={{ width: `${w}px`, height: '100%' }} />;
  });

  const statusPaid = sale.status === 'pago';

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center p-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao painel
        </button>

        <div ref={ticketRef} className="rounded-3xl overflow-hidden shadow-2xl bg-black relative"
          style={{ backgroundImage: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)', boxShadow: '0 0 60px rgba(220, 38, 38, 0.25), 0 0 0 1px rgba(220, 38, 38, 0.4)' }}>
          <div className="h-4 bg-black flex items-center justify-around px-2 border-b border-red-600/30">
            {Array.from({ length: 14 }).map((_, i) => <div key={i} className="w-2 h-2 rounded-sm bg-red-600/40" />)}
          </div>

          <div data-pdf-section className="relative px-6 py-7 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-900 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/30 mb-3 backdrop-blur-sm">
                <Ticket className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-[10px] font-bold tracking-[0.3em]">INGRESSO PREMIUM</span>
              </div>
              <img src={cineflixLogo} alt="Logo CineflixPayment" className="h-11 mx-auto mb-2 drop-shadow-lg" crossOrigin="anonymous" />
              <p className="text-white text-[11px] tracking-[0.4em] font-bold">COMPROVANTE OFICIAL</p>
              <p className="text-white/70 text-[10px] mt-1 italic">Acesso liberado · obrigado pela compra</p>
            </div>
          </div>

          <div data-pdf-section className="px-6 pt-5">
            <div className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 border ${
              statusPaid ? 'bg-green-500/10 border-green-500/40' : 'bg-yellow-500/10 border-yellow-500/40'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 ${statusPaid ? 'text-green-400' : 'text-yellow-400'}`} />
                <span className={`text-xs font-bold tracking-wide ${statusPaid ? 'text-green-300' : 'text-yellow-300'}`}>
                  {statusPaid ? 'PAGAMENTO CONFIRMADO' : sale.status.toUpperCase()}
                </span>
              </div>
              <span className="text-white/60 text-[10px] font-mono">#{sale.order_code}</span>
            </div>
          </div>

          <div data-pdf-section className="px-6 pt-5 grid grid-cols-2 gap-4">
            <div className="min-w-0">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Cliente</p>
              <p className="text-white font-bold truncate">{sale.customer_name}</p>
              {sale.customer_whatsapp && <p className="text-white/60 text-[11px] truncate">{sale.customer_whatsapp}</p>}
            </div>
            <div className="text-right min-w-0">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Cód. Autenticação</p>
              <p className="text-red-500 font-mono font-bold tracking-widest">{authCode}</p>
              <p className="text-white/40 text-[10px]">{dateStr} · {timeStr}</p>
            </div>
          </div>

          <div className="mx-6 my-4 border-t border-dashed border-red-600/30" />

          <div data-pdf-section className="px-6">

            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">Plano selecionado</p>
            <div className="rounded-2xl bg-gradient-to-br from-red-950/60 via-black to-red-950/30 border border-red-600/40 p-4 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-900 border border-red-500/60 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Film className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-bold leading-tight">{sale.plan_name}</p>
                      <p className="text-white/60 text-[11px]">{sale.plan_period || 'Plano contratado'}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-white font-bold whitespace-nowrap">R$ {Number(sale.price).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {hasUpsells && (
            <>
              <div className="mx-6 my-4 border-t border-dashed border-red-600/30" />
              <div data-pdf-section className="px-6">
                <p className="text-red-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> Adicionais inclusos
                </p>
                <div className="space-y-2 rounded-xl bg-white/[0.03] border border-white/10 p-3">
                  {sale.addons.map((u, i) => (
                    <div key={i} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-white text-sm font-medium truncate">{u.name}</p>
                      </div>
                      <p className="text-white text-sm whitespace-nowrap font-bold">+R$ {Number(u.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mx-6 my-4 border-t border-dashed border-red-600/30" />
          <div data-pdf-section className="px-6 mt-2">
            <div className="relative rounded-2xl px-4 py-4 flex items-center justify-between overflow-hidden border border-red-500"
              style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 50%, #7f1d1d 100%)', boxShadow: '0 0 30px rgba(220,38,38,0.5)' }}>
              <div>
                <p className="text-white/80 text-[10px] uppercase tracking-widest">Total pago</p>
                <p className="text-white text-3xl font-bold leading-none mt-1">R$ {Number(sale.total).toFixed(2)}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-white/90" />
            </div>
          </div>

          {/* DADOS DE ACESSO */}
          {(sale.access_username || sale.access_password || sale.server_url) && (
            <div data-pdf-section className="px-6 mt-5">
              <div className="rounded-2xl border-2 border-red-600/60 bg-gradient-to-br from-red-950/40 to-black p-4">
                <div className="flex items-center gap-2 mb-3">
                  <KeyRound className="w-4 h-4 text-red-500" />
                  <p className="text-red-400 text-[11px] uppercase tracking-widest font-bold">Seus dados de acesso</p>
                </div>
                <div className="space-y-2">
                  {sale.access_username && (
                    <div className="flex items-center justify-between gap-3 bg-black/50 rounded-lg px-3 py-2 border border-white/10">
                      <span className="text-white/60 text-[11px]">Usuário</span>
                      <span className="text-white font-mono font-bold text-sm break-all text-right">{sale.access_username}</span>
                    </div>
                  )}
                  {sale.access_password && (
                    <div className="flex items-center justify-between gap-3 bg-black/50 rounded-lg px-3 py-2 border border-white/10">
                      <span className="text-white/60 text-[11px]">Senha</span>
                      <span className="text-white font-mono font-bold text-sm break-all text-right">{sale.access_password}</span>
                    </div>
                  )}
                  {sale.server_url && (
                    <div className="flex items-start justify-between gap-3 bg-black/50 rounded-lg px-3 py-2 border border-white/10">
                      <span className="text-white/60 text-[11px] flex items-center gap-1"><Globe className="w-3 h-3" /> URL servidor</span>
                      <span className="text-white font-mono text-[11px] break-all text-right">{sale.server_url}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* APP RECOMENDADO */}
          {(sale.app_name || sale.app_instructions) && (
            <div data-pdf-section className="px-6 mt-4">
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-red-500" />
                  <p className="text-white text-[11px] uppercase tracking-widest font-bold">Como assistir</p>
                </div>
                {sale.app_name && <p className="text-white font-bold mb-2">{sale.app_name}</p>}
                {sale.app_instructions && (
                  <p className="text-white/70 text-[12px] whitespace-pre-line leading-relaxed">{sale.app_instructions}</p>
                )}
              </div>
            </div>
          )}

          <div data-pdf-section className="px-6 pt-5 grid grid-cols-3 gap-2">
            {[
              { icon: ShieldCheck, color: 'text-green-400', label: 'Compra\nsegura' },
              { icon: Lock, color: 'text-red-500', label: 'Dados\nprotegidos' },
              { icon: Headphones, color: 'text-white', label: 'Suporte\n24/7' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white/[0.03] border border-white/10 p-2.5 text-center">
                <item.icon className={`w-4 h-4 ${item.color} mx-auto mb-1`} />
                <p className="text-white/70 text-[10px] font-bold leading-tight whitespace-pre-line">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="relative my-5">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border border-red-600/40" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border border-red-600/40" />
            <div className="mx-6 border-t-2 border-dashed border-red-600/40" />
          </div>

          <div className="px-6 pb-6">
            <div className="rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Canhoto</p>
                <p className="text-white/40 text-[10px] font-mono">{sale.order_code}</p>
              </div>
              <div className="h-12 flex items-center gap-[1px] bg-white rounded px-2">{barcodeBars}</div>
              <p className="text-center text-white/60 text-[10px] mt-2 font-mono tracking-widest">{sale.order_code} · {authCode}</p>
            </div>
            <p className="text-center text-white/40 text-[10px] mt-4">
              Obrigado por escolher a <span className="text-red-500 font-bold">CINEFLIXPAYMENT</span> · Deus abençoe 🙏
            </p>
          </div>

          <div className="h-4 bg-black flex items-center justify-around px-2 border-t border-red-600/30">
            {Array.from({ length: 14 }).map((_, i) => <div key={i} className="w-2 h-2 rounded-sm bg-red-600/40" />)}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <button onClick={handleDownloadPDF} disabled={downloading}
            className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/40 transition-all duration-300 disabled:opacity-60">
            <Download className="w-5 h-5" />
            {downloading ? 'Gerando PDF...' : 'Baixar comprovante em PDF'}
          </button>
          <button onClick={handleSendWhats}
            className="w-full py-4 rounded-xl bg-black border border-white/20 hover:border-green-500/60 text-white font-bold flex items-center justify-center gap-2 transition-all duration-300">
            <MessageCircle className="w-5 h-5 text-green-400" />
            Enviar dados pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleReceipt;
