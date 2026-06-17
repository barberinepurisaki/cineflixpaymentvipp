import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Eye, MousePointerClick, QrCode, CheckCircle2, XCircle, RotateCcw, TrendingUp, DollarSign } from 'lucide-react';

type FunnelEvent = {
  event_name: string;
  session_id: string | null;
  value: number | null;
  created_at: string;
};

type CaktoSale = {
  event_type: string;
  status: string;
  amount: number | null;
  created_at: string;
};

const monthOptions = () => {
  const arr: { value: string; label: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    arr.push({ value, label });
  }
  return arr;
};

const FunnelTab = () => {
  const [funnel, setFunnel] = useState<FunnelEvent[]>([]);
  const [sales, setSales] = useState<CaktoSale[]>([]);
  const [month, setMonth] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [y, m] = month.split('-').map(Number);
      const start = new Date(y, m - 1, 1).toISOString();
      const end = new Date(y, m, 1).toISOString();

      const [{ data: f }, { data: s }] = await Promise.all([
        supabase.from('funnel_events').select('event_name, session_id, value, created_at')
          .gte('created_at', start).lt('created_at', end).limit(50000),
        supabase.from('cakto_sales').select('event_type, status, amount, created_at')
          .gte('created_at', start).lt('created_at', end).limit(10000),
      ]);
      setFunnel((f as any) || []);
      setSales((s as any) || []);
      setLoading(false);
    })();
  }, [month]);

  const metrics = useMemo(() => {
    const uniqueSessions = new Set(funnel.filter(e => e.event_name === 'page_view').map(e => e.session_id || '')).size;
    const checkoutSessions = new Set(funnel.filter(e => e.event_name === 'begin_checkout').map(e => e.session_id || '')).size;
    const pixGenerated = sales.filter(s => s.event_type === 'pix_generated').length;
    const pixPaid = sales.filter(s => s.event_type === 'pix_paid').length;
    const refused = sales.filter(s => s.event_type === 'payment_refused').length;
    const refunded = sales.filter(s => s.event_type === 'refund').length;
    const revenue = sales.filter(s => s.event_type === 'pix_paid').reduce((sum, s) => sum + Number(s.amount || 0), 0);
    const abandoned = Math.max(0, pixGenerated - pixPaid);
    const convRate = uniqueSessions > 0 ? (pixPaid / uniqueSessions) * 100 : 0;

    return { uniqueSessions, checkoutSessions, pixGenerated, pixPaid, refused, refunded, revenue, abandoned, convRate };
  }, [funnel, sales]);

  const funnelSteps = [
    { label: 'Visitantes', value: metrics.uniqueSessions, icon: Eye, color: 'text-blue-400' },
    { label: 'Checkout iniciado', value: metrics.checkoutSessions, icon: MousePointerClick, color: 'text-yellow-400' },
    { label: 'PIX gerado', value: metrics.pixGenerated, icon: QrCode, color: 'text-orange-400' },
    { label: 'PIX pago', value: metrics.pixPaid, icon: CheckCircle2, color: 'text-green-400' },
  ];

  const maxStep = Math.max(...funnelSteps.map(s => s.value), 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold">Funil de Conversão</h2>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="h-10 rounded-md border border-white/10 bg-zinc-900 px-3 text-sm text-white"
        >
          {monthOptions().map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-white/60 text-sm">Carregando dados...</p>}

      {/* Cards de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard icon={TrendingUp} label="Taxa de conversão" value={`${metrics.convRate.toFixed(2)}%`} color="text-cinema-red" />
        <MetricCard icon={DollarSign} label="Faturamento" value={`R$ ${metrics.revenue.toFixed(2)}`} color="text-green-400" />
        <MetricCard icon={QrCode} label="PIX abandonados" value={metrics.abandoned} color="text-orange-400" />
        <MetricCard icon={CheckCircle2} label="Vendas aprovadas" value={metrics.pixPaid} color="text-green-500" />
        <MetricCard icon={XCircle} label="Pagamentos recusados" value={metrics.refused} color="text-red-400" />
        <MetricCard icon={RotateCcw} label="Reembolsos" value={metrics.refunded} color="text-amber-400" />
        <MetricCard icon={Eye} label="Visitantes únicos" value={metrics.uniqueSessions} color="text-blue-400" />
        <MetricCard icon={MousePointerClick} label="Checkouts iniciados" value={metrics.checkoutSessions} color="text-yellow-400" />
      </div>

      {/* Funil visual */}
      <Card className="bg-zinc-900/50 border-white/10 p-6">
        <h3 className="text-lg font-bold mb-4 text-white">Funil de etapas</h3>
        <div className="space-y-3">
          {funnelSteps.map((step, i) => {
            const widthPct = (step.value / maxStep) * 100;
            const prev = i > 0 ? funnelSteps[i - 1].value : null;
            const dropPct = prev && prev > 0 ? ((prev - step.value) / prev) * 100 : 0;
            return (
              <div key={step.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-2 text-white text-sm font-semibold">
                    <step.icon className={`w-4 h-4 ${step.color}`} />
                    {step.label}
                  </span>
                  <span className="text-white/70 text-sm">
                    <span className="font-bold text-white">{step.value}</span>
                    {i > 0 && prev !== null && prev > 0 && (
                      <span className="text-red-400 ml-2 text-xs">-{dropPct.toFixed(1)}%</span>
                    )}
                  </span>
                </div>
                <div className="w-full h-8 bg-black/40 rounded-md overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cinema-red to-cinema-glow transition-all duration-500"
                    style={{ width: `${Math.max(widthPct, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, color }: any) => (
  <Card className="bg-zinc-900/50 border-white/10 p-4">
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-white/60 text-xs">{label}</span>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
  </Card>
);

export default FunnelTab;
