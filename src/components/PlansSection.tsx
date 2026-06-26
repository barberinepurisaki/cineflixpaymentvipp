import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Plus, Minus, User2 } from 'lucide-react';
import { plans, upsells } from '@/data/cineflix';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Plan } from '@/types';
import { analytics } from '@/lib/analytics';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import planMensalIcon from '@/assets/plan-mensal-new.png';
import planTrimestralIcon from '@/assets/plan-trimestral-new.png';
import planAnualIcon from '@/assets/plan-anual-new.png';
import planApkIcon from '@/assets/plan-apk-icon.png';

const PlansSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [showUpsells, setShowUpsells] = useState(false);
  const [askName, setAskName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setSelectedUpsells([]);
    setShowUpsells(true);
    analytics.viewContent(plan.id, plan.name, plan.price);
    setTimeout(() => {
      document.getElementById('upsells-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const toggleUpsell = (upsellId: string) => {
    setSelectedUpsells(prev =>
      prev.includes(upsellId) ? prev.filter(id => id !== upsellId) : [...prev, upsellId]
    );
  };

  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    const extras = selectedUpsells.reduce((t, id) => {
      const u = upsells.find(x => x.id === id);
      return t + (u?.price || 0);
    }, 0);
    return selectedPlan.price + extras;
  };

  const proceedToReceipt = (nome: string) => {
    if (!selectedPlan) return;
    const email = user?.email || '';
    const upsellParam = selectedUpsells.length > 0 ? `&upsells=${selectedUpsells.join(',')}` : '';
    analytics.beginCheckout(selectedPlan.id, selectedPlan.name, calculateTotal());
    navigate(`/comprovante?plano=${selectedPlan.id}&nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}${upsellParam}`);
    setShowUpsells(false);
    setSelectedPlan(null);
    setSelectedUpsells([]);
  };

  const handleCheckout = () => {
    if (!selectedPlan) return;
    const knownName = user?.user_metadata?.full_name || '';
    if (knownName && knownName.trim().length >= 2) {
      proceedToReceipt(knownName.trim());
      return;
    }
    setTempName('');
    setNameError('');
    setAskName(true);
  };

  const confirmNameAndCheckout = () => {
    const n = tempName.trim();
    if (n.length < 2) { setNameError('Digite seu nome completo (mínimo 2 letras).'); return; }
    if (/\d|[_@#$%^&*+=<>/\\|{}[\]~`]/.test(n)) { setNameError('Use apenas letras e espaços.'); return; }
    setAskName(false);
    proceedToReceipt(n);
  };

  const handleBack = () => {
    setShowUpsells(false);
    setSelectedPlan(null);
    setSelectedUpsells([]);
  };

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'mensal': return planMensalIcon;
      case 'trimestral': return planTrimestralIcon;
      case 'anual': return planAnualIcon;
      case 'apk': return planApkIcon;
      default: return planMensalIcon;
    }
  };

  return (
    <section id="planos" className="py-16 px-4 bg-cinema-dark">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-cinema font-bold text-white mb-3 tracking-tight">
            Escolha seu <span className="text-cinema-red">Plano</span>
          </h2>
          <p className="text-white/70 text-base">
            Selecione um plano e personalize com extras opcionais.
          </p>
        </div>

        {/* Upsells flow */}
        {showUpsells && selectedPlan && (
          <div id="upsells-area" className="mb-12 animate-fade-in">
            <button onClick={handleBack} className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar aos planos
            </button>

            <div className="bg-cinema-panel border border-cinema-red/30 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <img src={getIcon(selectedPlan.id)} alt={selectedPlan.name} className="w-14 h-14 object-contain" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedPlan.name}</h3>
                    <p className="text-cinema-red font-bold">R$ {selectedPlan.price.toFixed(2)} {selectedPlan.period}</p>
                  </div>
                </div>
                <div className="text-green-500 flex items-center gap-1 text-sm">
                  <Check className="w-4 h-4" /> Selecionado
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Adicionar extras</h3>
              <p className="text-white/60 text-sm mb-4">Opcional — você pode pular essa etapa.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {upsells.map((u) => {
                  const isSel = selectedUpsells.includes(u.id);
                  return (
                    <div
                      key={u.id}
                      onClick={() => toggleUpsell(u.id)}
                      className={cn(
                        'relative rounded-xl border p-5 cursor-pointer transition-all duration-300',
                        isSel ? 'bg-cinema-red/20 border-cinema-red shadow-glow' : 'bg-cinema-panel border-white/10 hover:border-cinema-red/50'
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-white">{u.name}</h4>
                        <div className={cn('w-6 h-6 rounded-full flex items-center justify-center', isSel ? 'bg-cinema-red' : 'bg-white/10')}>
                          {isSel ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white/60" />}
                        </div>
                      </div>
                      <p className="text-white/60 text-sm mb-2">{u.description}</p>
                      <p className="text-cinema-gold font-bold">+R$ {u.price.toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cinema-red/20 to-cinema-panel border border-cinema-red/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-white/60">Total</span>
                <div className="text-3xl font-bold text-white">R$ {calculateTotal().toFixed(2)}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-4 rounded-xl font-bold bg-cinema-red hover:bg-cinema-glow text-white shadow-glow transition-all"
                >
                  Imprimir comprovante
                </button>
                <button
                  onClick={() => { setSelectedUpsells([]); handleCheckout(); }}
                  className="py-4 px-6 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                  Pular extras
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plans grid */}
        {!showUpsells && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch justify-items-center max-w-3xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => handleSelectPlan(plan)}
                className="relative w-full max-w-sm h-full flex flex-col rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-honeycomb border-cinema-red/60 hover:border-cinema-red shadow-lg hover:shadow-glow overflow-hidden"
              >
                {plan.discount && (
                  <div className="absolute top-0 left-0 right-0 z-10">
                    <div className="bg-cinema-red text-white text-xs font-bold text-center py-1.5 tracking-wider">
                      {plan.discount}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/65 pointer-events-none" />
                <div className={cn('relative p-6 flex flex-col flex-1 w-full', plan.discount && 'pt-10')}>
                  <div className="flex flex-col items-center mb-4">
                    <img src={getIcon(plan.id)} alt={plan.name} className="w-16 h-16 object-contain mb-3" />
                    <h3 className="text-base font-bold text-white text-center">{plan.name}</h3>
                  </div>
                  <div className="text-center mb-5">
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-white/60 text-sm">R$</span>
                      <span className="text-4xl font-bold text-white">{plan.price.toFixed(2).split('.')[0]}</span>
                      <span className="text-white/60 text-sm">,{plan.price.toFixed(2).split('.')[1]}</span>
                    </div>
                    <span className="text-white/50 text-xs">{plan.period}</span>
                  </div>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cinema-red flex-shrink-0 mt-0.5" />
                        <span className="text-white/75 text-sm leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSelectPlan(plan); }}
                    className="w-full mt-auto py-3.5 rounded-lg text-sm font-bold uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white shadow-glow transition-all"
                  >
                    Assinar agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Name dialog */}
      <Dialog open={askName} onOpenChange={setAskName}>
        <DialogContent className="bg-cinema-panel border border-cinema-red/40 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <User2 className="w-5 h-5 text-cinema-red" />
              Antes de gerar seu comprovante
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Digite seu <span className="text-cinema-red font-semibold">nome completo</span> para aparecer no comprovante oficial.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Input
              autoFocus
              value={tempName}
              onChange={(e) => { setTempName(e.target.value); if (nameError) setNameError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); confirmNameAndCheckout(); } }}
              placeholder="Ex: Maria Silva"
              maxLength={60}
              className="bg-cinema-dark border-white/15 focus:border-cinema-red text-white placeholder:text-white/40"
            />
            {nameError && <p className="text-red-400 text-xs">{nameError}</p>}
            <div className="flex gap-2 pt-2">
              <button onClick={() => setAskName(false)} className="flex-1 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors">
                Cancelar
              </button>
              <button onClick={confirmNameAndCheckout} className="flex-1 py-2.5 rounded-lg bg-cinema-red hover:bg-cinema-glow text-white text-sm font-bold shadow-glow transition-all">
                Continuar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PlansSection;
