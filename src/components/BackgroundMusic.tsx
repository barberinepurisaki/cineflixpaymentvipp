import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'UprcpdwuwCg';

const BackgroundMusic = () => {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // garante que o iframe seja montado após interação (gate já garantiu)
  }, []);

  return (
    <>
      {/* Player oculto do YouTube — só áudio */}
      <iframe
        title="cineflix-bg-music"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&mute=${muted ? 1 : 0}`}
        allow="autoplay; encrypted-media"
        style={{
          position: 'fixed',
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: 'none',
          border: 0,
          left: -9999,
          top: -9999,
        }}
      />

      {/* Botão de mute flutuante */}
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Ativar som' : 'Silenciar'}
        className="fixed bottom-4 left-4 z-[80] w-11 h-11 rounded-full bg-cinema-panel/80 backdrop-blur-md border border-white/10 hover:border-cinema-red/50 flex items-center justify-center text-white/80 hover:text-white transition-all shadow-lg"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </>
  );
};

export default BackgroundMusic;
