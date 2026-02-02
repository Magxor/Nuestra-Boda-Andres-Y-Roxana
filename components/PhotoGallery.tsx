import React, { useState } from 'react';
import { Photo } from '../types';
import { Camera, Download, FileArchive, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import ImageModal from './ImageModal';

// --- DATOS DE FOTOS (Reemplazar con tus links) ---

const civilPhotos: Photo[] = [
  // Extraídas de https://postimg.cc/gallery/WJ2VYXv
  { id: 1, fullUrl: 'https://i.postimg.cc/vB0hN90p/DSC-0001.jpg', thumbnailUrl: 'https://i.postimg.cc/vB0hN90p/DSC-0001.jpg', alt: 'Foto del Civil 1' },
  { id: 2, fullUrl: 'https://i.postimg.cc/DSj2yqyk/DSC-0008.jpg', thumbnailUrl: 'https://i.postimg.cc/DSj2yqyk/DSC-0008.jpg', alt: 'Foto del Civil 2' },
  { id: 3, fullUrl: 'https://i.postimg.cc/x8KkbrRT/DSC-0010.jpg', thumbnailUrl: 'https://i.postimg.cc/x8KkbrRT/DSC-0010.jpg', alt: 'Foto del Civil 3' },
  { id: 4, fullUrl: 'https://i.postimg.cc/Y0G3k2nZ/DSC-0014.jpg', thumbnailUrl: 'https://i.postimg.cc/Y0G3k2nZ/DSC-0014.jpg', alt: 'Foto del Civil 4' },
  { id: 5, fullUrl: 'https://i.postimg.cc/TY4V3G5q/DSC-0017.jpg', thumbnailUrl: 'https://i.postimg.cc/TY4V3G5q/DSC-0017.jpg', alt: 'Foto del Civil 5' },
  { id: 6, fullUrl: 'https://i.postimg.cc/bwxF10Bq/DSC-0022.jpg', thumbnailUrl: 'https://i.postimg.cc/bwxF10Bq/DSC-0022.jpg', alt: 'Foto del Civil 6' },
  { id: 7, fullUrl: 'https://i.postimg.cc/8zQ2P0Y3/DSC-0027.jpg', thumbnailUrl: 'https://i.postimg.cc/8zQ2P0Y3/DSC-0027.jpg', alt: 'Foto del Civil 7' },
  { id: 8, fullUrl: 'https://i.postimg.cc/mkjC2Xg8/DSC-0030.jpg', thumbnailUrl: 'https://i.postimg.cc/mkjC2Xg8/DSC-0030.jpg', alt: 'Foto del Civil 8' },
  { id: 9, fullUrl: 'https://i.postimg.cc/D0hVmhv0/DSC-0034.jpg', thumbnailUrl: 'https://i.postimg.cc/D0hVmhv0/DSC-0034.jpg', alt: 'Foto del Civil 9' },
  { id: 10, fullUrl: 'https://i.postimg.cc/44zT8Kkf/DSC-0037.jpg', thumbnailUrl: 'https://i.postimg.cc/44zT8Kkf/DSC-0037.jpg', alt: 'Foto del Civil 10' },
  { id: 11, fullUrl: 'https://i.postimg.cc/T3Ybsz0T/DSC-0038.jpg', thumbnailUrl: 'https://i.postimg.cc/T3Ybsz0T/DSC-0038.jpg', alt: 'Foto del Civil 11' },
  { id: 12, fullUrl: 'https://i.postimg.cc/G3x7M3sS/DSC-0044.jpg', thumbnailUrl: 'https://i.postimg.cc/G3x7M3sS/DSC-0044.jpg', alt: 'Foto del Civil 12' },
];

const bodaPhotos: Photo[] = []; // Vacío por ahora
const fiestaPhotos: Photo[] = []; // Vacío por ahora

// --------------------------------------------------

type Category = 'civil' | 'boda' | 'fiesta';

const PhotoGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('civil');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleries: Record<Category, { title: string; photos: Photo[] }> = {
    civil: { title: 'Civil', photos: civilPhotos },
    boda: { title: 'Boda', photos: bodaPhotos },
    fiesta: { title: 'Fiesta', photos: fiestaPhotos },
  };

  const currentPhotos = galleries[activeTab].photos;

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
               <h3 className="font-cinzel text-2xl sm:text-3xl text-slate-800 font-bold mb-3 sm:mb-0">Galería: {galleries[activeTab].title}</h3>
               <a 
                 href="#" // Reemplazar con el link de descarga del ZIP
                 className="flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wedding-royal transition-colors shadow-lg animate-pulse-glow"
               >
                 <FileArchive className="w-4 h-4" />
                 Descargar Todas
               </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer group relative shadow-sm"
                  onClick={() => handleOpenModal(index)}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-100/50">
                <ImageOff className="w-10 h-10 text-blue-300" />
             </div>
             <h3 className="font-cinzel text-3xl text-slate-700 font-bold">Próximamente...</h3>
             <p className="text-slate-500 mt-2 font-serif">
                Las fotos de la <span className="font-bold text-slate-600">{galleries[activeTab].title}</span> estarán disponibles muy pronto. ¡Vuelve a visitarnos!
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
