import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import TMDBGallery from '@/components/TMDBGallery';
import TMDBTrailerModal from '@/components/TMDBTrailerModal';
import SocialProof from '@/components/SocialProof';
import PlansSection from '@/components/PlansSection';
import ConversionHero from '@/components/ConversionHero';
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
        {/* 1. Oferta principal */}
        <ConversionHero />

        {/* 2. Planos */}
        <div id="planos">
          <PlansSection onOpenChatWithPlan={openChatWithMessage} />
        </div>

        {/* 3. Storytelling */}
        <div id="sobre">
          <SeuJoaoStory />
        </div>

        {/* 4. Prova social */}
        <SocialProof />

        {/* 5. Catálogo enxuto */}
        <section id="filmes" className="bg-cinema-dark py-12">
          <div className="container mx-auto px-4 mb-2">
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

          <div className="space-y-1 pt-4">
            <TMDBGallery title="Em alta" movies={trendingMovies?.results} isLoading={trendingLoading} onPlayTrailer={handlePlayTrailer} />
            <TMDBGallery title="Séries populares" movies={trendingSeries?.results?.slice(0, 12)} isLoading={seriesLoading} onPlayTrailer={handlePlayTrailer} />
            <TMDBGallery title="Ação" movies={actionMovies?.results} isLoading={actionLoading} onPlayTrailer={handlePlayTrailer} />
          </div>

          <motion.div
            className="container mx-auto px-4 md:px-8 pt-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-white text-lg md:text-xl font-medium mb-2">
                Quer assistir tudo sem limites?
              </p>
              <p className="text-white/55 text-sm mb-6">
                Planos a partir de R$ 29,90/mês — acesso imediato.
              </p>
              <button
                onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-block px-8 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide bg-cinema-red hover:bg-cinema-glow text-white transition-all duration-300 hover:scale-[1.02] shadow-button"
              >
                Ver planos
              </button>
            </div>
          </motion.div>
        </section>

        {/* 6. Chamada final */}
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
