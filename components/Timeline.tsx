import React from 'react';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  {
    year: "2020",
    title: "El Primer Encuentro",
    description: "En una pequeña cafetería del centro, una coincidencia de horarios nos llevó a compartir mesa. Una charla de 5 minutos se convirtió en 5 horas.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop"
  },
  {
    year: "2021",
    title: "Nuestro Primer Viaje",
    description: "París fue testigo de nuestras primeras aventuras internacionales. Bajo la lluvia y con un mapa perdido, supimos que éramos el mejor equipo.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop"
  },
  {
    year: "2023",
    title: "La Propuesta",
    description: "En la playa donde vimos nuestro primer atardecer juntos. Hubo lágrimas de felicidad y una promesa para siempre.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    year: "2026",
    title: "El Gran Día",
    description: "Hoy escribimos el capítulo más importante hasta ahora. Gracias por ser parte de nuestra historia.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="relative container mx-auto px-4 py-12">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-wedding-royal to-transparent md:transform md:-translate-x-1/2"></div>

      <div className="space-y-12 sm:space-y-24">
        {events.map((event, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-wedding-royal rounded-full border-4 border-white shadow-lg md:transform md:-translate-x-1/2 z-10 mt-6 md:mt-0"></div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right">
              {index % 2 !== 0 && (
                <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group border-blue-100">
                  <span className="text-wedding-royal font-bold font-cinzel text-xl block mb-2">{event.year}</span>
                  <h3 className="text-2xl font-serif text-slate-800 mb-3 group-hover:text-wedding-royal transition-colors">{event.title}</h3>
                  <p className="text-slate-600 font-sans leading-relaxed">{event.description}</p>
                </div>
              )}
            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 pl-12 md:pl-12 md:pr-0 mt-6 md:mt-0">
               {index % 2 === 0 ? (
                 <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 text-left group border-blue-100">
                   <span className="text-wedding-royal font-bold font-cinzel text-xl block mb-2">{event.year}</span>
                   <h3 className="text-2xl font-serif text-slate-800 mb-3 group-hover:text-wedding-royal transition-colors">{event.title}</h3>
                   <p className="text-slate-600 font-sans leading-relaxed">{event.description}</p>
                 </div>
               ) : (
                 <div className="overflow-hidden rounded-2xl shadow-lg border-4 border-white/50 h-48 sm:h-64 w-full relative group">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wedding-royal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 </div>
               )}
            </div>
            
            {/* Image Side for Left aligned items (Even index) */}
            {index % 2 === 0 && (
               <div className="hidden md:block w-1/2 pr-12 absolute right-0">
                 <div className="overflow-hidden rounded-2xl shadow-lg border-4 border-white/50 h-64 w-full relative group">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wedding-royal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 </div>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;