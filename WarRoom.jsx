import React, { useState, useRef } from 'react';

// COMPONENTE DE APOYO (Para evitar errores de importación)
const SentinelVisionLocal = ({ label }) => (
  <div className="relative border border-cyan-500 bg-slate-900 aspect-video overflow-hidden">
    <iframe
      src="https://www.youtube.com/embed/36pY9v6m-48?autoplay=1&mute=1&controls=0"
      title="Tactical Feed"
      className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
    />
    <div className="absolute inset-0 pointer-events-none border border-green-500/30 grid grid-cols-6 grid-rows-4">
       {Array.from({ length: 24 }).map((_, i) => <div key={i} className="border-[0.5px] border-green-500/10" />)}
    </div>
    <div className="absolute top-1 left-1 flex items-center gap-1">
      <div className="h-1.5 w-1.5 bg-red-600 animate-pulse rounded-full" />
      <span className="text-[9px] text-cyan-400 font-mono">{label}</span>
    </div>
  </div>
);

const WarRoom = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef(null);

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
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-2">
      {/* HEADER TÁCTICO */}
      <header className="border-b border-cyan-900 mb-4 flex justify-between items-center p-2">
        <h1 className="text-xl font-bold tracking-widest text-white">THE SENTINEL <span className="text-cyan-500">V2.0</span></h1>
        <div className="text-[10px] text-right">
          <p className="text-green-500 animate-pulse">SYSTEM: ONLINE</p>
          <p>LOC: MAR DEL PLATA</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* MAPA (8 COLUMNAS) */}
        <div className="md:col-span-8 border border-cyan-900 h-[400px] md:h-[600px] relative bg-slate-950">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-57.65,-38.05,-57.42,-37.96&layer=mapnik"
            className="w-full h-full border-0 opacity-40 grayscale"
            title="Maps"
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        </div>

        {/* PANEL DE CONTROL (4 COLUMNAS) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          
          {/* FEED 01: YOUTUBE SCANNING */}
          <SentinelVisionLocal label="FEED_ALMACEN_01" />

          {/* FEED 02: CÁMARA DEL CELULAR */}
          <div className="border border-cyan-500 bg-black p-2 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
            <p className="text-[10px] mb-2 text-cyan-300 underline">MOBILE_UNIT_STREAM</p>
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center overflow-hidden">
              {isStreaming ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              ) : (
                <button 
                  onClick={startCamera}
                  className="border-2 border-cyan-500 px-6 py-3 text-xs hover:bg-cyan-500 hover:text-black transition-all font-bold"
                >
                  ACTIVAR SENTINEL VISION
                </button>
              )}
            </div>
          </div>

          {/* FEED DE DATOS */}
          <div className="border border-cyan-900 bg-black/50 p-2 h-40 overflow-y-auto text-[10px]">
             <p className="text-green-500">[OK] FIREBASE CONNECTED</p>
             <p className="text-cyan-600">[DB] CACHE PURGED</p>
             <p className="text-white animate-pulse">{">"} READY FOR DEPLOYMENT...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;