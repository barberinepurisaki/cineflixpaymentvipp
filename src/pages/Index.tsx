import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import TMDBGallery from '@/components/TMDBGallery';
import TMDBTrailerModal from '@/components/TMDBTrailerModal';
import SocialProof from '@/components/SocialProof';
import PlansSection from '@/components/PlansSection';
import ConversionHero from '@/components/ConversionHero';
import HowItWorks from '@/components/HowItWorks';
import Guarantee from '@/components/Guarantee';
import SeuJoaoStory from '@/components/SeuJoaoStory';
import FinalCTA from '@/components/FinalCTA';
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
  const { data: actionMovies, isLoading: actionLoading } = useActionMovies();

  const handlePlayTrailer = (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    setIsTrailerOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsChatOpen(true), 45000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* 1. Oferta principal com fundo colmeia */}
        <ConversionHero />

        {/* 2. Catálogo — sobe pra cá pra prender atenção */}
        <section id="filmes" className="bg-cinema-dark pt-10 pb-6">
          <div className="container mx-auto px-4 mb-4">
            <p className="text-cinema-red text-xs font-semibold tracking-[0.22em] uppercase mb-2">
              Catálogo
            </p>
            <h2 className="font-cinema text-2xl md:text-3xl text-white mb-2 tracking-tight">
              Uma prévia do que está disponível
            </h2>
            <p className="text-white/55 text-sm md:text-base max-w-xl">
              Milhares de títulos atualizados toda semana — filmes, séries, animes e canais ao vivo.
            </p>
          </div>

          <div className="space-y-1">
            <TMDBGallery title="Em alta" movies={trendingMovies?.results} isLoading={trendingLoading} onPlayTrailer={handlePlayTrailer} />
            <TMDBGallery title="Séries populares" movies={trendingSeries?.results?.slice(0, 12)} isLoading={seriesLoading} onPlayTrailer={handlePlayTrailer} />
            <TMDBGallery title="Ação" movies={actionMovies?.results} isLoading={actionLoading} onPlayTrailer={handlePlayTrailer} />
          </div>
        </section>

        {/* 3. Como funciona */}
        <HowItWorks />

        {/* 4. Planos */}
        <div id="planos">
          <PlansSection onOpenChatWithPlan={openChatWithMessage} />
        </div>

        {/* 5. Garantia 30 dias */}
        <Guarantee />

        {/* 6. Storytelling em carrossel */}
        <div id="sobre">
          <SeuJoaoStory />
        </div>

        {/* 7. Prova social */}
        <SocialProof />

        {/* 8. Chamada final */}
        <FinalCTA />
      </main>
      <Footer />
      <ChatFAB onClick={() => openChatWithMessage()} />
      <AshleyChat isOpen={isChatOpen} onClose={handleCloseChat} initialMessage={chatInitialMessage} />
      <TMDBTrailerModal movie={selectedMovie} isOpen={isTrailerOpen} onClose={() => { setIsTrailerOpen(false); setSelectedMovie(null); }} />
    </div>
  );
};

export default Index;
