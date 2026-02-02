
import React, { useState } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import Navbar from './components/Navbar';
import RoseDecoration from './components/RoseDecoration';
import MusicPlayer from './components/MusicPlayer';
import PhotoGallery from './components/PhotoGallery';
import { Heart, Camera } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-blue-200 selection:text-blue-900 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <BackgroundParticles />
      <Navbar />
      <MusicPlayer />

      {/* Decorative Roses - Fixed Corners */}
      <div className="fixed top-[-20px] left-[-20px] w-48 h-48 sm:w-80 sm:h-80 z-0 opacity-60 pointer-events-none">
        <RoseDecoration color="blue" />
      </div>
      <div className="fixed bottom-[-20px] right-[-20px] w-48 h-48 sm:w-80 sm:h-80 z-0 opacity-40 rotate-180 pointer-events-none">
        <RoseDecoration color="blue" />
      </div>

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        
        {/* Hero Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519225468359-19fb85886508?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/40 to-blue-50/90"></div>
        </div>

        <div className="animate-fade-in-up space-y-8 z-10 max-w-4xl mx-auto bg-white/30 backdrop-blur-xl p-8 sm:p-16 rounded-[3rem] border border-white/60 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 -mt-10 -mr-10 opacity-30 transition-transform group-hover:scale-110 duration-1000">
             <RoseDecoration color="blue" />
          </div>
          
          <div className="inline-block border border-wedding-royal/50 px-6 py-2 rounded-full text-wedding-royal text-xs sm:text-sm font-bold tracking-[0.2em] mb-4 bg-white/60 uppercase shadow-sm">
            ¡Gracias por acompañarnos!
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-cinzel text-slate-900 font-bold tracking-tighter drop-shadow-sm leading-none">
            Andres <span className="text-wedding-royal font-serif italic font-light text-4xl sm:text-7xl align-middle mx-2">&</span> Roxana
          </h1>
          
          <p className="text-lg sm:text-xl font-serif italic text-slate-700 pt-6 max-w-2xl mx-auto">
            Reviví con nosotros los momentos más especiales de nuestro gran día. Explora la galería y descarga tus fotos favoritas.
          </p>

          <div className="pt-10">
            <button 
              onClick={() => document.getElementById('photo-gallery')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-wedding-royal text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors animate-pulse-glow flex items-center gap-3 mx-auto uppercase tracking-widest text-sm"
            >
              <Camera className="w-5 h-5" />
              Ir a la Galería
            </button>
          </div>
        </div>
      </header>
      
      {/* Photo Gallery Section */}
      <section id="photo-gallery" className="py-24 px-4 relative z-10">
        <div className="text-center mb-20 relative">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
              <RoseDecoration color="blue" />
           </div>
           <Heart className="w-10 h-10 text-wedding-royal mx-auto mb-6 fill-current animate-pulse-slow drop-shadow-md" />
           <h2 className="text-4xl sm:text-6xl font-cinzel text-slate-800 mb-6">Nuestros Recuerdos</h2>
           <p className="text-lg text-slate-600 font-serif italic max-w-2xl mx-auto px-4 leading-relaxed">
             Cada foto cuenta una parte de nuestra historia. Gracias por ser parte de ella.
           </p>
        </div>
        <PhotoGallery />
      </section>

      {/* Footer */}
      <footer className="py-12 text-center relative z-10 border-t border-blue-100 bg-white/60 backdrop-blur-lg">
        <div className="flex justify-center mb-4">
           <div className="w-12 h-12 opacity-60">
              <RoseDecoration color="blue" />
           </div>
        </div>
        <p className="font-cinzel text-slate-800 text-3xl font-bold mb-6">A <span className="text-wedding-royal">&</span> R</p>
        
        <p className="font-sans text-slate-500 text-xs tracking-widest uppercase flex items-center justify-center gap-1">
          Hecho con <Heart className="w-3 h-3 inline text-wedding-royal fill-current animate-pulse" /> por <a href="https://Magxor.short.gy/magxor" target="_blank" rel="noreferrer" className="font-bold text-slate-700 hover:text-wedding-royal transition-colors">Magxor Digital</a>
        </p>
      </footer>
    </div>
  );
}

export default App;