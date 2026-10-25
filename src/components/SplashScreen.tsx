import React, { useEffect, useState } from 'react';
import { UNIFOOD_LOGO_URL } from './UnifoodLogo';

interface SplashScreenProps {
  onFinish?: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  minDurationMs = 1400,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(15);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const taglines = [
    'Pesan Makanan Tanpa Antre di Hall D',
    'Pantau Antrean Dapur Real-Time',
    'Jastip Antar Makanan ke Ruang Kelas',
  ];

  useEffect(() => {
    // Smooth simulated progress sweep
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressTimer);
          return 100;
        }
        const step = Math.floor(Math.random() * 20) + 12;
        return Math.min(prev + step, 98);
      });
    }, 180);

    // Tagline micro-rotator
    const taglineTimer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 600);

    // Total duration before initiating smooth fade out
    const finishTimer = setTimeout(() => {
      setProgress(100);
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 500);
    }, minDurationMs);

    return () => {
      clearInterval(progressTimer);
      clearInterval(taglineTimer);
      clearTimeout(finishTimer);
    };
  }, [minDurationMs, onFinish, taglines.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => {
        // Allow tap-to-skip instantly
        setIsFadingOut(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 250);
      }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-stone-900 text-white px-6 py-10 sm:py-14 select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
        isFadingOut
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient appetizing background glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-500/15 blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-stone-900/90 to-stone-950 pointer-events-none"></div>

      {/* Top zone: University affiliation badge */}
      <div className="relative z-10 flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-stone-300 font-medium animate-in fade-in slide-in-from-top-4 duration-700">
        <span className="text-[11px] sm:text-xs tracking-wide">
          Institut Bisnis dan Informatika Kwik Kian Gie
        </span>
      </div>

      {/* Center zone: Animated Floating Brand Emblem & Titles */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center my-auto">
        {/* Logo container with double glowing aura */}
        <div className="relative group">
          {/* Ambient pulse halo */}
          <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-emerald-500/40 to-orange-500/30 blur-xl animate-pulse"></div>

          {/* Logo Frame - Steady & Elegant (No Bounce, Zero Ligature FOUT) */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-emerald-400/40 p-3 shadow-2xl flex items-center justify-center transition-transform">
            {!imgError ? (
              <img
                src={UNIFOOD_LOGO_URL}
                alt=""
                loading="eager"
                decoding="sync"
                className="w-full h-full object-contain filter drop-shadow-md"
                onError={() => setImgError(true)}
              />
            ) : (
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
            )}
          </div>

          {/* Verified campus chip */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
            Hall D · Kantin
          </div>
        </div>

        {/* Wordmark & Titles */}
        <div className="flex flex-col items-center gap-1.5 mt-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Uni<span className="text-emerald-400">food</span>
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30">
              Kantin Digital
            </span>
          </div>

          {/* Dynamic rotating feature tagline */}
          <p className="text-xs sm:text-sm text-stone-300 font-medium h-6 flex items-center justify-center transition-all duration-300">
            {taglines[taglineIndex]}
          </p>
        </div>

        {/* Sleek Progress Indicator Bar */}
        <div className="w-56 sm:w-64 flex flex-col gap-2 mt-3">
          <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden backdrop-blur-xs p-0.5">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-400 via-teal-300 to-amber-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
            <span>Memuat data stan...</span>
            <span className="font-bold text-emerald-400">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom zone: Micro-features pill & tap to skip hint */}
      <div className="relative z-10 flex flex-col items-center gap-2.5 text-center">
        <div className="flex items-center gap-2 text-[11px] text-stone-400 flex-wrap justify-center">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Bebas Antre
          </span>
          <span className="text-stone-600">·</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Antrean Dapur
          </span>
          <span className="text-stone-600">·</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
            Jastip Kelas
          </span>
        </div>

        <span className="text-[10px] text-stone-500 font-medium">
          Sentuh layar untuk langsung masuk
        </span>
      </div>
    </div>
  );
};
