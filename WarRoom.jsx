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
        video: { facingMode: "environment" }, 
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
      
      {/* BOTÓN CERRAR SESIÓN */}
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
            <h1 className="text-2xl font-bold tracking-tighter">THE SENTINEL V2</h1>
            <p className="text-[10px] text-cyan-700">SMART TECH - WAR ROOM MDP</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {/* IZQUIERDA: MAPA TÁCTICO */}
        <div className="col-span-8 border border-cyan-900 bg-slate-950/50 h-[600px] relative">
          <div className="absolute top-2 left-2 z-10 flex gap-2">
             <span className="bg-black/80 px-2 py-1 text-[10px] text-cyan-400 border border-cyan-900 uppercase">Mapa Táctico</span>
             <button className="bg-cyan-900/50 px-2 py-1 text-[10px] hover:bg-cyan-500 hover:text-black">MODO LIBRE</button>
          </div>
          
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAR_DEL_PLATA_BBOX}&layer=mapnik&marker=${MAR_DEL_PLATA_MARKER}`}
            title="Mapa Mar del Plata"
            className="absolute inset-0 w-full h-full border-0 opacity-80"
          />
          
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.5)_100%)]" />
        </div>

        {/* DERECHA: SENTINEL VISION + CÁMARA */}
        <div className="col-span-4 flex flex-col gap-4">
          
          {/* AQUÍ CONECTAMOS EL COMPONENTE QUE ESTABA OSCURO */}
          <div className="group">
            <SentinelVision label="Live Feed: Almacén_01" />
          </div>

          {/* CÁMARA DEL DISPOSITIVO (CELULAR) */}
          <div className="border border-cyan-900 bg-black relative">
            <p className="text-[10px] p-1 text-cyan-300 bg-cyan-900/20 uppercase tracking-widest">Cámara de Unidad (Móvil)</p>
            
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
               {isStreaming ? (
                 <video 
                   ref={videoRef} 
                   autoPlay 
                   playsInline 
                   className="w-full h-full object-cover"
                 />
               ) : (
                 <div className="text-center p-4">
                   <p className="text-[10px] mb-3 text-cyan-800 uppercase">Link de cámara offline</p>
                   <button 
                     onClick={startCamera}
                     className="border border-cyan-500 px-4 py-2 text-[10px] hover:bg-cyan-500 hover:text-black transition-all shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                   >
                     ACTIVAR CAM_TRASERA
                   </button>
                 </div>
               )}
               <div className="absolute top-2 right-2 flex gap-1">
                  <div className={`h-2 w-2 rounded-full ${isStreaming ? 'bg-red-600 animate-ping' : 'bg-slate-700'}`} />
                  <span className="text-[8px] text-red-500">{isStreaming ? 'LIVE' : 'OFF'}</span>
               </div>
            </div>
            {isStreaming && (
              <button 
                onClick={stopCamera}
                className="w-full bg-red-900/20 text-red-500 text-[10px] py-1 border-t border-red-900 hover:bg-red-900/40"
              >
                CORTAR TRANSMISIÓN
              </button>
            )}
          </div>

          {/* INCIDENT FEED */}
          <div className="flex-1 border border-cyan-900 bg-black p-3 text-[11px] overflow-y-auto max-h-[200px]">
            <p className="border-b border-cyan-900 mb-2 pb-1 text-cyan-300 uppercase tracking-tighter">Incident Feed</p>
            <div className="space-y-1">
              <p className="text-green-500">[OK] FIREBASE STATUS: SECURE</p>
              <p className="text-cyan-600">[INFO] SENTINEL V2 INITIALIZED</p>
              {isStreaming && <p className="text-yellow-500 animate-pulse">[!] ALERTA: STREAMING MÓVIL ACTIVO</p>}
              <p className="text-cyan-800 italic">{">"} Esperando datos de Mar del Plata...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;