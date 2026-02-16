import React, { useState, useRef } from 'react';

// COMPONENTE INTEGRADO (Sin imports externos para evitar fallos)
const SentinelVision = ({ label = 'Live Feed: Almacén_01' }) => {
  const VIDEO_ID = '36pY9v6m-48';
  return (
    <div className="border-2 border-cyan-500 bg-black p-1 relative">
      <div className="aspect-video bg-slate-900 relative overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&controls=0`}
          title="Security feed"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
          allow="autoplay"
        />
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 pointer-events-none">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="border border-green-500/10" />
          ))}
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
          <span className="text-[10px] text-cyan-400 font-mono">{label}</span>
        </div>
      </div>
    </div>
  );
};

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
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-4">
      <header className="border-b border-cyan-900 pb-2 mb-4">
        <h1 className="text-2xl font-bold text-white tracking-widest">SENTINEL <span className="text-cyan-500">V4.0</span></h1>
        <p className="text-[10px] text-green-500 animate-pulse">ESTADO: TRANSMITIENDO DESDE MDP</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* MAPA */}
        <div className="lg:col-span-8 border border-cyan-900 h-[400px] lg:h-[600px] relative bg-slate-950">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-57.65,-38.05,-57.42,-37.96&layer=mapnik"
            className="w-full h-full border-0 opacity-40 grayscale"
            title="Maps"
          />
        </div>

        {/* CONTROLES */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <SentinelVision label="TACTICAL_FEED_01" />

          <div className="border border-cyan-900 bg-black p-2">
            <p className="text-[10px] text-cyan-600 mb-2 underline">CÁMARA MÓVIL SMART TECH</p>
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative overflow-hidden">
              {isStreaming ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              ) : (
                <button 
                  onClick={startCamera}
                  className="bg-cyan-900/20 border-2 border-cyan-500 px-6 py-3 text-xs hover:bg-cyan-500 hover:text-black font-bold shadow-[0_0_15px_cyan]"
                >
                  ACTIVAR CÁMARA TRASERA
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;