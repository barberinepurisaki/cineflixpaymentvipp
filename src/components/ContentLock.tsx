import { Lock, UserPlus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContentLock = () => {
  return (
    <motion.div 
      className="relative py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Blurred preview background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 px-8 opacity-15 blur-sm">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-cinema-panel rounded-xl animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Lock overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          className="w-20 h-20 rounded-full bg-cinema-red/20 border-2 border-cinema-red/50 flex items-center justify-center mb-6"
          animate={{ boxShadow: ['0 0 20px hsl(357 91% 47% / 0.3)', '0 0 40px hsl(357 91% 47% / 0.5)', '0 0 20px hsl(357 91% 47% / 0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Lock className="w-10 h-10 text-cinema-red" />
        </motion.div>
        
        <h3 className="font-cinema text-3xl md:text-4xl text-white mb-3">
          PLANOS <span className="text-cinema-red">EXCLUSIVOS</span>
        </h3>
        
        <p className="text-white/50 text-base max-w-md mb-8">
          Cadastre-se gratuitamente para desbloquear os planos de assinatura e todo o catálogo!
        </p>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/auth"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cinema-red hover:bg-cinema-glow text-white font-bold text-lg shadow-button transition-all duration-300"
          >
            <UserPlus className="w-5 h-5" />
            Criar Conta Grátis
            <Sparkles className="w-4 h-4" />
          </Link>
        </motion.div>
        
        <p className="text-white/30 text-sm mt-4">
          Já tem conta? <Link to="/auth" className="text-cinema-red hover:text-cinema-glow transition-colors">Entrar</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ContentLock;
