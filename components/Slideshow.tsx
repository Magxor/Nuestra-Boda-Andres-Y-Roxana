import React, { useState, useEffect, useCallback } from 'react';
import { Photo } from '../types';
import { X, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface SlideshowProps {
  photos: Photo[];
  onClose: () => void;
}

const SLIDE_DURATION = 5000; // 5 segundos por diapositiva

const Slideshow: React.FC<SlideshowProps> = ({ photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [kenBurnsClass, setKenBurnsClass] = useState('animate-ken-burns-1');

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setKenBurnsClass(Math.random() > 0.5 ? 'animate-ken-burns-1' : 'animate-ken-burns-2');
  }, [photos.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
     setKenBurnsClass(Math.random() > 0.5 ? 'animate-ken-burns-1' : 'animate-ken-burns-2');
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === ' ') togglePlay();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goToNext]);

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(goToNext, SLIDE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPlaying, goToNext]);


  return (
    <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
      {/* Background Image (for crossfade) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          key={currentIndex}
          src={photos[currentIndex].fullUrl}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${kenBurnsClass}`}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>


      {/* Controls */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Cerrar Presentación"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

       <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Anterior"
       >
        <ChevronLeft className="w-8 h-8" />
       </button>
       
       <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Siguiente"
       >
        <ChevronRight className="w-8 h-8" />
       </button>
      
      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/50 to-transparent">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button 
             onClick={togglePlay}
             className="w-12 h-12 flex-shrink-0 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
             aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
                {isPlaying ? <Pause className="w-6 h-6"/> : <Play className="w-6 h-6 ml-1"/>}
            </button>
            <div className="w-full text-white text-sm truncate">
                <p className="font-bold">{`Foto ${currentIndex + 1} de ${photos.length}`}</p>
                <p className="text-white/70 text-xs">{photos[currentIndex].alt}</p>
            </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20 mt-3 rounded-full overflow-hidden">
           <div 
             key={currentIndex} // Reinicia la animación en cada cambio
             className={`h-full bg-white rounded-full ${isPlaying ? 'animate-progress-bar' : ''}`}
             style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
           />
        </div>
      </div>
    </div>
  );
};

export default Slideshow;