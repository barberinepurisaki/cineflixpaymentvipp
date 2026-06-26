import { Check } from 'lucide-react';
import { plans } from '@/data/cineflix';
import { cn } from '@/lib/utils';
import { openWhatsapp } from '@/lib/whatsapp';
import planMensalIcon from '@/assets/plan-mensal-new.png';
import planTrimestralIcon from '@/assets/plan-trimestral-new.png';
import planAnualIcon from '@/assets/plan-anual-new.png';
import planApkIcon from '@/assets/plan-apk-icon.png';

const PlansSection = () => {
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
            Clique no plano e fale com a gente no WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch justify-items-center max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => openWhatsapp(plan.name)}
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
                  <div className="w-16 h-16 mb-3">
                    <img src={getIcon(plan.id)} alt={plan.name} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-base font-bold text-white text-center">{plan.name}</h3>
                </div>

                <div className="text-center mb-5">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-white/60 text-sm">R$</span>
                    <span className="text-4xl font-bold text-white">
                      {plan.price.toFixed(2).split('.')[0]}
                    </span>
                    <span className="text-white/60 text-sm">,{plan.price.toFixed(2).split('.')[1]}</span>
                  </div>
                  <span className="text-white/50 text-xs">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-cinema-red flex-shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => { e.stopPropagation(); openWhatsapp(plan.name); }}
                  className="w-full mt-auto py-3.5 rounded-lg text-sm font-bold uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white shadow-glow transition-all duration-300"
                >
                  Assinar pelo WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
