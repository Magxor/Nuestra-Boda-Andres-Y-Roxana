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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4 sm:py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className={`font-cinzel font-bold text-xl transition-colors ${scrolled ? 'text-slate-800' : 'text-slate-800'}`}>
          A <span className="text-wedding-royal">&</span> R
        </div>
        
        <div className="flex items-center">
            <button
              onClick={scrollToRsvp}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-widest uppercase transition-all border flex flex-col items-center leading-tight ${
                  scrolled 
                    ? 'bg-wedding-royal text-white border-wedding-royal hover:bg-blue-700' 
                    : 'bg-white/40 backdrop-blur text-wedding-royal border-wedding-royal/30 hover:bg-wedding-royal hover:text-white'
              }`}
            >
              <span>Confirmar Asistencia</span>
              <span className="text-[12px] opacity-80 font-sans normal-case tracking-normal">hasta el 10/01/2026</span>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;