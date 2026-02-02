import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPhotos = () => {
    const el = document.getElementById('photo-gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-4 sm:py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className={`font-cinzel font-bold text-xl transition-colors ${scrolled ? 'text-wedding-royal' : 'text-slate-800'}`}>
          A <span className="text-wedding-royal">&</span> R
        </div>
        
        <div className="flex items-center relative">
            <button
            onClick={scrollToPhotos}
            className={`relative z-10 px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-medium tracking-widest uppercase transition-all duration-300 shadow-lg animate-pulse-glow ${
            scrolled
            ? 'bg-wedding-royal text-white'
            : 'bg-white text-wedding-royal'
           }`}
           >
              <span className="font-bold drop-shadow-sm">Ver Fotos</span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;