import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
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
            onClick={scrollToRsvp}
            className={`relative z-10 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-widest uppercase transition-all duration-300 flex flex-col items-center leading-tight shadow-lg animate-pulse-glow ${
            scrolled
            ? 'bg-wedding-royal text-white'
            : 'bg-white text-wedding-royal'
           }`}
           >
              <span className="font-bold drop-shadow-sm">Confirmá tu Asistencia</span>
              <span className={`text-[10px] sm:text-[10px] font-sans normal-case tracking-wide opacity-90 ${scrolled ? 'text-blue-100' : 'text-wedding-royal-500'}`}>antes del 05/01/2026</span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;