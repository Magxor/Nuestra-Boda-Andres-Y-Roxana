import React, { useEffect } from 'react';
import { Photo } from '../types';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

interface ImageModalProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose, onNext, onPrev, hasNext, hasPrev }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  const handleDownload = async () => {
    try {
      const response = await fetch(photo.fullUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `Boda-AR-${photo.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
      // Si falla el fetch (e.g., por CORS), abrir en nueva pestaña como fallback
      window.open(photo.fullUrl, '_blank');
    }
  };


  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev button */}
        {hasPrev && (
            <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Anterior"
            >
            <ChevronLeft className="w-8 h-8" />
            </button>
        )}

        {/* Next button */}
        {hasNext && (
            <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Siguiente"
            >
            <ChevronRight className="w-8 h-8" />
            </button>
        )}

        {/* Image container */}
        <div className="max-w-screen-lg max-h-[90vh] relative animate-fade-in-up">
            <img
                src={photo.fullUrl}
                alt={photo.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
          {/* Volver button */}
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-white/90 text-slate-700 font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-white transition-colors backdrop-blur-sm"
            aria-label="Volver a la galería"
          >
            Volver
          </button>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-wedding-royal text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-blue-700 transition-colors animate-pulse-glow"
            aria-label="Descargar foto"
          >
            <Download className="w-4 h-4" />
            Descargar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;