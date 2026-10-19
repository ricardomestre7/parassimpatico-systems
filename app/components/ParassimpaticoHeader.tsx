'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ParassimpaticoHeaderProps {
  children?: React.ReactNode;
}

export default function ParassimpaticoHeader({ children }: ParassimpaticoHeaderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passKey, setPassKey] = useState('');
  const [message, setMessage] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('parassimpatico_therapist_auth');
      if (auth) setIsUnlocked(true);
    } catch {}

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passKey.trim().toUpperCase() === 'CYLINDER2026') {
      localStorage.setItem('parassimpatico_therapist_auth', JSON.stringify({
        unlocked: true,
        license: 'CYLINDER2026',
        date: new Date().toLocaleDateString('pt-PT')
      }));
      setIsUnlocked(true);
      setMessage('Acesso Clínico Parassimpático Desbloqueado!');
      setTimeout(() => setShowModal(false), 1200);
    } else {
      setMessage('Chave inválida. Utilize a chave autorizada.');
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert('Para instalar no seu computador ou telemóvel:\nNo Chrome/Edge: clique no ícone de instalar na barra de endereço ou em "Adicionar ao Ecrã Principal".');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#061318]/95 backdrop-blur-md border-b border-[#133E47] shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Marca Canónica */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-2xl bg-teal-500/15 border border-teal-500/40 flex items-center justify-center text-teal-300 text-xl font-bold shadow-inner"
              title="Parassimpático Systems Home"
            >
              🫀
            </Link>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold font-mono tracking-wider text-teal-300">
                  PARASSIMPÁTICO SYSTEMS
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5A7E87] hidden sm:inline">
                  ·
                </span>
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider font-semibold">
                  TEORIA POLIVAGAL & PSICOSSOMÁTICA
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  Sistema Canónico V · Soberano
                </span>
              </div>
              <p className="text-[11px] text-[#8EABB3]">
                Safe Creative #2610157331452 · Tecnologia Cylinder Margin
              </p>
            </div>
          </div>

          {/* Ações e Navegação Interna */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
            {children}

            <Link
              href="/minicurso"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-200 hover:bg-teal-500/25 text-xs font-semibold transition-all"
            >
              🎓 Minicurso Clínico
            </Link>

            <button
              onClick={handleInstallPWA}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 text-xs font-semibold transition-all"
              title="Instalar no Computador / Telemóvel"
            >
              📲 Instalar App
            </button>

            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isUnlocked
                  ? 'bg-teal-500/20 border border-teal-500/40 text-teal-300'
                  : 'bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-black hover:brightness-110 shadow-teal-500/20 font-extrabold'
              }`}
            >
              {isUnlocked ? '🔓 Desbloqueado' : '🔑 Chave Mestra'}
            </button>
          </div>
        </div>
      </header>

      {/* Modal Chave Mestra */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0A1E24] border border-teal-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🫀</span>
                <div>
                  <h3 className="text-base font-bold text-white">Desbloqueio Parassimpático Systems</h3>
                  <p className="text-xs text-[#8EABB3]">Acesso ilimitado à Teoria Polivagal e Decodificação Biológica</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#5A7E87] hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8EABB3] mb-1.5">
                  Chave Mestra Autorizada
                </label>
                <input
                  type="password"
                  placeholder="Insira CYLINDER2026"
                  value={passKey}
                  onChange={(e) => setPassKey(e.target.value)}
                  className="w-full bg-[#061318] border border-[#133E47] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#5A7E87] focus:outline-none focus:border-teal-400 font-mono tracking-widest text-center"
                />
              </div>

              {message && (
                <p className={`text-xs text-center font-medium ${isUnlocked ? 'text-teal-400' : 'text-rose-400'}`}>
                  {message}
                </p>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#061318] text-[#8EABB3] hover:text-white text-xs font-semibold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-black text-xs font-extrabold hover:brightness-110 shadow-lg shadow-teal-500/20 transition-all"
                >
                  Validar Chave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
