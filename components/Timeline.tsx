import React from 'react';
import { TimelineEvent } from '../types';

const events: TimelineEvent[] = [
  {
    year: "2022",
    title: "El Primer Encuentro",
    description: "Nos encontramos fugazmente en una estación de servicios de Rio Cuarto. Sin saber que íbamos al mismo encuentro, allí la conocí. Luego la contacté por Instagram... ¿Quién iba a decir que esa cita definiría nuestro futuro?",
    image: ""
  },
  {
    year: "2022",
    title: "Nuestro Primer Viaje",
    description: "En Octubre de ese mismo año, concurrimos juntos a nuestro primer encuentro. Un accidente nos puso a prueba, pero el destino nos demostró que estábamos hechos para cuidarnos mutuamente.",
    image: ""
  },
  {
    year: "2025",
    title: "La Propuesta",
    description: "En el casamiento de mi Tío Emmanuel. Todo estaba planeado: cuando la novia tiró el ramo, se lo entregó en mano a Roxana. En ese instante aparecí con los anillos. Fue mágico.",
    image: ""
  },
  {
    year: "2026",
    title: "El Gran Día",
    description: "Hoy escribimos nuestra historia juntos. Vamos a convertirnos en Uno y, desde aquí, comenzaremos a vivir el sueño: viajar sin parar, por siempre.",
    image: ""
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="relative container mx-auto px-4 py-12 max-w-6xl">
      {/* Central Dashed Line - The Path */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-blue-200 transform -translate-x-1/2 hidden md:block"></div>
      
      {/* Mobile Line - Left Side */}
      <div className="absolute left-8 top-0 bottom-0 w-px border-l-2 border-dashed border-blue-200 md:hidden"></div>

      <div className="space-y-16">
        {events.map((event, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col md:flex-row items-center w-full group ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Content Spacer for Desktop */}
            <div className="hidden md:block md:w-5/12"></div>

            {/* Central Year Node */}
            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
               {/* Pulsing Ring - Always Active */}
               <div className="absolute w-20 h-20 bg-blue-100/50 rounded-full animate-pulse-glow"></div>
               
               {/* The Year Bubble */}
               <div className="w-16 h-16 bg-white rounded-full border-2 border-wedding-royal flex items-center justify-center shadow-xl relative z-20 transition-transform duration-300 group-hover:scale-110">
                  <span className="font-cinzel font-bold text-wedding-royal text-sm">{event.year}</span>
               </div>
            </div>

            {/* Connector Line (Horizontal) */}
            <div className={`hidden md:block absolute top-1/2 h-0.5 bg-blue-200 w-10 sm:w-20 lg:w-32 z-0
               ${index % 2 === 0 ? 'left-1/2 ml-8' : 'right-1/2 mr-8'}
            `}></div>

            {/* Content Card */}
            <div className="w-full pl-24 md:pl-0 md:w-5/12 mt-2 md:mt-0 relative z-10">
               {/* Mobile Connector */}
               <div className="absolute left-8 top-8 w-16 h-0.5 bg-blue-200 md:hidden z-0"></div>

               <div className={`
                  bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-wedding-royal
                  hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500
                  ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}
               `}>
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-800 mb-4 group-hover:text-wedding-royal transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-slate-600 font-serif leading-relaxed text-sm sm:text-base">
                    {event.description}
                  </p>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* End Dot */}
      <div className="absolute bottom-0 left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-wedding-royal rounded-full border-4 border-white shadow animate-pulse"></div>
    </div>
  );
};

export default Timeline;