import React, { useState } from 'react';
import { Photo } from '../types';
import { Camera, Download, FileArchive, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import ImageModal from './ImageModal';
import LazyImage from './LazyImage';

// --- DATOS DE FOTOS Y GALERÍAS (Reemplazar con tus links) ---

const civilPhotoLinks = [
  'https://i.postimg.cc/DZFGcT8V/SAL-4480.jpg',
  'https://i.postimg.cc/zXJV27zd/SAL-4486.jpg',
  'https://i.postimg.cc/c17vc2Sw/SAL-4488.jpg',
  'https://i.postimg.cc/8zcsNCrb/SAL-4490.jpg',
  'https://i.postimg.cc/DzbZ4Y63/SAL-4496.jpg',
  'https://i.postimg.cc/RVD41LN1/SAL-4498.jpg',
  'https://i.postimg.cc/MHsxFy5b/SAL-4499.jpg',
  'https://i.postimg.cc/W1qj5qkw/SAL-4500.jpg',
  'https://i.postimg.cc/CxnYcnqt/SAL-4501.jpg',
  'https://i.postimg.cc/wvgpxWb2/SAL-4503.jpg',
  'https://i.postimg.cc/rmjLDSB8/SAL-4507.jpg',
  'https://i.postimg.cc/RCPB9L17/SAL-4509.jpg',
  'https://i.postimg.cc/HkMDwDGm/SAL-4510.jpg',
  'https://i.postimg.cc/ryZv7Fcn/SAL-4512.jpg',
  'https://i.postimg.cc/QNYRvxh3/SAL-4513.jpg',
  'https://i.postimg.cc/SQ1wHNq1/SAL-4515.jpg',
  'https://i.postimg.cc/2j9Pg8rY/SAL-4517.jpg',
  'https://i.postimg.cc/9QZK4d9s/SAL-4518.jpg',
  'https://i.postimg.cc/0yDF6YSL/SAL-4520.jpg',
  'https://i.postimg.cc/qvyStsnT/SAL-4522.jpg',
  'https://i.postimg.cc/8zM9FRWP/SAL-4524.jpg',
  'https://i.postimg.cc/HkXRJw5J/SAL-4526.jpg',
  'https://i.postimg.cc/B6YVWMWm/SAL-4528.jpg',
  'https://i.postimg.cc/Px3RG2GZ/SAL-4530.jpg',
  'https://i.postimg.cc/wvfGK0K4/SAL-4532.jpg',
  'https://i.postimg.cc/4yYFXVsZ/SAL-4534.jpg',
  'https://i.postimg.cc/g0MCdY88/SAL-4535.jpg',
  'https://i.postimg.cc/GpMWrcGj/SAL-4537.jpg',
  'https://i.postimg.cc/ZqfGZTpP/SAL-4538.jpg',
  'https://i.postimg.cc/pd0wx2zK/SAL-4540.jpg',
  'https://i.postimg.cc/BvsStQjD/SAL-4541.jpg',
  'https://i.postimg.cc/mrRLh2PH/SAL-4542.jpg',
  'https://i.postimg.cc/9fVmzFDB/SAL-4548.jpg',
  'https://i.postimg.cc/8CDpsP7y/SAL-4549.jpg',
  'https://i.postimg.cc/gjwd1x7w/SAL-4555.jpg',
  'https://i.postimg.cc/mkcRKPnz/SAL-4556.jpg',
  'https://i.postimg.cc/d37vghft/SAL-4559.jpg',
  'https://i.postimg.cc/2yqmg1tv/SAL-4561.jpg',
  'https://i.postimg.cc/wB6zgfPp/SAL-4562.jpg',
  'https://i.postimg.cc/0QjqJ6P4/SAL-4563.jpg',
  'https://i.postimg.cc/KYZbxqWH/SAL-4564.jpg',
  'https://i.postimg.cc/43JGsLMZ/SAL-4565.jpg',
  'https://i.postimg.cc/3RqQjKxz/SAL-4567.jpg',
  'https://i.postimg.cc/rmH2G8pM/SAL-4568.jpg',
  'https://i.postimg.cc/cC8yXVKx/SAL-4575.jpg',
  'https://i.postimg.cc/C5fTmWZ7/SAL-4588.jpg',
  'https://i.postimg.cc/KcdRxbD5/SAL-4589.jpg',
  'https://i.postimg.cc/zD9V8NFS/SAL-4598.jpg',
  'https://i.postimg.cc/pVgpRvB2/SAL-4601.jpg',
  'https://i.postimg.cc/6pKq4hSq/SAL-4603.jpg',
  'https://i.postimg.cc/wjkvXmYT/SAL-4604.jpg',
  'https://i.postimg.cc/hGytwRGV/SAL-4606.jpg',
  'https://i.postimg.cc/8CKz3gCM/SAL-4608.jpg',
  'https://i.postimg.cc/HxFsY0XV/SAL-4610.jpg',
  'https://i.postimg.cc/y6S8f5CS/SAL-4613.jpg',
  'https://i.postimg.cc/Vkzskkrh/SAL-4614.jpg',
  'https://i.postimg.cc/4xX4xx7L/SAL-4616.jpg',
  'https://i.postimg.cc/dVJQVVkg/SAL-4619.jpg',
  'https://i.postimg.cc/KYzZtp5Y/SAL-4629.jpg',
  'https://i.postimg.cc/C5ySThpj/SAL-4630.jpg',
  'https://i.postimg.cc/L5d2K9FV/SAL-4632.jpg',
  'https://i.postimg.cc/903C5mHJ/SAL-4635.jpg',
  'https://i.postimg.cc/05m9Gw7S/SAL-4636.jpg',
  'https://i.postimg.cc/X7k3m6HK/SAL-4639.jpg',
  'https://i.postimg.cc/020xF1WC/SAL-4640.jpg',
  'https://i.postimg.cc/Hs9HR1Z9/SAL-4641.jpg',
  'https://i.postimg.cc/SxZ4Q7pz/SAL-4642.jpg',
  'https://i.postimg.cc/xdhSMf8T/SAL-4643.jpg',
  'https://i.postimg.cc/QMwr18CN/SAL-4644.jpg',
  'https://i.postimg.cc/wBZdLqMM/SAL-4645.jpg',
  'https://i.postimg.cc/V6tPFx0n/SAL-4646.jpg',
  'https://i.postimg.cc/jqzrnrbV/SAL-4647.jpg',
  'https://i.postimg.cc/X746wDj4/SAL-4648.jpg',
  'https://i.postimg.cc/8PNghnpV/SAL-4651.jpg',
  'https://i.postimg.cc/wjBKrysp/SAL-4652.jpg',
  'https://i.postimg.cc/4xFCRfzm/SAL-4653.jpg',
  'https://i.postimg.cc/d07bqb6K/SAL-4654.jpg',
  'https://i.postimg.cc/R0jjqgsD/SAL-4655.jpg',
  'https://i.postimg.cc/13S0RwKh/SAL-4772.jpg',
  'https://i.postimg.cc/6phr8qHs/SAL-4775.jpg',
  'https://i.postimg.cc/bwRxZr6h/SAL-4777.jpg',
  'https://i.postimg.cc/1z5pwSTf/SAL-4778.jpg',
  'https://i.postimg.cc/mrX7SqfJ/SAL-4781.jpg',
  'https://i.postimg.cc/BbDD4nLS/SAL-4782.jpg',
  'https://i.postimg.cc/7h77wZGL/SAL-4784.jpg',
  'https://i.postimg.cc/zfn9bnsp/SAL-4887.jpg',
  'https://i.postimg.cc/jjzGwzph/SAL-4889.jpg',
  'https://i.postimg.cc/j2k90vfb/SAL-4890.jpg',
  'https://i.postimg.cc/zDd4gDcC/SAL-4891.jpg',
  'https://i.postimg.cc/SQZHMQvT/SAL-4893.jpg',
  'https://i.postimg.cc/8Pj9BQ8r/SAL-4896.jpg',
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