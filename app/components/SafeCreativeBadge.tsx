'use client';

import React from 'react';

export default function SafeCreativeBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-mono">
      <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
      <span>Safe Creative #2610157331452 · Sistema Canónico V</span>
    </div>
  );
}
