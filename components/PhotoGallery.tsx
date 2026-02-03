import React, { useState } from 'react';
import { Photo } from '../types';
import { Camera, Download, FileArchive, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import ImageModal from './ImageModal';
import LazyImage from './LazyImage';

// --- DATOS DE FOTOS Y GALERÍAS (Reemplazar con tus links) ---

const civilPhotoLinks = [
  'https://i.postimg.cc/VLvdssJD/SAL-4480.jpg',
];


const civilPhotos: Photo[] = civilPhotoLinks.map((link, index) => ({
  id: index + 1,
  fullUrl: link,
  thumbnailUrl: link,
  alt: `Foto del Civil ${index + 1}`,
}));

const bodaPhotos: Photo[] = [];
const fiestaPhotos: Photo[] = [];

type Category = 'civil' | 'boda' | 'fiesta';

const galleriesData: Record<Category, { title: string; photos: Photo[]; downloadUrl: string | null }> = {
  civil: { 
    title: 'Civil', 
    photos: civilPhotos,
    downloadUrl: null 
  },
  boda: { 
    title: 'Boda', 
    photos: bodaPhotos,
    downloadUrl: null // Aún sin link
  },
  fiesta: { 
    title: 'Fiesta', 
    photos: fiestaPhotos,
    downloadUrl: null // Aún sin link
  },
};

// --------------------------------------------------


const PhotoGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('civil');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleries = galleriesData;
  const currentGallery = galleries[activeTab];
  const currentPhotos = currentGallery.photos;
  const currentDownloadUrl = currentGallery.downloadUrl;


  const handleOpenModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };
  
  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % currentPhotos.length);
    }
  };

  const handlePrev = () => {
     if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + currentPhotos.length) % currentPhotos.length);
    }
  };


  const TabButton: React.FC<{ category: Category; title: string }> = ({ category, title }) => (
    <button
      onClick={() => setActiveTab(category)}
      className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
        activeTab === category
          ? 'bg-wedding-royal text-white shadow-lg'
          : 'bg-white text-slate-600 hover:bg-blue-50'
      }`}
    >
      {title}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 p-2 bg-slate-100/80 rounded-full border border-slate-200/80 max-w-sm mx-auto">
        <TabButton category="civil" title="Civil" />
        <TabButton category="boda" title="Boda" />
        <TabButton category="fiesta" title="Fiesta" />
      </div>

      <div className="bg-white/60 backdrop-blur-md p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/60 min-h-[400px] flex flex-col">
        {currentPhotos.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-blue-100 pb-4">
               <h3 className="font-cinzel text-2xl sm:text-3xl text-slate-800 font-bold mb-3 sm:mb-0">Galería: {currentGallery.title}</h3>
                {currentDownloadUrl && (
                  <a 
                    href={currentDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wedding-royal transition-colors shadow-lg animate-pulse-glow"
                  >
                    <FileArchive className="w-4 h-4" />
                    Ver/Descargar Todas
                  </a>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative shadow-sm"
                  onClick={() => handleOpenModal(index)}
                >
                  <LazyImage src={photo.thumbnailUrl} alt={photo.alt} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : currentDownloadUrl ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-100/50">
                <Camera className="w-10 h-10 text-blue-300" />
             </div>
             <h3 className="font-cinzel text-3xl text-slate-700 font-bold">Galería del {currentGallery.title}</h3>
             <p className="text-slate-500 mt-2 font-serif max-w-md">
                La galería de fotos completa está alojada en un servicio externo. Haz clic en el botón para ver y descargar todas las imágenes.
             </p>
             <a 
                 href={currentDownloadUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="mt-8 flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-wedding-royal transition-colors shadow-lg animate-pulse-glow"
               >
                 <FileArchive className="w-5 h-5" />
                 Abrir Galería
               </a>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-100/50">
                <ImageOff className="w-10 h-10 text-blue-300" />
             </div>
             <h3 className="font-cinzel text-3xl text-slate-700 font-bold">Próximamente...</h3>
             <p className="text-slate-500 mt-2 font-serif">
                Las fotos de la <span className="font-bold text-slate-600">{currentGallery.title}</span> estarán disponibles muy pronto. ¡Vuelve a visitarnos!
             </p>
          </div>
        )}
      </div>

      {selectedImageIndex !== null && (
         <ImageModal 
           photo={currentPhotos[selectedImageIndex]}
           onClose={handleCloseModal}
           onNext={handleNext}
           onPrev={handlePrev}
           hasNext={currentPhotos.length > 1}
           hasPrev={currentPhotos.length > 1}
         />
      )}
    </div>
  );
};

export default PhotoGallery;