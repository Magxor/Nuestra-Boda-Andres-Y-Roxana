import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // ✅ empieza muteado
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.muted = true; // ✅ autoplay permitido

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        console.log("Autoplay bloqueado, esperando interacción…");
      }
    };

    tryPlay();

    // ✅ Cuando el usuario toca o scrollea, activamos sonido
    const enableSound = () => {
      if (audio) {
        audio.muted = false;
        setIsMuted(false);
        window.removeEventListener('click', enableSound);
        window.removeEventListener('scroll', enableSound);
      }
    };

    window.addEventListener('click', enableSound);
    window.addEventListener('scroll', enableSound);

    return () => {
      window.removeEventListener('click', enableSound);
      window.removeEventListener('scroll', enableSound);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      <audio ref={audioRef} src="/song.mp3" loop preload="auto" />

      <button
        onClick={togglePlay}
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group border-2 ${
          isPlaying 
            ? 'bg-wedding-royal border-white text-white animate-pulse-glow' 
            : 'bg-white border-wedding-royal text-wedding-royal'
        }`}
      >
        {isPlaying && (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-wedding-royal opacity-20 animate-ping"></span>
            <span className="absolute -inset-1 rounded-full border border-wedding-royal/30 animate-spin-slow"></span>
          </>
        )}

        <div className="relative z-10">
          {isPlaying ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          ) : (
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-1" />
          )}
        </div>
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-blue-200 text-slate-600 flex items-center justify-center shadow-md hover:bg-blue-50 transition-all animate-fade-in"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};

export default MusicPlayer;
