import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TMDBGallery from '@/components/TMDBGallery';
import TMDBTrailerModal from '@/components/TMDBTrailerModal';
import PlansSection from '@/components/PlansSection';
import AppPromoSection from '@/components/AppPromoSection';
import Footer from '@/components/Footer';
import ChatFAB from '@/components/ChatFAB';
import AshleyChat from '@/components/AshleyChat';
import ContentLock from '@/components/ContentLock';
import { 
  useTrendingMovies, 
  useTrendingSeries, 
  usePopularMovies, 
  useActionMovies,
  useKoreanDramas,
  useRomanceMovies,
  TMDBMovie 
} from '@/hooks/useTMDB';

const Index = () => {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>(undefined);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const openChatWithMessage = (message?: string) => {
    setChatInitialMessage(message);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setChatInitialMessage(undefined);
  };

  const { data: trendingMovies, isLoading: trendingLoading } = useTrendingMovies();
  const { data: trendingSeries, isLoading: seriesLoading } = useTrendingSeries();
  const { data: popularMovies, isLoading: popularLoading } = usePopularMovies();
  const { data: actionMovies, isLoading: actionLoading } = useActionMovies();
  const { data: koreanDramas, isLoading: koreanLoading } = useKoreanDramas();
  const { data: romanceMovies, isLoading: romanceLoading } = useRomanceMovies();

  const handlePlayTrailer = (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsChatOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isChatOpen) setIsChatOpen(true);
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isChatOpen]);

  return (
    <div className="min-h-screen bg-cinema-dark text-white">
      <Header />
      <main>
        <HeroSection onOpenChat={() => openChatWithMessage()} onPlayTrailer={trendingMovies?.results?.[0] ? () => handlePlayTrailer(trendingMovies.results[0]) : undefined} />
        
        {/* All galleries visible to everyone */}
        <div className="space-y-2 md:space-y-4 pb-4">
          <TMDBGallery title="🔥 Em Alta" movies={trendingMovies?.results} isLoading={trendingLoading} onPlayTrailer={handlePlayTrailer} />
          <TMDBGallery title="📺 Séries Populares" movies={trendingSeries?.results?.slice(0, 6)} isLoading={seriesLoading} onPlayTrailer={handlePlayTrailer} />
          <TMDBGallery title="⚡ Ação" movies={actionMovies?.results} isLoading={actionLoading} onPlayTrailer={handlePlayTrailer} />
          <TMDBGallery title="🌸 K-Dramas" movies={koreanDramas?.results} isLoading={koreanLoading} onPlayTrailer={handlePlayTrailer} />
          <TMDBGallery title="💕 Romance" movies={romanceMovies?.results} isLoading={romanceLoading} onPlayTrailer={handlePlayTrailer} />
          <TMDBGallery title="🎬 Populares" movies={popularMovies?.results} isLoading={popularLoading} onPlayTrailer={handlePlayTrailer} />
          
          {/* Upsell CTA between galleries */}
          {!user && (
            <div className="px-4 md:px-8 py-6">
              <div className="bg-gradient-to-r from-cinema-red/20 to-cinema-panel border border-cinema-red/30 rounded-2xl p-6 text-center">
                <p className="text-lg md:text-xl font-bold text-white mb-2">🔥 Quer assistir tudo sem limites?</p>
                <p className="text-white/60 text-sm mb-4">Crie sua conta e conheça nossos planos a partir de R$ 29,90</p>
                <Link
                  to="/auth"
                  className="inline-block px-6 py-3 rounded-xl font-bold bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300"
                >
                  Criar Conta Grátis
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* APK Promo — visible to everyone */}
        <AppPromoSection />

        {/* Plans: only visible after signup */}
        <div id="planos">
          {user ? (
            <PlansSection onOpenChatWithPlan={openChatWithMessage} />
          ) : (
            <ContentLock />
          )}
        </div>
      </main>
      <Footer />
      <ChatFAB onClick={() => openChatWithMessage()} />
      <AshleyChat isOpen={isChatOpen} onClose={handleCloseChat} initialMessage={chatInitialMessage} />
      <TMDBTrailerModal movie={selectedMovie} isOpen={isTrailerOpen} onClose={() => { setIsTrailerOpen(false); setSelectedMovie(null); }} />
    </div>
  );
};

export default Index;
