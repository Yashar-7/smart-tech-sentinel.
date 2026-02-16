import React, { useState, useRef } from 'react';
import { SentinelVision } from './SentinelVision';

const MAR_DEL_PLATA_BBOX = '-57.65,-38.05,-57.42,-37.96';
const MAR_DEL_PLATA_MARKER = '-38.0055,-57.5426';

const WarRoom = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);

  // Función para activar la Cámara Trasera (Nivel Pro)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" }, // <--- FORZA CÁMARA TRASERA
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Error al acceder a la cámara: ", err);
      alert("No se pudo activar la cámara trasera");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
    setIsStreaming(false);
  };

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-4 overflow-hidden relative">
      
      {/* BOTÓN CERRAR SESIÓN (Arreglado) */}
      <button 
        onClick={() => alert("Cerrando sistema...")}
        className="absolute top-4 right-4 z-50 border border-red-500 text-red-500 px-3 py-1 text-[10px] hover:bg-red-500/20 transition-all"
      >
        TERMINAR SESIÓN [X]
      </button>

      <header className="border-b border-cyan-900 pb-2 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_10px_cyan] animate-pulse">
            <span className="text-xl">👁️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">THE SENTINEL</h1>
            <p className="text-[10px] text-cyan-700">SMART TECH - WAR ROOM MDP</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {/* IZQUIERDA: MAPA */}
        <div className="col-span-8 border border-cyan-900 bg-slate-950/50 h-[600px] relative">
          <div className="absolute top-2 left-2 z-10 flex gap-2">
             <span className="bg-black/80 px-2 py-1 text-[10px] text-cyan-400 border border-cyan-900">MAPA TÁCTICO</span>
             <button className="bg-cyan-900/50 px-2 py-1 text-[10px] hover:bg-cyan-500 hover:text-black">MODO LIBRE</button>
          </div>
          
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAR_DEL_PLATA_BBOX}&layer=mapnik&marker=${MAR_DEL_PLATA_MARKER}`}
            title="Mapa Mar del Plata"
            className="absolute inset-0 w-full h-full border-0 opacity-80"
          />
          
          {/* EFECTO SCANNER (Ojo de Sentinel) */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
        </div>

        {/* DERECHA: FEED Y CÁMARA */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="border border-cyan-900 bg-black relative">
            <p className="text-[10px] p-1 text-cyan-300 bg-cyan-900/20">LIVE_FEED: UNIDAD_01</p>
            
            {/* CONTENEDOR DE VIDEO REAL */}
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
               {isStreaming ? (
                 <video 
                   ref={videoRef} 
                   autoPlay 
                   playsInline 
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <div className="text-center">
                   <p className="text-[10px] mb-2 text-cyan-800">CÁMARA TRASERA OFFLINE</p>
                   <button 
                     onClick={startCamera}
                     className="border border-cyan-500 px-4 py-2 text-xs hover:bg-cyan-500 hover:text-black transition-all"
                   >
                     ACTIVAR SENTINEL VISION
                   </button>
                 </div>
               )}
               <div className="absolute top-2 right-2 flex gap-1">
                  <div className="h-2 w-2 bg-red-600 rounded-full animate-ping" />
                  <span className="text-[8px] text-red-500">REC</span>
               </div>
            </div>
            {isStreaming && (
              <button 
                onClick={stopCamera}
                className="w-full bg-red-900/20 text-red-500 text-[10px] py-1 border-t border-red-900"
              >
                DETENER TRANSMISIÓN
              </button>
            )}
          </div>

          <div className="flex-1 border border-cyan-900 bg-black p-3 text-[11px] overflow-y-auto max-h-[300px]">
            <p className="border-b border-cyan-900 mb-2 pb-1 text-cyan-300 uppercase">Incident Feed</p>
            <div className="space-y-1">
              <p className="text-green-500">[OK] FIREBASE CONNECTED</p>
              <p className="text-cyan-600">[INFO] RENDERIZANDO NODOS...</p>
              {isStreaming && <p className="text-yellow-500 animate-pulse">[!] STREAMING ACTIVADO - CÁMARA TRASERA</p>}
              <p className="text-cyan-800 italic">{">"} Esperando datos GPS...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WarRoom;
