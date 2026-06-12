import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Trash2, Plus, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';

type Receipt = {
  id: string;
  receipt_no: string;
  amount: number;
  reference_month: string;
  payment_date: string;
  period_start: string;
  period_end: string;
  created_at: string;
};

const monthOptions = () => {
  const out: { value: string; label: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();
    out.push({ value, label });
  }
  return out;
};

const CompanyReceiptsList = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const [rows, setRows] = useState<Receipt[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [authLoading, user, navigate]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('company_receipts')
      .select('*')
      .order('payment_date', { ascending: false });
    if (error) toast.error(error.message);
    setRows((data || []) as Receipt[]);
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const filtered = useMemo(() => {
    if (filter === 'all') return rows;
    return rows.filter(r => r.reference_month.startsWith(filter));
  }, [rows, filter]);

  const total = useMemo(() => filtered.reduce((s, r) => s + Number(r.amount), 0), [filtered]);

  const remove = async (id: string) => {
    if (!confirm('Excluir este registro de recibo?')) return;
    const { error } = await supabase.from('company_receipts').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Excluído');
    load();
  };

  if (authLoading || roleLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Verificando permissões...</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Acesso restrito.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-white/60 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4" /> Painel
          </button>
          <button onClick={() => navigate('/admin/recibo-empresa')}
            className="flex items-center gap-2 h-10 px-4 rounded-md bg-red-600 hover:bg-red-500 font-bold text-sm">
            <Plus className="w-4 h-4" /> Gerar novo recibo Valen
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-1">Histórico de recibos · Valen</h1>
        <p className="text-white/50 text-sm mb-6">Todos os comprovantes gerados (PDF baixado) ficam registrados aqui.</p>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Calendar className="w-4 h-4" /> Filtrar por mês:
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="h-10 rounded-md bg-zinc-900 border border-white/15 px-3 text-sm">
            <option value="all">Todos os meses</option>
            {monthOptions().map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <div className="ml-auto text-sm text-white/70">
            <span className="text-white/40">Total no filtro:</span>{' '}
            <span className="text-red-400 font-bold">R$ {total.toFixed(2)}</span>{' '}
            <span className="text-white/40">({filtered.length} {filtered.length === 1 ? 'recibo' : 'recibos'})</span>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-xl divide-y divide-white/5">
          {loading && <div className="p-6 text-white/50 text-center">Carregando...</div>}
          {!loading && filtered.length === 0 && (
            <div className="p-6 text-center text-white/50">
              Nenhum recibo registrado{filter !== 'all' ? ' neste mês' : ''}.
            </div>
          )}
          {filtered.map(r => {
            const pay = new Date(r.payment_date + 'T12:00:00');
            const ps = new Date(r.period_start + 'T12:00:00');
            const pe = new Date(r.period_end + 'T12:00:00');
            return (
              <div key={r.id} className="p-4 flex items-center gap-4 flex-wrap">
                <div className="w-10 h-10 rounded-md bg-red-600/15 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-red-300">{r.receipt_no}</p>
                  <p className="text-white font-bold text-sm mt-0.5">
                    Pago em {pay.toLocaleDateString('pt-BR')} · R$ {Number(r.amount).toFixed(2)}
                  </p>
                  <p className="text-white/50 text-xs">
                    Vigência: {ps.toLocaleDateString('pt-BR')} → {pe.toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <button onClick={() => remove(r.id)}
                  className="h-9 w-9 rounded-md bg-white/5 hover:bg-red-600/20 flex items-center justify-center text-white/60 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyReceiptsList;
