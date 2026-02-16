import React, { useMemo } from 'react';

export const SentinelVision = ({ label = 'Live Feed: Almacén_01' }) => {
  const cells = Array.from({ length: 96 }, (_, i) => i);
  const VIDEO_ID = '36pY9v6m-48';
  const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&rel=0`;

  return (
    <div className="relative border-2 border-cyan-500 bg-black p-1">
      <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
        <iframe
          src={EMBED_URL}
          title="Security feed"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
          allow="autoplay"
        />
        <div className="absolute inset-0 grid grid-cols-12 gap-px p-1 pointer-events-none">
          {cells.map((i) => (
            <div key={i} className="border border-green-500/20" />
          ))}
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
          <span className="text-[10px] text-cyan-400 uppercase">{label}</span>
        </div>
      </div>
    </div>
  );
};