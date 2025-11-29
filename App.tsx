
import React, { useState } from 'react';
import BackgroundParticles from './components/BackgroundParticles';
import Countdown from './components/Countdown';
import Rsvp from './components/Rsvp';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import RoseDecoration from './components/RoseDecoration';
import { MapPin, Heart, PartyPopper, Church, CheckCircle, X, ExternalLink, Utensils, Phone, Gift, Copy } from 'lucide-react';

const WEDDING_DATE = new Date('2026-01-17T16:00:00');

function App() {
  const [showItinerary, setShowItinerary] = useState(false);
  const [showCatering, setShowCatering] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-blue-200 selection:text-blue-900 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <BackgroundParticles />
      <Navbar />

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
            Nos Casamos!
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-cinzel text-slate-900 font-bold tracking-tighter drop-shadow-sm leading-none">
            Andres <span className="text-wedding-royal font-serif italic font-light text-4xl sm:text-7xl align-middle mx-2">&</span> Roxana
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-slate-700 pt-4">
            <div className="h-px w-8 sm:w-16 bg-wedding-royal/50"></div>
            <p className="text-lg sm:text-2xl font-sans font-light tracking-[0.3em] uppercase text-slate-800">
              17 . 01 . 2026
            </p>
            <div className="h-px w-8 sm:w-16 bg-wedding-royal/50"></div>
          </div>

          <div className="pt-10">
             <Countdown targetDate={WEDDING_DATE} />
          </div>
        </div>
      </header>
      
      {/* Story Section (Timeline) */}
      <section id="historia" className="py-24 px-4 relative z-10 bg-gradient-to-b from-transparent to-white/50">
        <div className="text-center mb-20 relative">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
              <RoseDecoration color="blue" />
           </div>
           <Heart className="w-10 h-10 text-wedding-royal mx-auto mb-6 fill-current animate-pulse-slow drop-shadow-md" />
           <h2 className="text-4xl sm:text-6xl font-cinzel text-slate-800 mb-6">Nuestra Historia</h2>
           <p className="text-lg text-slate-600 font-serif italic max-w-2xl mx-auto px-4 leading-relaxed">
             Cada momento nos trajo hasta aquí. Un recorrido por unos capítulos de nuestro amor.
           </p>
        </div>
        <Timeline />
      </section>

      {/* Details Section */}
      <section id="detalles" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          {/* Decorative roses on sides of section */}
          <div className="absolute top-20 left-0 w-40 h-40 -translate-x-1/2 opacity-20 hidden md:block">
             <RoseDecoration color="blue" />
          </div>
          <div className="absolute bottom-20 right-0 w-40 h-40 translate-x-1/2 opacity-20 hidden md:block">
             <RoseDecoration color="blue" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel text-slate-800 text-center mb-16 drop-shadow-sm">Detalles del Evento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Civil */}
            <div className="glass-card p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden border-blue-100/50 bg-gradient-to-br from-white/80 to-blue-50/50">
              <div className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-6 text-wedding-royal mx-auto group-hover:bg-wedding-royal group-hover:text-white transition-colors duration-500 z-10 relative shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-center mb-4 text-slate-800">Civil</h3>
              
              <div className="space-y-4 text-center relative z-10">
                 <div className="bg-white/50 py-2 rounded-lg">
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Cuándo</p>
                    <p className="text-slate-700 font-serif text-xl">16 de Enero, 2026</p>
                    <p className="text-slate-600 font-sans text-sm font-bold text-wedding-royal">11:00 AM</p>
                 </div>
                 <div>
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Dónde</p>
                    <p className="text-slate-800 font-medium text-lg">Registro Civil</p>
                    <p className="text-slate-500 text-sm">Bernardino Rivadavia 1232, Correa, Santa Fe</p>
                 </div>
                 <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-wedding-royal font-bold text-sm hover:text-blue-900 transition-colors pt-4 border-b-2 border-transparent hover:border-blue-900">
                   <MapPin className="w-4 h-4" /> VER MAPA
                 </a>
              </div>
            </div>

            {/* Card 2: Iglesia */}
            <div className="glass-card p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden border-blue-100/50 bg-gradient-to-br from-white/80 to-blue-50/50">
              <div className="w-16 h-16 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-6 text-wedding-royal mx-auto group-hover:bg-wedding-royal group-hover:text-white transition-colors duration-500 z-10 relative shadow-inner">
                <Church className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-center mb-4 text-slate-800">Iglesia</h3>
              
              <div className="space-y-4 text-center relative z-10">
                 <div className="bg-white/50 py-2 rounded-lg">
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Cuándo</p>
                    <p className="text-slate-700 font-serif text-xl">17 de Enero, 2026</p>
                    <p className="text-slate-600 font-sans text-sm font-bold text-wedding-royal">11:00 PM</p>
                 </div>
                 <div>
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Dónde</p>
                    <p className="text-slate-800 font-medium text-lg">Parroquia San Pedro</p>
                    <p className="text-slate-500 text-sm">Lavalle 886, Cañada de Gómez, Santa Fe</p>
                 </div>
                 <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-wedding-royal font-bold text-sm hover:text-blue-900 transition-colors pt-4 border-b-2 border-transparent hover:border-blue-900">
                   <MapPin className="w-4 h-4" /> VER MAPA
                 </a>
              </div>
            </div>

            {/* Card 3: Fiesta */}
            <div className="glass-card p-8 rounded-3xl shadow-2xl border-blue-200 hover:-translate-y-2 transition-transform duration-300 group relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-blue-100/50">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -mt-8 -mr-8 transition-transform group-hover:rotate-12">
                  <RoseDecoration color="blue" />
              </div>
              
              <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-blue-200 mx-auto group-hover:scale-110 transition-transform duration-500 z-10 relative shadow-lg ring-4 ring-blue-50">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-cinzel font-bold text-center mb-2 text-slate-900">La Fiesta</h3>
              
              <button 
                onClick={() => setShowCatering(true)}
                className="w-full text-center font-bold text-wedding-royal text-xs uppercase tracking-wider mb-6 hover:text-blue-800 transition-colors flex items-center justify-center gap-1 cursor-pointer group/link"
              >
                <span>Conocé el Catering</span>
                <Utensils className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </button>

              <div className="space-y-4 text-center relative z-10 mb-6">
                 <div>
                    <p className="text-slate-800 font-serif text-xl font-medium">Ubicación "Campo Adentro"</p>
                    <p className="text-slate-500 text-sm mb-1">Ruta Nacional 9, Km 385</p>
                    <div className="inline-block bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold tracking-wide">12:30 PM</div>
                 </div>
                 
                 <div className="bg-white/60 p-4 rounded-xl border border-blue-100 text-sm space-y-2 shadow-sm backdrop-blur-sm">
                   <p className="flex justify-between items-center border-b border-blue-50 pb-1"><span className="text-slate-600 font-medium">Adultos</span> <span className="font-bold text-slate-900 text-base">$39.000</span></p>
                   <p className="flex justify-between items-center border-b border-blue-50 pb-1"><span className="text-slate-600 font-medium">Niños (4-12)</span> <span className="font-bold text-slate-900 text-base">$19.500</span></p>
                   <p className="flex justify-between items-center pt-1"><span className="text-slate-600 font-medium">Niños (1-3)</span> <span className="font-bold text-wedding-royal uppercase text-xs bg-blue-50 px-2 py-0.5 rounded">No Pagan</span></p>
                 </div>

                 <div className="flex justify-center gap-4 pt-2">
                    <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-slate-500 font-bold text-xs hover:text-wedding-royal transition-colors uppercase tracking-wide">
                       <MapPin className="w-3 h-3" /> Ver Ubicación
                    </a>
                 </div>
              </div>

              <button 
                onClick={() => setShowItinerary(true)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl text-sm font-bold tracking-widest hover:bg-wedding-royal transition-colors shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group/btn"
              >
                CONOCÉ EL ITINERARIO <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto relative">
           {/* Background decoration */}
           <div className="absolute -top-10 -left-10 w-40 h-40 opacity-30 pointer-events-none rotate-12">
              <RoseDecoration color="blue" />
           </div>

           <div className="glass-card p-8 sm:p-14 rounded-[2.5rem] shadow-xl border border-blue-100/50 text-center relative overflow-hidden bg-gradient-to-br from-white/90 to-blue-50/60">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-wedding-royal to-transparent opacity-50"></div>
              
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100/50 text-wedding-royal mb-6 shadow-sm ring-4 ring-white">
                 <Gift className="w-8 h-8" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-cinzel text-slate-800 mb-6 font-bold">¿Quieres Regalarnos algo?</h2>
              
              <p className="text-lg text-slate-600 font-serif italic mb-8 max-w-2xl mx-auto leading-relaxed">
                "Como somos viajeros, nos puedes regalar kilómetros de aventura al siguiente alias:"
              </p>

              <div className="max-w-sm mx-auto bg-white p-2 rounded-2xl border border-blue-200 shadow-lg flex items-center justify-between pl-6 pr-2 py-2 gap-4 transform hover:scale-105 transition-transform duration-300">
                 <span className="font-mono text-xl sm:text-2xl font-bold text-wedding-royal tracking-wider truncate">andresmunini</span>
                 <button 
                    onClick={() => {
                       navigator.clipboard.writeText('andresmunini');
                       alert('Alias copiado al portapapeles');
                    }}
                    className="p-3 bg-blue-50 hover:bg-wedding-royal hover:text-white text-wedding-royal rounded-xl transition-all duration-300 shadow-sm"
                    title="Copiar Alias"
                 >
                    <Copy className="w-5 h-5" />
                 </button>
              </div>
              <p className="mt-4 text-xs font-bold uppercase text-slate-400 tracking-widest">Mercado Pago</p>
           </div>
        </div>
      </section>

      {/* Itinerary Modal */}
      {showItinerary && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white/95 rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl overflow-hidden border border-white">
             {/* Watermark */}
             <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
                <RoseDecoration color="blue" />
             </div>

            <button onClick={() => setShowItinerary(false)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10">
              <X className="w-6 h-6 text-slate-500" />
            </button>
            
            <h3 className="text-2xl font-cinzel text-center mb-8 text-wedding-royal font-bold tracking-wide">Itinerario de Fiesta</h3>
            
            <div className="space-y-8 relative pl-4 border-l-2 border-blue-100 ml-4 py-2 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
               {/* 12:30 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-wedding-royal border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">12:30</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Recepción de invitados</h4>
               </div>
               
               {/* 13:00 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">13:00</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Entrada de Novios</h4>
                 <p className="text-sm text-slate-500">Primer baile oficial</p>
               </div>

               {/* 13:50 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-indigo-400 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">13:50</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Discurso de los Novios</h4>
               </div>

               {/* 14:00 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">14:00</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Almuerzo Principal</h4>
                 <p className="text-sm text-slate-500">Menú de 3 pasos</p>
               </div>

               {/* 16:00 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-wedding-royal border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">16:00</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">¡Fiesta!</h4>
               </div>

               {/* 16:40 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">16:40</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Tirada de Ramo</h4>
               </div>

               {/* 17:00 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-indigo-400 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">17:00</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Fotos en la Torta</h4>
                 <p className="text-sm text-slate-500">Fotos grupales</p>
               </div>

               {/* 17:40 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">17:40</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Corte de Torta</h4>
               </div>

               {/* 18:00 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-wedding-royal border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">18:00</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">¡Segunda Tanda!</h4>
               </div>

               {/* 18:30 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-blue-400 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">18:30</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Refrigerio</h4>
                 <p className="text-sm text-slate-500">Pizzas y Sándwiches</p>
               </div>

               {/* 19:00 */}
               <div className="relative group">
                 <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-slate-800 border-4 border-white shadow group-hover:scale-125 transition-transform"></div>
                 <p className="font-bold text-blue-500 text-sm mb-1">19:00</p>
                 <h4 className="font-serif text-lg text-slate-800 font-bold">Fin de Fiesta</h4>
                 <p className="text-sm text-slate-500">Despedida</p>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Catering Modal */}
      {showCatering && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
             
             {/* Header Image/Design */}
             <div className="h-32 bg-gradient-to-r from-wedding-royal to-blue-600 relative p-6 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                <h3 className="text-3xl font-cinzel font-bold text-white text-center shadow-sm">Menú de Bodas</h3>
                <button onClick={() => setShowCatering(false)} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white">
                  <X className="w-5 h-5" />
                </button>
             </div>

             <div className="p-6 overflow-y-auto space-y-8 bg-white relative">
                <div className="text-center border-b border-slate-100 pb-4">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Catering a cargo de</p>
                   <p className="text-xl font-serif italic text-wedding-royal font-bold">"Campo Adentro"</p>
                </div>

                <div className="space-y-8">
                   <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-wedding-royal shadow-sm ring-1 ring-blue-100">
                        <span className="font-cinzel font-bold text-lg">1</span>
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-slate-800 text-lg mb-1">Recepción</h4>
                        <p className="text-sm text-slate-600 font-serif">Sándwich de miga de jamón y queso, empanadas de copetin de carne.</p>
                      </div>
                   </div>

                   <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-wedding-royal shadow-sm ring-1 ring-blue-100">
                        <span className="font-cinzel font-bold text-lg">2</span>
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-slate-800 text-lg mb-1">Plato Principal</h4>
                        <p className="text-sm text-slate-600 font-serif">Pollo y cerdo a la parrilla con ensaladas y papas fritas.</p>
                      </div>
                   </div>

                   <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-wedding-royal shadow-sm ring-1 ring-blue-100">
                        <span className="font-cinzel font-bold text-lg">3</span>
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-slate-800 text-lg mb-1">Postre</h4>
                        <p className="text-sm text-slate-600 font-serif">Torta Helada.</p>
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-wedding-royal shadow-sm ring-1 ring-blue-100">
                        <span className="font-cinzel font-bold text-lg">4</span>
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-slate-800 text-lg mb-1">Fin de Fiesta</h4>
                        <p className="text-sm text-slate-600 font-serif">Pizzas y Sándwich de bondiola desmechada.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-slate-100">
                * Menú sujeto a modificaciones estacionales
             </div>
          </div>
        </div>
      )}

      {/* RSVP Section */}
      <section id="rsvp" className="py-24 px-4 relative z-10">
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-blue-100 animate-spin-slow opacity-60 pointer-events-none">
            <RoseDecoration color="blue" />
         </div>

        <div className="text-center mb-12 relative">
           <span className="text-wedding-royal tracking-[0.3em] text-sm font-bold uppercase mb-2 block"> </span>
           <h2 className="text-4xl sm:text-6xl font-cinzel text-slate-800 mb-6">Confirmar Asistencia</h2>
           <p className="text-slate-600 font-serif italic text-lg px-4">Esperamos contar con tu presencia en esta noche mágica.</p>
        </div>
        <div className="relative">
            <Rsvp />
        </div>
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
