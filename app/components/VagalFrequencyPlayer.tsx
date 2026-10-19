'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FreqOption {
  label: string;
  hz: number;
  effect: string;
}

const FREQS: FreqOption[] = [
  { label: '0.1 Hz / Coerência Vagal', hz: 10, effect: 'Estimulação Vagal Ventral & HRV' },
  { label: '432 Hz / Homeostase', hz: 432, effect: 'Estabilização Somática e Serenidade' },
  { label: '528 Hz / Transformação', hz: 528, effect: 'Regeneração Celular e Tecidual' },
  { label: '639 Hz / Conexão Emocional', hz: 639, effect: 'Pacificação do Eixo Cardíaco-Social' },
  { label: '741 Hz / Expressão & Cura', hz: 741, effect: 'Desintoxicação Celular e Clareza' },
  { label: '852 Hz / Intuição Vagal', hz: 852, effect: 'Equilíbrio Neurovegetativo Superior' },
];

export default function VagalFrequencyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState<FreqOption>(FREQS[1]);
  const [volume, setVolume] = useState<number>(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {}
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudio = (freqHz: number) => {
    stopAudio();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqHz, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio playback error:', e);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(selectedFreq.hz);
    }
  };

  const handleSelectFreq = (f: FreqOption) => {
    setSelectedFreq(f);
    if (isPlaying) {
      startAudio(f.hz);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(v, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="bg-[#0A1E24] border border-[#14B8A6]/40 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl select-none">🎵</span>
          <div>
            <h4 className="text-sm font-bold text-teal-200 tracking-wide">
              Gerador de Frequência Vagal & Solfeggio
            </h4>
            <p className="text-[11px] text-[#8EABB3]">
              Oscilador senoidal clínico em tempo real via Web Audio API (Sem arquivos externos)
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
            isPlaying
              ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
              : 'bg-teal-500 hover:bg-teal-400 text-black font-extrabold'
          }`}
        >
          {isPlaying ? '⏹ Parar Frequência' : '▶ Tocar Frequência Vagal'}
        </button>
      </div>

      {/* Seletor de Frequências */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {FREQS.map((f) => {
          const isSelected = selectedFreq.hz === f.hz;
          return (
            <button
              key={f.hz}
              onClick={() => handleSelectFreq(f)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-teal-500/25 border-teal-400 text-white shadow-md'
                  : 'bg-[#061318] border-[#133E47] text-[#8EABB3] hover:text-white hover:border-teal-500/40'
              }`}
            >
              <div className="text-xs font-mono font-bold text-teal-300">{f.hz} Hz</div>
              <div className="text-[10px] truncate text-white/90">{f.label.split('/')[1] || f.label}</div>
            </button>
          );
        })}
      </div>

      {/* Detalhe da Frequência Ativa e Controle de Volume */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#133E47]">
        <div className="text-xs text-[#8EABB3]">
          <span className="text-teal-400 font-mono font-semibold">{selectedFreq.hz} Hz</span>: {selectedFreq.effect}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[11px] text-[#8EABB3] font-mono">Volume:</span>
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-teal-400 cursor-pointer"
          />
          <span className="text-[10px] font-mono text-teal-300 w-8">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
