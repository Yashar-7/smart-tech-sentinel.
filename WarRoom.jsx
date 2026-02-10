// Dashboard Principal: THE SENTINEL WAR ROOM
// Mapa Mar del Plata (izq) + Feed de seguridad (der)
import React, { useState } from 'react';
import { SentinelVision } from './SentinelVision';

// OpenStreetMap: Mar del Plata. bbox = minLon,minLat,maxLon,maxLat
const MAR_DEL_PLATA_BBOX = '-57.65,-38.05,-57.42,-37.96';
const MAR_DEL_PLATA_MARKER = '-38.0055,-57.5426'; // lat,lon
const OSM_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${MAR_DEL_PLATA_BBOX}&layer=mapnik&marker=${MAR_DEL_PLATA_MARKER}`;

const WarRoom = () => {
  const [activeAlert, setActiveAlert] = useState(false);

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-4 overflow-hidden">
      <header className="border-b border-cyan-900 pb-2 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_10px_cyan]">
            <span className="text-xl">👁️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter">THE SENTINEL</h1>
            <p className="text-[10px] text-cyan-700">SMART TECH - MAR DEL PLATA SECURED</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs">PILOT: CENTINELA_01</p>
          <p className="text-[10px] animate-pulse text-red-500">SYSTEM ONLINE // ENCRYPTED</p>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4">
        {/* Izquierda: Mapa de Mar del Plata */}
        <div className="col-span-8 border border-cyan-900 bg-slate-950/50 h-[600px] relative overflow-hidden">
          <div className="absolute top-2 left-2 z-10 text-[10px] text-cyan-400 uppercase tracking-widest">
            Mapa táctico · Mar del Plata
          </div>
          <iframe
            src={OSM_EMBED_URL}
            title="Mapa Mar del Plata"
            className="absolute inset-0 w-full h-full border-0 opacity-90"
          />
          <div className="absolute inset-0 pointer-events-none border border-cyan-500/30" />
        </div>

        {/* Derecha: Feed de seguridad + Incident Feed */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="group">
            <p className="text-[10px] mb-1 text-cyan-300">NODE_01: FEED SEGURIDAD</p>
            <SentinelVision label="Live Feed: Almacén_01" />
          </div>

          <div className="flex-1 border border-cyan-900 bg-black p-3 text-[11px]">
            <p className="border-b border-cyan-900 mb-2 pb-1 text-cyan-300 uppercase">Incident Feed</p>
            <div className="space-y-2">
              <p className="text-green-500">[21:45] SYSTEM INITIALIZED</p>
              <p className="text-cyan-600">[21:46] CONNECTING TO CLOUD_SERVER_MDP...</p>
              <p className="text-green-500 text-xs">[21:47] FEED SECURITY ONLINE</p>
              <p className="text-yellow-500 text-xs animate-pulse">
                {">"} SCANNING...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarRoom;