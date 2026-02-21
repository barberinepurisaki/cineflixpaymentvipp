import { useAuth } from '@/hooks/useAuth';
import { LogOut, User } from 'lucide-react';
import cineflixLogo from '@/assets/cineflix-logo.png';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-black via-black/80 to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 md:gap-3">
          <img 
            src={cineflixLogo} 
            alt="CineflixPayment" 
            className="h-8 md:h-14 w-auto object-contain"
          />
          <span className="font-cinema text-sm sm:text-xl md:text-2xl text-white">
            CINEFLIX<span className="text-cinema-red">PAYMENT</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">Início</a>
          <a href="#filmes" className="text-white/80 hover:text-white transition-colors font-medium">Filmes</a>
          <a href="#series" className="text-white/80 hover:text-white transition-colors font-medium">Séries</a>
          <a href="#planos" className="text-white/80 hover:text-white transition-colors font-medium">Planos</a>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:flex items-center gap-2 text-white/70 text-sm">
                <User className="w-4 h-4" />
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth"
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300"
              >
                Entrar
              </a>
              <a
                href="/auth"
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cinema-red to-cinema-glow text-white font-bold hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                Cadastrar
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
