import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { LogOut, User, Menu, X, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import cineflixLogo from '@/assets/cineflix-logo.png';

const navLinks = [
  { label: 'Planos', href: '#planos' },
  { label: 'Catálogo', href: '#filmes' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Ajuda', href: '/faq' },
];

const Header = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4 h-16 md:h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={cineflixLogo}
              alt="Logo CineflixPayment"
              className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-cinema text-base md:text-lg text-white tracking-wide">
              CINEFLIX<span className="text-cinema-red">PAYMENT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-white/65 hover:text-white transition-colors font-medium text-sm group"
              >
                {link.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-cinema-red group-hover:w-6 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Auth + Mobile */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cinema-red/15 border border-cinema-red/30 text-white text-xs font-semibold hover:bg-cinema-red/25 transition-all"
                  >
                    <Shield className="w-3.5 h-3.5" /> ADMIN
                  </Link>
                )}
                <span className="hidden sm:inline-flex items-center gap-2 text-white/60 text-xs">
                  <User className="w-3.5 h-3.5" />
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="hidden sm:block px-4 py-2 rounded-md text-white/70 hover:text-white text-sm font-medium transition-all"
                >
                  Entrar
                </Link>
                <Link
                  to="/auth"
                  className="px-4 py-2 rounded-md bg-cinema-red hover:bg-cinema-glow text-white font-semibold text-sm hover:shadow-glow transition-all duration-300"
                >
                  Assinar
                </Link>
              </>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden w-9 h-9 rounded-md bg-white/[0.06] flex items-center justify-center"
            >
              {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-16 z-30 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col p-3 gap-0.5">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/[0.05] rounded-md transition-all font-medium text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
