import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import cineflixLogo from '@/assets/cineflix-logo.png';
import BackgroundMusic from './BackgroundMusic';

const STORAGE_KEY = 'cineflix_human_verified_v1';
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias

interface HumanGateProps {
  children: React.ReactNode;
}

const HumanGate = ({ children }: HumanGateProps) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [mountedAt] = useState(() => Date.now());

  // Detecção heurística leve de bots (UA + ausência de interação humana)
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const botPattern = /bot|crawler|spider|crawling|headless|phantom|slurp|bingpreview|facebookexternalhit/i;
    if (botPattern.test(ua)) {
      // Marca como bot — não armazena verificação
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data?.ts && Date.now() - data.ts < TTL_MS) {
          setVerified(true);
          return;
        }
      }
    } catch {
      // ignora
    }
    setVerified(false);
  }, []);

  // Sinaliza interação humana real (mouse/touch/keyboard)
  useEffect(() => {
    const onInteract = () => setInteracted(true);
    window.addEventListener('mousemove', onInteract, { once: true });
    window.addEventListener('touchstart', onInteract, { once: true });
    window.addEventListener('keydown', onInteract, { once: true });
    return () => {
      window.removeEventListener('mousemove', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
  }, []);

  const handleVerify = () => {
    if (loading || checked) return;

    // Anti-bot: clique muito rápido após carregar = suspeito
    const elapsed = Date.now() - mountedAt;
    if (elapsed < 800 || !interacted) {
      // Força um pequeno desafio adicional
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
      } catch {
        // ignora
      }
      setChecked(true);
      setLoading(false);
      setTimeout(() => setVerified(true), 700);
    }, 1100);
  };

  if (verified) return <><BackgroundMusic />{children}</>;
  if (verified === null) {
    // Estado inicial — evita flash
    return <div className="min-h-screen bg-cinema-dark" />;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-cinema-dark flex items-center justify-center px-4 overflow-hidden"
      >
        {/* Background efeito cinema */}
        <div className="absolute inset-0 bg-gradient-to-br from-cinema-red/10 via-cinema-dark to-cinema-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cinema-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cinema-red/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-full max-w-md"
        >
          {/* Logo + branding */}
          <div className="flex flex-col items-center mb-8">
            <motion.img
              src={cineflixLogo}
              alt="CINEFLIXPAYMENT"
              className="h-16 w-auto mb-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <h1 className="font-cinema text-2xl text-white text-center">
              CINEFLIX<span className="text-cinema-red">PAYMENT</span>
            </h1>
            <p className="text-white/50 text-sm mt-2 text-center">
              Verificação de segurança
            </p>
          </div>

          {/* Card captcha */}
          <div className="bg-cinema-panel/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cinema-red/20 to-cinema-red/5 border border-cinema-red/30 flex items-center justify-center flex-shrink-0">
                <img src={cineflixLogo} alt="" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Acesso protegido</p>
                <p className="text-white/50 text-xs">Confirme que você é humano para continuar</p>
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || checked}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                checked
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-white/10 bg-cinema-dark/50 hover:border-cinema-red/50 hover:bg-cinema-dark/80'
              } disabled:cursor-not-allowed`}
            >
              {/* Checkbox */}
              <div
                className={`w-7 h-7 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  checked
                    ? 'bg-green-500 border-green-500'
                    : loading
                    ? 'border-cinema-red'
                    : 'border-white/30 bg-white/5'
                }`}
              >
                {loading && <Loader2 className="w-4 h-4 text-cinema-red animate-spin" />}
                {checked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </div>

              <span className="text-white font-medium text-base flex-1 text-left">
                {checked ? 'Verificado!' : loading ? 'Verificando...' : 'Não sou um robô'}
              </span>

              {/* Selo Cineflix (no lugar do reCAPTCHA) */}
              <div className="flex flex-col items-center gap-0.5 pl-3 border-l border-white/10">
                <img src={cineflixLogo} alt="" className="h-6 w-6 object-contain opacity-90" />
                <span className="text-[9px] text-white/40 uppercase tracking-wider font-bold">
                  Cineflix
                </span>
                <span className="text-[8px] text-white/30">Anti-bot</span>
              </div>
            </button>

            <p className="text-center text-white/30 text-[11px] mt-4 leading-relaxed">
              Esta verificação protege a plataforma contra acessos automatizados e garante a melhor experiência para usuários reais.
            </p>
          </div>

          <p className="text-center text-white/20 text-[10px] mt-4">
            © {new Date().getFullYear()} CINEFLIXPAYMENT — Acesso seguro
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HumanGate;
