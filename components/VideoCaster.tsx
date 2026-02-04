import React, { useEffect, useRef, useState } from 'react';
import { Photo } from '../types';
import { Loader, XCircle } from 'lucide-react';

interface VideoCasterProps {
  photos: Photo[];
  onClose: () => void;
}

const SLIDE_DURATION = 5000; // 5 segundos por diapositiva
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const VideoCaster: React.FC<VideoCasterProps> = ({ photos, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState('Iniciando transmisión...');
  const isCasting = useRef(false);

  useEffect(() => {
    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Necesario para cargar imágenes de postimg.cc en el canvas
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    const startCasting = async () => {
      if (!canvasRef.current || !videoRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const video = videoRef.current;
      
      if (!ctx) {
        setStatus('Error al iniciar el canvas.');
        return;
      }
       
      if (!('remote' in video) || typeof (video as any).remote.prompt !== 'function') {
        setStatus('Tu navegador no soporta esta función. Prueba con Google Chrome.');
        return;
      }

      setStatus('Cargando imágenes (esto puede tardar un momento)...');
      let loadedImages: HTMLImageElement[];
      try {
        loadedImages = await Promise.all(photos.map(p => loadImage(p.fullUrl)));
      } catch (error) {
        console.error("Error al cargar una o más imágenes:", error);
        setStatus('Error al cargar las imágenes. Intenta de nuevo.');
        return;
      }

      // Conectar el stream del canvas al elemento de video
      const stream = canvas.captureStream(30); // 30 fps
      video.srcObject = stream;
      video.play().catch(e => console.error("Video play error", e));

      const remote = (video as any).remote;
      
      remote.onconnecting = () => setStatus('Conectando al dispositivo...');
      remote.onconnect = () => setStatus('¡Conectado! Reproduciendo en tu TV...');
      remote.ondisconnect = () => {
        isCasting.current = false;
        onClose();
      };
      
      try {
        setStatus('Selecciona un dispositivo para transmitir...');
        await remote.prompt();
        isCasting.current = true;
      } catch (e) {
        // El usuario canceló la selección de dispositivo
        isCasting.current = false;
        onClose();
        return;
      }
      
      // Bucle de dibujo en el canvas
      let currentIndex = 0;
      const drawLoop = async () => {
        while (isCasting.current) {
          const img = loadedImages[currentIndex];
          
          // Limpiar canvas y dibujar fondo negro (para letterboxing)
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          // Calcular aspect ratio para centrar la imagen
          const canvasAspect = CANVAS_WIDTH / CANVAS_HEIGHT;
          const imgAspect = img.width / img.height;
          let drawWidth, drawHeight, offsetX, offsetY;

          if (imgAspect > canvasAspect) {
            drawWidth = CANVAS_WIDTH;
            drawHeight = drawWidth / imgAspect;
            offsetX = 0;
            offsetY = (CANVAS_HEIGHT - drawHeight) / 2;
          } else {
            drawHeight = CANVAS_HEIGHT;
            drawWidth = drawHeight * imgAspect;
            offsetY = 0;
            offsetX = (CANVAS_WIDTH - drawWidth) / 2;
          }
          
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

          await new Promise(resolve => setTimeout(resolve, SLIDE_DURATION));
          currentIndex = (currentIndex + 1) % loadedImages.length;
        }
      };

      drawLoop();
    };

    startCasting();

    return () => {
      isCasting.current = false;
      const video = videoRef.current;
      if (video && (video as any).remote && (video as any).remote.state === 'connected') {
          (video as any).remote.disconnect();
      }
    };
  }, [photos, onClose]);

  return (
    <div className="fixed inset-0 z-[90] bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center text-white p-4 animate-fade-in">
      <Loader className="w-12 h-12 animate-spin-slow mb-6" />
      <h3 className="text-2xl font-cinzel mb-4 text-center">{status}</h3>
      <p className="text-slate-300 font-serif mb-8 text-center max-w-sm">
        Si no aparece el selector de dispositivos, asegúrate de estar en la misma red Wi-Fi que tu Chromecast o Smart TV.
      </p>
      <button
        onClick={onClose}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-white/20 transition-colors"
      >
        <XCircle className="w-5 h-5" />
        Cancelar
      </button>

      {/* Elementos ocultos para la magia de la transmisión */}
      <div style={{ display: 'none' }}>
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
        <video ref={videoRef} muted playsInline />
      </div>
    </div>
  );
};

export default VideoCaster;