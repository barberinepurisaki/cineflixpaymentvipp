import { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Plus, Trash2, Edit, Receipt, Package, Sparkles, Film, ArrowLeft, ExternalLink,
  CheckCircle2, Clock, FileText, X,
} from 'lucide-react';

type Sale = {
  id: string; order_code: string; customer_name: string; customer_whatsapp: string | null;
  plan_id: string; plan_name: string; plan_period: string | null;
  price: number; addons: any[]; total: number;
  access_username: string | null; access_password: string | null;
  server_url: string | null; app_name: string | null; app_instructions: string | null;
  status: string; created_at: string;
};
type CatPlan = { id: string; name: string; price: number; period: string; icon: string | null;
  features: string[]; featured: boolean; discount: string | null; payment_url: string | null;
  sort_order: number; active: boolean; };
type CatUpsell = { id: string; name: string; description: string | null; price: number; sort_order: number; active: boolean; };
type CatMovie = { id: string; title: string; image_url: string | null; category: string | null;
  year: number | null; duration: string | null; rating: number | null; description: string | null;
  trailer_url: string | null; sort_order: number; active: boolean; };

const Admin = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [authLoading, user, navigate]);

  if (authLoading || roleLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Verificando permissões...</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold">Acesso restrito</h1>
        <p className="text-white/60">Sua conta não tem permissão de administrador.</p>
        <Button onClick={() => navigate('/')} variant="cinema">Voltar ao site</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <header className="sticky top-0 z-20 bg-black/95 backdrop-blur border-b border-red-600/30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/" className="text-white/60 hover:text-white"><ArrowLeft className="w-4 h-4" /></Link>
            <h1 className="font-cinema text-lg sm:text-2xl truncate">
              CINEFLIX<span className="text-red-500">PAYMENT</span> · ADMIN
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-white/50 truncate max-w-[160px]">{user.email}</span>
            <Button size="sm" variant="outline" onClick={() => signOut().then(() => navigate('/'))}>Sair</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="vendas" className="w-full">
          <TabsList className="grid grid-cols-4 w-full bg-zinc-900 border border-white/10">
            <TabsTrigger value="vendas"><Receipt className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Vendas</span></TabsTrigger>
            <TabsTrigger value="planos"><Package className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Planos</span></TabsTrigger>
            <TabsTrigger value="upsells"><Sparkles className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Adicionais</span></TabsTrigger>
            <TabsTrigger value="filmes"><Film className="w-4 h-4 sm:mr-2" /><span className="hidden sm:inline">Filmes</span></TabsTrigger>
          </TabsList>

          <TabsContent value="vendas" className="mt-4"><SalesTab /></TabsContent>
          <TabsContent value="planos" className="mt-4"><PlansTab /></TabsContent>
          <TabsContent value="upsells" className="mt-4"><UpsellsTab /></TabsContent>
          <TabsContent value="filmes" className="mt-4"><MoviesTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

/* ==================== VENDAS ==================== */
const blankSale = {
  customer_name: '', customer_whatsapp: '',
  plan_id: '', plan_name: '', plan_period: '',
  price: 0, addons: [] as { name: string; price: number }[],
  access_username: '', access_password: '',
  server_url: '', app_name: '', app_instructions: '',
  status: 'pago', notes: '',
};

const SalesTab = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState<Sale[]>([]);
  const [plans, setPlans] = useState<CatPlan[]>([]);
  const [upsells, setUpsells] = useState<CatUpsell[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sale | null>(null);
  const [form, setForm] = useState({ ...blankSale });
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const load = async () => {
    const [{ data: s }, { data: p }, { data: u }] = await Promise.all([
      supabase.from('sales').select('*').order('created_at', { ascending: false }),
      supabase.from('catalog_plans').select('*').eq('active', true).order('sort_order'),
      supabase.from('catalog_upsells').select('*').eq('active', true).order('sort_order'),
    ]);
    setSales((s || []) as any);
    setPlans((p || []) as any);
    setUpsells((u || []) as any);
  };
  useEffect(() => { load(); }, []);

  const total = useMemo(() => {
    const addons = selectedAddons.map(id => upsells.find(u => u.id === id)).filter(Boolean) as CatUpsell[];
    return Number(form.price || 0) + addons.reduce((s, a) => s + Number(a.price), 0);
  }, [form.price, selectedAddons, upsells]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...blankSale });
    setSelectedAddons([]);
    setOpen(true);
  };

  const openEdit = (s: Sale) => {
    setEditing(s);
    setForm({
      customer_name: s.customer_name, customer_whatsapp: s.customer_whatsapp || '',
      plan_id: s.plan_id, plan_name: s.plan_name, plan_period: s.plan_period || '',
      price: Number(s.price), addons: s.addons || [],
      access_username: s.access_username || '', access_password: s.access_password || '',
      server_url: s.server_url || '', app_name: s.app_name || '',
      app_instructions: s.app_instructions || '', status: s.status, notes: '',
    });
    setSelectedAddons([]);
    setOpen(true);
  };

  const onSelectPlan = (planId: string) => {
    const p = plans.find(x => x.id === planId);
    if (!p) return;
    setForm(f => ({ ...f, plan_id: p.id, plan_name: p.name, plan_period: p.period, price: Number(p.price) }));
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const save = async () => {
    if (!form.customer_name || !form.plan_id) {
      toast.error('Preencha o nome do cliente e selecione o plano.');
      return;
    }
    const addons = editing
      ? form.addons
      : selectedAddons.map(id => {
          const u = upsells.find(u => u.id === id)!;
          return { name: u.name, price: Number(u.price) };
        });
    const computedTotal = Number(form.price) + addons.reduce((s, a) => s + Number(a.price), 0);

    const payload: any = {
      customer_name: form.customer_name,
      customer_whatsapp: form.customer_whatsapp || null,
      plan_id: form.plan_id, plan_name: form.plan_name, plan_period: form.plan_period || null,
      price: Number(form.price), addons, total: computedTotal,
      access_username: form.access_username || null,
      access_password: form.access_password || null,
      server_url: form.server_url || null,
      app_name: form.app_name || null,
      app_instructions: form.app_instructions || null,
      status: form.status,
    };

    if (editing) {
      const { error } = await supabase.from('sales').update(payload).eq('id', editing.id);
      if (error) { toast.error(error.message); return; }
      toast.success('Venda atualizada');
    } else {
      const { data, error } = await supabase.from('sales').insert(payload).select().single();
      if (error) { toast.error(error.message); return; }
      toast.success('Venda cadastrada');
      setOpen(false);
      await load();
      navigate(`/admin/comprovante/${data.id}`);
      return;
    }
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir esta venda?')) return;
    const { error } = await supabase.from('sales').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success('Excluído');
    load();
  };

  const togglePaid = async (s: Sale) => {
    const status = s.status === 'pago' ? 'pendente' : 'pago';
    const { error } = await supabase.from('sales').update({ status }).eq('id', s.id);
    if (error) { toast.error(error.message); return; }
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold">Vendas / Comprovantes</h2>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => navigate('/admin/recibo-empresa')} variant="outline" className="border-red-500/60 text-red-300 hover:bg-red-600/10">
            <FileText className="w-4 h-4 mr-2" /> Recibo Valen (mensal)
          </Button>
          <Button onClick={openNew} className="bg-red-600 hover:bg-red-500"><Plus className="w-4 h-4 mr-2" /> Nova venda</Button>
        </div>
      </div>

      <div className="grid gap-3">
        {sales.length === 0 && (
          <Card className="bg-zinc-900/50 border-white/10 p-6 text-center text-white/50">
            Nenhuma venda registrada ainda. Clique em <span className="text-red-500 font-bold">Nova venda</span> para começar.
          </Card>
        )}
        {sales.map(s => (
          <Card key={s.id} className="bg-zinc-900/50 border-white/10 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs text-red-400">{s.order_code}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    s.status === 'pago' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>{s.status.toUpperCase()}</span>
                </div>
                <p className="text-white font-bold mt-1 truncate">{s.customer_name}</p>
                <p className="text-white/60 text-sm truncate">{s.plan_name} · R$ {Number(s.total).toFixed(2)}</p>
                <p className="text-white/40 text-[11px]">{new Date(s.created_at).toLocaleString('pt-BR')}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" variant="outline" onClick={() => togglePaid(s)}>
                  {s.status === 'pago' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span className="ml-1 hidden sm:inline">{s.status === 'pago' ? 'Marcar pendente' : 'Marcar pago'}</span>
                </Button>
                <Button size="sm" variant="outline" onClick={() => openEdit(s)}><Edit className="w-4 h-4" /></Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-500" onClick={() => navigate(`/admin/comprovante/${s.id}`)}>
                  <FileText className="w-4 h-4 mr-1" /> Comprovante
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-950 border-red-600/40 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar venda' : 'Nova venda manual'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>Nome do cliente *</Label>
                <Input value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} />
              </div>
              <div>
                <Label>WhatsApp (com DDD)</Label>
                <Input value={form.customer_whatsapp} onChange={e => setForm({ ...form, customer_whatsapp: e.target.value })} placeholder="5598999999999" />
              </div>
            </div>

            <div>
              <Label>Plano *</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.plan_id} onChange={e => onSelectPlan(e.target.value)}>
                <option value="">Selecione...</option>
                {plans.map(p => <option key={p.id} value={p.id}>{p.name} — R$ {Number(p.price).toFixed(2)}</option>)}
              </select>
            </div>

            {!editing && (
              <div>
                <Label>Adicionais</Label>
                <div className="grid sm:grid-cols-2 gap-2 mt-1">
                  {upsells.map(u => (
                    <button type="button" key={u.id} onClick={() => toggleAddon(u.id)}
                      className={`text-left p-2 rounded border ${selectedAddons.includes(u.id) ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-black/30'}`}>
                      <p className="text-sm font-medium">{u.name}</p>
                      <p className="text-xs text-white/50">+R$ {Number(u.price).toFixed(2)}</p>
                    </button>
                  ))}
                </div>
                <p className="text-right text-white/70 text-sm mt-2">Total: <span className="text-red-400 font-bold">R$ {total.toFixed(2)}</span></p>
              </div>
            )}

            <div className="border-t border-white/10 pt-3">
              <p className="text-red-400 text-xs font-bold uppercase mb-2">Dados de acesso</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label>Usuário</Label>
                  <Input value={form.access_username} onChange={e => setForm({ ...form, access_username: e.target.value })} />
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input value={form.access_password} onChange={e => setForm({ ...form, access_password: e.target.value })} />
                </div>
              </div>
              <div className="mt-3">
                <Label>URL do servidor</Label>
                <Input value={form.server_url} onChange={e => setForm({ ...form, server_url: e.target.value })} placeholder="http://servidor.com:8080/get.php" />
              </div>
            </div>

            <div className="border-t border-white/10 pt-3">
              <p className="text-red-400 text-xs font-bold uppercase mb-2">Como assistir</p>
              <div>
                <Label>App recomendado</Label>
                <Input value={form.app_name} onChange={e => setForm({ ...form, app_name: e.target.value })} placeholder="Ex: IBO Player Pro" />
              </div>
              <div className="mt-3">
                <Label>Passo a passo / Instruções</Label>
                <Textarea rows={4} value={form.app_instructions} onChange={e => setForm({ ...form, app_instructions: e.target.value })} placeholder="1. Baixe o app na Play Store...&#10;2. Abra e cole a URL acima...&#10;3. Faça login com o usuário e senha." />
              </div>
            </div>

            <div>
              <Label>Status</Label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="bg-red-600 hover:bg-red-500" onClick={save}>
              {editing ? 'Salvar' : 'Cadastrar e gerar comprovante'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ==================== PLANOS ==================== */
const PlansTab = () => {
  const [items, setItems] = useState<CatPlan[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatPlan | null>(null);
  const blank: CatPlan = { id: '', name: '', price: 0, period: '/mês', icon: '📱', features: [], featured: false, discount: '', payment_url: '', sort_order: 0, active: true };
  const [form, setForm] = useState<CatPlan>(blank);
  const [featuresText, setFeaturesText] = useState('');

  const load = async () => {
    const { data } = await supabase.from('catalog_plans').select('*').order('sort_order');
    setItems((data || []) as any);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(blank); setFeaturesText(''); setOpen(true); };
  const openEdit = (p: CatPlan) => {
    setEditing(p);
    setForm({ ...p, features: p.features || [], discount: p.discount || '', payment_url: p.payment_url || '', icon: p.icon || '' });
    setFeaturesText((p.features || []).join('\n'));
    setOpen(true);
  };

  const save = async () => {
    if (!form.id || !form.name) { toast.error('ID e nome são obrigatórios'); return; }
    const payload = {
      ...form,
      features: featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      price: Number(form.price), sort_order: Number(form.sort_order),
    };
    if (editing) {
      const { error } = await supabase.from('catalog_plans').update(payload).eq('id', editing.id);
      if (error) { toast.error(error.message); return; }
    } else {
      const { error } = await supabase.from('catalog_plans').insert(payload);
      if (error) { toast.error(error.message); return; }
    }
    toast.success('Plano salvo');
    setOpen(false); load();
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir este plano?')) return;
    const { error } = await supabase.from('catalog_plans').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Planos</h2>
        <Button onClick={openNew} className="bg-red-600 hover:bg-red-500"><Plus className="w-4 h-4 mr-2" /> Novo plano</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map(p => (
          <Card key={p.id} className="bg-zinc-900/50 border-white/10 p-4">
            <div className="flex justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2"><span>{p.icon}</span><p className="font-bold truncate">{p.name}</p></div>
                <p className="text-red-400 font-bold">R$ {Number(p.price).toFixed(2)} <span className="text-white/50 text-xs">{p.period}</span></p>
                <p className="text-white/40 text-[11px] mt-1">{p.features.length} benefícios · {p.active ? 'Ativo' : 'Inativo'}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Edit className="w-3 h-3" /></Button>
                <Button size="sm" variant="destructive" onClick={() => remove(p.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-950 border-red-600/40 max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Editar plano' : 'Novo plano'}</DialogTitle></DialogHeader>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>ID *</Label><Input disabled={!!editing} value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} placeholder="ex: semestral" /></div>
            <div><Label>Nome *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Preço</Label><Input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} /></div>
            <div><Label>Período</Label><Input value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} placeholder="/mês" /></div>
            <div><Label>Ícone (emoji)</Label><Input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} /></div>
            <div><Label>Destaque (badge)</Label><Input value={form.discount || ''} onChange={e => setForm({ ...form, discount: e.target.value })} placeholder="Ex: ECONOMIZE 20%" /></div>
            <div className="sm:col-span-2"><Label>URL de pagamento</Label><Input value={form.payment_url || ''} onChange={e => setForm({ ...form, payment_url: e.target.value })} /></div>
            <div className="sm:col-span-2">
              <Label>Benefícios (um por linha)</Label>
              <Textarea rows={5} value={featuresText} onChange={e => setFeaturesText(e.target.value)} />
            </div>
            <div><Label>Ordem</Label><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-end gap-3"><Switch checked={form.featured} onCheckedChange={v => setForm({ ...form, featured: v })} /><Label>Em destaque</Label></div>
            <div className="flex items-end gap-3"><Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} /><Label>Ativo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="bg-red-600 hover:bg-red-500" onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ==================== UPSELLS ==================== */
const UpsellsTab = () => {
  const [items, setItems] = useState<CatUpsell[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatUpsell | null>(null);
  const blank: CatUpsell = { id: '', name: '', description: '', price: 0, sort_order: 0, active: true };
  const [form, setForm] = useState<CatUpsell>(blank);

  const load = async () => {
    const { data } = await supabase.from('catalog_upsells').select('*').order('sort_order');
    setItems((data || []) as any);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.id || !form.name) { toast.error('ID e nome obrigatórios'); return; }
    const payload = { ...form, price: Number(form.price), sort_order: Number(form.sort_order) };
    const op = editing
      ? supabase.from('catalog_upsells').update(payload).eq('id', editing.id)
      : supabase.from('catalog_upsells').insert(payload);
    const { error } = await op;
    if (error) { toast.error(error.message); return; }
    toast.success('Adicional salvo'); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm('Excluir?')) return;
    await supabase.from('catalog_upsells').delete().eq('id', id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Adicionais (Upsells)</h2>
        <Button onClick={() => { setEditing(null); setForm(blank); setOpen(true); }} className="bg-red-600 hover:bg-red-500"><Plus className="w-4 h-4 mr-2" /> Novo</Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {items.map(u => (
          <Card key={u.id} className="bg-zinc-900/50 border-white/10 p-4 flex justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold truncate">{u.name}</p>
              <p className="text-white/60 text-xs truncate">{u.description}</p>
              <p className="text-red-400 font-bold mt-1">+R$ {Number(u.price).toFixed(2)}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Button size="sm" variant="outline" onClick={() => { setEditing(u); setForm({ ...u, description: u.description || '' }); setOpen(true); }}><Edit className="w-3 h-3" /></Button>
              <Button size="sm" variant="destructive" onClick={() => remove(u.id)}><Trash2 className="w-3 h-3" /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-950 border-red-600/40">
          <DialogHeader><DialogTitle>{editing ? 'Editar adicional' : 'Novo adicional'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>ID *</Label><Input disabled={!!editing} value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} /></div>
            <div><Label>Nome *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Descrição</Label><Input value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Preço</Label><Input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} /></div>
              <div><Label>Ordem</Label><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="flex items-center gap-3"><Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} /><Label>Ativo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="bg-red-600 hover:bg-red-500" onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

/* ==================== FILMES ==================== */
const MoviesTab = () => {
  const [items, setItems] = useState<CatMovie[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CatMovie | null>(null);
  const blank: CatMovie = { id: '', title: '', image_url: '', category: '', year: 2026, duration: '', rating: 8.5, description: '', trailer_url: '', sort_order: 0, active: true };
  const [form, setForm] = useState<CatMovie>(blank);

  const load = async () => {
    const { data } = await supabase.from('catalog_movies').select('*').order('sort_order');
    setItems((data || []) as any);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.title) { toast.error('Título obrigatório'); return; }
    const payload: any = { ...form, year: Number(form.year), rating: Number(form.rating), sort_order: Number(form.sort_order) };
    delete payload.id;
    const op = editing
      ? supabase.from('catalog_movies').update(payload).eq('id', editing.id)
      : supabase.from('catalog_movies').insert(payload);
    const { error } = await op;
    if (error) { toast.error(error.message); return; }
    toast.success('Filme salvo'); setOpen(false); load();
  };
  const remove = async (id: string) => {
    if (!confirm('Excluir?')) return;
    await supabase.from('catalog_movies').delete().eq('id', id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Filmes em destaque</h2>
        <Button onClick={() => { setEditing(null); setForm(blank); setOpen(true); }} className="bg-red-600 hover:bg-red-500"><Plus className="w-4 h-4 mr-2" /> Novo filme</Button>
      </div>
      {items.length === 0 && (
        <Card className="bg-zinc-900/50 border-white/10 p-6 text-center text-white/50">
          Nenhum filme custom cadastrado. Os filmes do site usam a API TMDB; aqui você pode cadastrar destaques personalizados.
        </Card>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(m => (
          <Card key={m.id} className="bg-zinc-900/50 border-white/10 overflow-hidden">
            {m.image_url && <img src={m.image_url} alt={m.title} className="w-full h-40 object-cover" />}
            <div className="p-3">
              <p className="font-bold truncate">{m.title}</p>
              <p className="text-white/50 text-xs">{m.category} · {m.year} · ⭐ {m.rating}</p>
              <div className="flex gap-1 mt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => { setEditing(m); setForm({ ...m, image_url: m.image_url || '', category: m.category || '', duration: m.duration || '', description: m.description || '', trailer_url: m.trailer_url || '' }); setOpen(true); }}><Edit className="w-3 h-3" /></Button>
                <Button size="sm" variant="destructive" onClick={() => remove(m.id)}><Trash2 className="w-3 h-3" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-950 border-red-600/40 max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Editar filme' : 'Novo filme'}</DialogTitle></DialogHeader>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2"><Label>Título *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>URL imagem (poster)</Label><Input value={form.image_url || ''} onChange={e => setForm({ ...form, image_url: e.target.value })} /></div>
            <div><Label>Categoria</Label><Input value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Ano</Label><Input type="number" value={form.year || ''} onChange={e => setForm({ ...form, year: parseInt(e.target.value) || 0 })} /></div>
            <div><Label>Duração</Label><Input value={form.duration || ''} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="2h 15min" /></div>
            <div><Label>Nota</Label><Input type="number" step="0.1" value={form.rating || ''} onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} /></div>
            <div className="sm:col-span-2"><Label>Descrição</Label><Textarea rows={3} value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <div className="sm:col-span-2"><Label>URL trailer (embed)</Label><Input value={form.trailer_url || ''} onChange={e => setForm({ ...form, trailer_url: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-end gap-3"><Switch checked={form.active} onCheckedChange={v => setForm({ ...form, active: v })} /><Label>Ativo</Label></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button className="bg-red-600 hover:bg-red-500" onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
