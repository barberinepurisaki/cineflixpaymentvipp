import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle2, Building2, User2, FileText, KeyRound } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import cineflixLogo from '@/assets/cineflix-logo.png';

/**
 * Recibo recorrente mensal — Cliente: VALEN SUPERMERCADO LTDA
 * Recebedor (CPF): Hemerson Deckson da Silva dos Santos
 * Plano Mensal — R$ 29,90 · Pix · cineflixpayment@gmail.com
 *
 * As datas são geradas automaticamente todo mês (período = mês atual).
 */

const fmtBR = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

const monthLabel = (d: Date) =>
  d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();

const CompanyReceipt = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [refDate, setRefDate] = useState<string>(today.toISOString().slice(0, 10));
  const [downloading, setDownloading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [serial, setSerial] = useState<string>(() =>
    `${Date.now().toString(36).toUpperCase().slice(-5)}${Math.random().toString(36).toUpperCase().slice(2, 5)}`
  );

  const { paymentDate, periodStart, periodEnd, receiptNo } = useMemo(() => {
    const d = new Date(refDate + 'T12:00:00');
    const start = new Date(d);
    const end = new Date(d);
    end.setMonth(end.getMonth() + 1);
    const no = `CFX-VAL-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}-${serial}`;
    return { paymentDate: d, periodStart: start, periodEnd: end, receiptNo: no };
  }, [refDate, serial]);

  const regenerateSerial = () => {
    setSerial(`${Date.now().toString(36).toUpperCase().slice(-5)}${Math.random().toString(36).toUpperCase().slice(2, 5)}`);
  };

  const handleDownload = async () => {
    if (!ref.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ref.current, { backgroundColor: '#000', scale: 2, useCORS: true, logging: false });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const w = pageW - margin * 2;
      const h = (canvas.height * w) / canvas.width;
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pageW, pageH, 'F');
      const y = h <= pageH - margin * 2 ? (pageH - h) / 2 : margin;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, y, w, Math.min(h, pageH - margin * 2));
      pdf.save(`recibo-cineflix-valen-${receiptNo}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white p-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar ao painel
        </button>

        <div className="bg-zinc-900/60 border border-red-600/30 rounded-xl p-4 mb-5 flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <label className="text-xs uppercase tracking-widest text-white/50">Data do pagamento (referência mensal)</label>
            <input type="date" value={refDate} onChange={e => setRefDate(e.target.value)}
              className="w-full mt-1 h-10 rounded-md bg-black border border-white/15 px-3 text-sm" />
            <p className="text-[11px] text-white/40 mt-1">
              Período gerado automaticamente: <span className="text-red-400">{fmtBR(periodStart)} → {fmtBR(periodEnd)}</span>
            </p>
          </div>
          <button onClick={regenerateSerial}
            className="h-10 px-4 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 font-bold flex items-center gap-2 text-sm">
            Novo nº
          </button>
          <button onClick={handleDownload} disabled={downloading}
            className="h-10 px-4 rounded-md bg-red-600 hover:bg-red-500 font-bold flex items-center gap-2 disabled:opacity-60">
            <Download className="w-4 h-4" />
            {downloading ? 'Gerando...' : 'Baixar PDF'}
          </button>
        </div>

        <div ref={ref} className="rounded-2xl overflow-hidden bg-black border border-red-600/40 shadow-[0_0_60px_rgba(220,38,38,0.25)]">
          {/* Header */}
          <div className="relative px-8 py-7 text-center bg-gradient-to-br from-red-700 via-red-900 to-black">
            <img src={cineflixLogo} alt="Cineflixpayment" className="h-12 mx-auto mb-2" crossOrigin="anonymous" />
            <p className="text-white text-[11px] tracking-[0.4em] font-bold">RECIBO DE PAGAMENTO</p>
            <p className="text-white/70 text-[10px] mt-1 italic">Documento fiscal de quitação · Cineflixpayment</p>
          </div>

          {/* Meta */}
          <div className="px-8 pt-6 pb-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Nº do Recibo</p>
              <p className="text-red-400 font-mono font-bold">{receiptNo}</p>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Competência</p>
              <p className="text-white font-bold">{monthLabel(paymentDate)}</p>
            </div>
          </div>

          <div className="mx-8 my-4 border-t border-dashed border-red-600/40" />

          {/* VALOR — alinhado com linha vermelha padrão */}
          <div className="px-8">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Valor recebido</p>
            <div className="rounded-xl border-2 border-red-500 bg-gradient-to-r from-red-700 via-red-800 to-red-900 px-6 py-5 flex items-center justify-between gap-4 shadow-[0_0_30px_rgba(220,38,38,0.45)]">
              <div className="flex items-center gap-3 min-w-0">
                <CheckCircle2 className="w-7 h-7 text-white/95 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white/80 text-[10px] uppercase tracking-widest leading-none">Total quitado</p>
                  <p className="text-white/70 text-[11px] mt-1">Via PIX · pago em {fmtBR(paymentDate)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-3xl sm:text-4xl font-bold leading-none tabular-nums tracking-tight">R$&nbsp;29,90</p>
                <p className="text-white/70 text-[10px] mt-1 uppercase tracking-widest">vinte e nove reais e noventa centavos</p>
              </div>
            </div>
          </div>

          {/* Recebedor */}
          <div className="px-8 mt-6">
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
              <User2 className="w-3.5 h-3.5" /> Recebedor
            </p>
            <div className="rounded-lg bg-white/[0.04] border border-white/10 p-4 text-sm space-y-1">
              <p className="text-white font-bold">HEMERSON DECKSON DA SILVA DOS SANTOS</p>
              <p className="text-white/70">CPF: <span className="font-mono">627.688.683-10</span></p>
              <p className="text-white/70 flex items-center gap-1.5"><KeyRound className="w-3 h-3" /> Chave PIX: <span className="font-mono">cineflixpayment@gmail.com</span></p>
            </div>
          </div>

          {/* Pagador */}
          <div className="px-8 mt-4">
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
              <Building2 className="w-3.5 h-3.5" /> Pagador
            </p>
            <div className="rounded-lg bg-white/[0.04] border border-white/10 p-4 text-sm space-y-1">
              <p className="text-white font-bold">VALEN SUPERMERCADO LTDA</p>
              <p className="text-white/70">CNPJ: <span className="font-mono">46.847.801/0002-79</span></p>
              <p className="text-white/70">Filial: Minimercado Valen 2</p>
            </div>
          </div>

          {/* Serviço */}
          <div className="px-8 mt-4">
            <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
              <FileText className="w-3.5 h-3.5" /> Serviço prestado
            </p>
            <div className="rounded-lg bg-white/[0.04] border border-white/10 p-4 text-sm space-y-1">
              <p className="text-white font-bold">Assinatura Cineflix · Plano Mensal</p>
              <p className="text-white/70">Período de vigência: {fmtBR(periodStart)} a {fmtBR(periodEnd)}</p>
              <p className="text-white/70">Forma de pagamento: PIX</p>
            </div>
          </div>

          {/* Declaração */}
          <div className="px-8 mt-5">
            <div className="rounded-lg border border-red-500/60 bg-red-950/20 p-4 text-[12px] text-white/80 leading-relaxed">
              Declaro, para os devidos fins, ter recebido da empresa <b>VALEN SUPERMERCADO LTDA</b> (CNPJ
              46.847.801/0002-79) a importância de <b>R$ 29,90 (vinte e nove reais e noventa centavos)</b>,
              referente à assinatura mensal do serviço Cineflix, dando plena, geral e irrevogável quitação
              do período acima indicado.
            </div>
          </div>

          {/* Assinatura */}
          <div className="px-8 mt-8 pb-2 text-center">
            <div className="mx-auto w-72 border-t border-white/40 pt-2 text-[12px] text-white/80">
              Hemerson Deckson da Silva dos Santos<br />
              <span className="text-white/50 text-[10px]">CPF 627.688.683-10</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 px-8 py-3 bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-center">
            <p className="text-white text-[10px] tracking-[0.3em] font-bold">CINEFLIX<span className="text-white/70">PAYMENT</span></p>
            <p className="text-white/70 text-[9px] mt-0.5">Documento gerado eletronicamente · válido sem assinatura física</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyReceipt;
