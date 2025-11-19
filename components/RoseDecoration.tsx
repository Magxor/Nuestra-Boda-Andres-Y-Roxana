import React from 'react';

interface RoseProps {
  className?: string;
  color?: 'blue' | 'white';
}

const RoseDecoration: React.FC<RoseProps> = ({ className = "", color = 'blue' }) => {
  const mainColor = color === 'blue' ? '#1560BD' : '#FFFFFF';
  const accentColor = color === 'blue' ? '#1E90FF' : '#F0F8FF';
  
  return (
    <div className={`pointer-events-none ${className}`}>
        <svg 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-full drop-shadow-lg opacity-90"
        >
           <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
           </defs>
           <g transform="translate(100,100) scale(0.9)">
               {/* Leaves */}
               <path 
                 d="M-40 40 Q -70 70 -90 30 Q -70 0 -40 20 Z" 
                 fill={color === 'blue' ? '#0F4C81' : '#E2E8F0'} 
                 opacity="0.6"
               />
               <path 
                 d="M40 40 Q 70 70 90 30 Q 70 0 40 20 Z" 
                 fill={color === 'blue' ? '#0F4C81' : '#E2E8F0'} 
                 opacity="0.6"
                 transform="rotate(-10)"
               />

               {/* Outer Petals */}
               <path 
                 d="M0,-70 C40,-70 70,-40 70,0 C70,40 40,70 0,70 C-40,70 -70,40 -70,0 C-70,-40 -40,-70 0,-70" 
                 fill={accentColor} 
                 opacity="0.2"
               />
               
               {/* Rose Layers - Artistic Representation */}
               <path 
                 d="M-10,-50 C20,-60 50,-40 55,-10 C60,20 40,50 10,55 C-20,60 -50,40 -55,10 C-60,-20 -40,-50 -10,-50" 
                 fill="none" 
                 stroke={mainColor} 
                 strokeWidth="2.5"
                 strokeLinecap="round"
               />
               
               <path 
                 d="M-20,-30 C5,-45 40,-30 45,0 C50,25 30,45 5,45 C-25,45 -40,25 -40,0 C-40,-25 -25,-40 -20,-30" 
                 fill={color === 'blue' ? 'rgba(21, 96, 189, 0.1)' : 'rgba(255,255,255,0.2)'}
                 stroke={mainColor} 
                 strokeWidth="3"
                 strokeLinecap="round"
                 transform="rotate(45)"
               />

               {/* Inner Bud Spiral */}
               <path 
                 d="M0,0 m-25,0 a25,25 0 1,0 50,0 a25,25 0 1,0 -50,0" 
                 fill="none" 
                 stroke={mainColor} 
                 strokeWidth="2"
                 strokeDasharray="10 5"
                 opacity="0.5"
               />
               
               <path 
                 d="M0,0 C10,-15 25,-5 20,10 C15,25 -5,25 -15,15 C-25,5 -15,-15 0,0" 
                 fill={color === 'blue' ? '#1560BD' : '#ffffff'} 
                 stroke={mainColor}
                 strokeWidth="3"
                 className="drop-shadow-md"
               />
               
               <path 
                 d="M5,5 Q 15,-5 25,5" 
                 fill="none" 
                 stroke={mainColor} 
                 strokeWidth="2"
                 strokeLinecap="round"
               />
           </g>
        </svg>
    </div>
  );
};

export default RoseDecoration;