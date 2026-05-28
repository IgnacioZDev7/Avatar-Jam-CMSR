import { useEffect, useRef, useState } from 'react';
import { initSound, stopSound, setVolume } from '../../lib/sound';

export const AmbientSoundscape = () => {
  const [isMuted, setIsMuted] = useState(false);
  const initiatedRef = useRef(false);

  const handleFirstInteraction = () => {
    if (initiatedRef.current) return;
    initiatedRef.current = true;
    initSound();
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
    document.removeEventListener('keydown', handleFirstInteraction);
  };

  useEffect(() => {
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      stopSound();
    };
  }, []);

  const toggleMute = () => {
    if (!initiatedRef.current) {
      handleFirstInteraction();
    }
    const next = !isMuted;
    setIsMuted(next);
    setVolume(next ? 0 : 0.3);
  };

  return (
    <button
      type="button"
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/60 transition hover:border-white/30 hover:text-white/90"
      aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
};
