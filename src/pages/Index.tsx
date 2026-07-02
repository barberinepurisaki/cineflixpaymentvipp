import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TMDBGallery from '@/components/TMDBGallery';
import TMDBTrailerModal from '@/components/TMDBTrailerModal';
import PlansSection from '@/components/PlansSection';
import ConversionHero from '@/components/ConversionHero';
import Footer from '@/components/Footer';
import ChatFAB from '@/components/ChatFAB';
import AshleyChat from '@/components/AshleyChat';
import {
  useTrendingMovies,
  useTrendingSeries,
  useActionMovies,
  TMDBMovie,
} from '@/hooks/useTMDB';

const Index = () => {
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
  const { data: actionMovies, isLoading: actionLoading } = useActionMovies();

  const handlePlayTrailer = (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* 1. Oferta principal */}
        <ConversionHero />

        {/* 2. Catálogo */}
        <section id="filmes" className="bg-cinema-dark pt-4 pb-6">
          <div className="container mx-auto px-4 mb-4">
            <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-2">
              Catálogo
            </p>
            <h2 className="font-cinema text-2xl md:text-3xl text-white mb-2 tracking-tight">
              Uma prévia do que está disponível
            </h2>
          </div>

          <div className="space-y-1">
            <TMDBGallery title="Em alta" movies={trendingMovies?.results} isLoading={trendingLoading} onPlayTrailer={handlePlayTrailer} />
            <TMDBGallery title="Séries populares" movies={trendingSeries?.results?.slice(0, 12)} isLoading={seriesLoading} onPlayTrailer={handlePlayTrailer} />
            <TMDBGallery title="Ação" movies={actionMovies?.results} isLoading={actionLoading} onPlayTrailer={handlePlayTrailer} />
          </div>
        </section>

        {/* 3. Planos — clique vai direto pro WhatsApp */}
        <div id="planos">
          <PlansSection />
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
