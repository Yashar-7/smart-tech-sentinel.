// Componente de Visión Táctica - Video de seguridad real + efecto Scanning (cuadros verdes)
import React, { useMemo } from 'react';

const VIDEO_ID = '36pY9v6m-48';

// Estilos para efecto scanning (cuadros verdes + línea de barrido)
const scanStyles = `
  @keyframes scan-cell {
    0%, 100% { border-color: rgba(34, 197, 94, 0.2); box-shadow: 0 0 4px rgba(34, 197, 94, 0.1); }
    50% { border-color: rgba(34, 197, 94, 0.95); box-shadow: 0 0 12px rgba(34, 197, 94, 0.6); background: rgba(34, 197, 94, 0.15); }
  }
  @keyframes scan-line {
    0% { top: 0; opacity: 0.9; }
    100% { top: 100%; opacity: 0.9; }
  }
  .animate-scan-cell { animation: scan-cell 1.2s ease-in-out infinite; }
  .animate-scan-line { animation: scan-line 2.5s linear infinite; }
`;
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&rel=0`;

// Cuadrícula de cuadros verdes para el efecto "Scanning..." (filas x columnas)
const GRID_ROWS = 8;
const GRID_COLS = 12;

export const SentinelVision = ({ label = 'Live Feed: Almacén_01' }) => {
  const cells = useMemo(
    () => Array.from({ length: GRID_ROWS * GRID_COLS }, (_, i) => i),
    []
  );

  return (
    <div className="relative border-2 border-cyan-500 bg-black p-1 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
      <style>{scanStyles}</style>
      {/* Label y estado */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
          {label}
        </span>
      </div>

      {/* Texto "Scanning..." */}
      <div className="absolute top-2 right-2 z-10 font-mono text-[10px] text-green-400 uppercase tracking-widest animate-pulse">
        Scanning...
      </div>

      {/* Contenedor video + overlay de cuadros verdes */}
      <div className="aspect-video w-full bg-slate-900 overflow-hidden relative">
        {/* Video de seguridad real (YouTube embed) */}
        <iframe
          src={EMBED_URL}
          title="Security feed"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Overlay: cuadrícula de cuadros verdes con efecto scanning */}
        <div
          className="absolute inset-0 pointer-events-none grid gap-px p-1"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          }}
        >
          {cells.map((i) => (
            <div
              key={i}
              className="border border-green-500/80 bg-green-500/0 rounded-sm animate-scan-cell"
              style={{
                animationDelay: `${(i % GRID_COLS) * 0.03 + Math.floor(i / GRID_COLS) * 0.12}s`,
                animationDuration: '0.4s',
                boxShadow: '0 0 6px rgba(34, 197, 94, 0.3)',
              }}
            />
          ))}
        </div>

        {/* Línea de barrido horizontal (refuerzo del efecto scanning) */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-green-400/90 pointer-events-none animate-scan-line"
          style={{ boxShadow: '0 0 12px 2px rgba(34, 197, 94, 0.8)' }}
        />
      </div>

      {/* Marco estético */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-cyan-500/20 m-4" />
    </div>
  );
};
