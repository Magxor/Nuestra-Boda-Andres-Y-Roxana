import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px 0px' } // Cargar imágenes 100px antes de que entren en la vista
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isInView) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setIsLoaded(true);
        };
    }
  }, [isInView, src]);

  return (
    <div ref={placeholderRef} className={`w-full h-full relative ${className}`}>
      {!isLoaded && (
        <div className="w-full h-full bg-slate-200 animate-pulse" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-110 transition-transform duration-300`}
        />
      )}
    </div>
  );
};

export default LazyImage;
