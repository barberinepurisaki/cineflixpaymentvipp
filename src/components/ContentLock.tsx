import { Lock, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContentLock = () => {
  return (
    <div className="relative py-20">
      {/* Blurred preview background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 px-8 opacity-20 blur-sm">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-cinema-panel rounded-xl" />
          ))}
        </div>
      </div>

      {/* Lock overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-cinema-red/20 border-2 border-cinema-red/50 flex items-center justify-center mb-6 animate-pulse-glow">
          <Lock className="w-10 h-10 text-cinema-red" />
        </div>
        
        <h3 className="font-cinema text-3xl md:text-4xl text-white mb-3">
          CONTEÚDO <span className="text-cinema-red">EXCLUSIVO</span>
        </h3>
        
        <p className="text-white/60 text-lg max-w-md mb-8">
          Cadastre-se gratuitamente para desbloquear o catálogo completo com milhares de filmes, séries e muito mais!
        </p>
        
        <Link
          to="/auth"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cinema-red hover:bg-cinema-glow text-white font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
        >
          <UserPlus className="w-6 h-6" />
          Criar Conta Grátis
        </Link>
        
        <p className="text-white/40 text-sm mt-4">
          Já tem conta? <Link to="/auth" className="text-cinema-red hover:text-cinema-glow transition-colors">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default ContentLock;
