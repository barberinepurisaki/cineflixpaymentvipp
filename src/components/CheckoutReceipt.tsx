import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { plans, KIRVANO_LINKS } from '@/data/cineflix';
import cineflixLogo from '@/assets/cineflix-logo.png';

const CheckoutReceipt = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const planId = searchParams.get('plano') || '';
  const nome = searchParams.get('nome') || 'Cliente';
  const email = searchParams.get('email') || '';
  const plan = plans.find(p => p.id === planId);

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

  const checkoutLink = KIRVANO_LINKS[plan.id];
  const dateStr = currentTime.toLocaleDateString('pt-BR');
  const timeStr = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen bg-cinema-dark flex items-center justify-center p-4">
      {/* Receipt container - card machine style */}
      <div className="w-full max-w-sm">
        {/* Torn top edge */}
        <div className="h-4 bg-white/95 rounded-t-lg" style={{ 
          maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 16 Q10 0 20 16 Q30 0 40 16 Q50 0 60 16 Q70 0 80 16 Q90 0 100 16 Q110 0 120 16 Q130 0 140 16 Q150 0 160 16 Q170 0 180 16 Q190 0 200 16 Q210 0 220 16 Q230 0 240 16 Q250 0 260 16 Q270 0 280 16 Q290 0 300 16 Q310 0 320 16 Q330 0 340 16 Q350 0 360 16 Q370 0 380 16 Q390 0 400 16 Z\' fill=\'white\'/%3E%3C/svg%3E")',
          WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 16 Q10 0 20 16 Q30 0 40 16 Q50 0 60 16 Q70 0 80 16 Q90 0 100 16 Q110 0 120 16 Q130 0 140 16 Q150 0 160 16 Q170 0 180 16 Q190 0 200 16 Q210 0 220 16 Q230 0 240 16 Q250 0 260 16 Q270 0 280 16 Q290 0 300 16 Q310 0 320 16 Q330 0 340 16 Q350 0 360 16 Q370 0 380 16 Q390 0 400 16 Z\' fill=\'white\'/%3E%3C/svg%3E")',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }} />

        {/* Receipt body */}
        <div className="bg-white/95 px-6 py-8 font-mono text-gray-900 text-sm">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src={cineflixLogo} alt="CINEFLIXPAYMENT" className="h-10 mx-auto mb-2" />
            <p className="text-xs text-gray-500 tracking-widest uppercase">CINEFLIXPAYMENT</p>
            <p className="text-[10px] text-gray-400">Sua central de entretenimento</p>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Header info */}
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500">COMPROVANTE DE PEDIDO</p>
            <p className="text-[10px] text-gray-400 mt-1">VIA DO CLIENTE</p>
          </div>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Customer info */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">CLIENTE:</span>
              <span className="font-bold text-right max-w-[60%] truncate">{nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">E-MAIL:</span>
              <span className="text-right max-w-[60%] truncate text-xs">{email}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Plan details */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">PLANO:</span>
              <span className="font-bold">{plan.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PERÍODO:</span>
              <span>{plan.period === 'único' ? 'Vitalício' : plan.period}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Total */}
          <div className="text-center py-3">
            <p className="text-xs text-gray-500 mb-1">VALOR TOTAL</p>
            <p className="text-3xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</p>
          </div>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Date/Time */}
          <div className="space-y-1 text-center text-xs text-gray-500">
            <p>DATA: {dateStr}</p>
            <p>HORA: {timeStr}</p>
          </div>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Status */}
          <div className="text-center py-2">
            <p className="text-xs text-gray-400 mb-2">STATUS</p>
            <div className="inline-block px-4 py-1.5 bg-yellow-100 border border-yellow-400 rounded text-yellow-700 text-xs font-bold">
              ⏳ AGUARDANDO PAGAMENTO
            </div>
          </div>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* CTA Button */}
          <a
            href={checkoutLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-lg bg-red-600 hover:bg-red-500 text-white text-center font-bold text-base transition-all duration-300 hover:scale-[1.02] shadow-lg no-underline"
          >
            💳 PAGAR AGORA
          </a>

          <div className="border-t border-dashed border-gray-400 my-4" />

          {/* Footer */}
          <div className="text-center text-[10px] text-gray-400 space-y-1">
            <p>OBRIGADO POR ESCOLHER A CINEFLIXPAYMENT</p>
            <p>DEUS ABENÇOE! 🙏</p>
            <p className="mt-2">* * * * * * * * * * * * * * *</p>
          </div>
        </div>

        {/* Torn bottom edge */}
        <div className="h-4 bg-white/95 rounded-b-lg" style={{ 
          maskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 Q10 16 20 0 Q30 16 40 0 Q50 16 60 0 Q70 16 80 0 Q90 16 100 0 Q110 16 120 0 Q130 16 140 0 Q150 16 160 0 Q170 16 180 0 Q190 16 200 0 Q210 16 220 0 Q230 16 240 0 Q250 16 260 0 Q270 16 280 0 Q290 16 300 0 Q310 16 320 0 Q330 16 340 0 Q350 16 360 0 Q370 16 380 0 Q390 16 400 0 Z\' fill=\'white\'/%3E%3C/svg%3E")',
          WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 16\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 Q10 16 20 0 Q30 16 40 0 Q50 16 60 0 Q70 16 80 0 Q90 16 100 0 Q110 16 120 0 Q130 16 140 0 Q150 16 160 0 Q170 16 180 0 Q190 16 200 0 Q210 16 220 0 Q230 16 240 0 Q250 16 260 0 Q270 16 280 0 Q290 16 300 0 Q310 16 320 0 Q330 16 340 0 Q350 16 360 0 Q370 16 380 0 Q390 16 400 0 Z\' fill=\'white\'/%3E%3C/svg%3E")',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }} />

        {/* Back link */}
        <div className="text-center mt-6">
          <button onClick={() => navigate('/')} className="text-white/50 hover:text-white text-sm underline transition-colors">
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReceipt;