import React, { useState } from 'react';
import unifoodLogoImg from '../assets/images/kantinku_logo_crop_1x1.png';

interface UnifoodLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleText?: string;
  badgeText?: string;
  className?: string;
}

export const UNIFOOD_LOGO_URL = unifoodLogoImg;

export const UnifoodLogo: React.FC<UnifoodLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  subtitleText = 'Platform Kantin & Jastip Kampus',
  badgeText,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: {
      img: 'w-8 h-8 sm:w-9 sm:h-9 aspect-square',
      title: 'text-base',
      sub: 'text-[10px]',
      badge: 'text-[9px] px-1 py-0.2',
    },
    md: {
      img: 'w-10 h-10 sm:w-11 sm:h-11 aspect-square',
      title: 'text-lg',
      sub: 'text-xs',
      badge: 'text-[10px] px-1.5 py-0.5',
    },
    lg: {
      img: 'w-12 h-12 sm:w-14 sm:h-14 aspect-square',
      title: 'text-xl',
      sub: 'text-xs',
      badge: 'text-[11px] px-2 py-0.5',
    },
    xl: {
      img: 'w-16 h-16 sm:w-20 sm:h-20 aspect-square',
      title: 'text-2xl',
      sub: 'text-sm',
      badge: 'text-xs px-2.5 py-1',
    },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* 1:1 User-Selected Logo Mark */}
      <div
        className={`${sizeClasses.img} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
      >
        {!imgError ? (
          <img
            src={UNIFOOD_LOGO_URL}
            alt=""
            loading="eager"
            decoding="sync"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-emerald-600 text-white rounded-xl flex items-center justify-center p-1.5">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="2" x2="6" y2="4" />
              <line x1="10" y1="2" x2="10" y2="4" />
              <line x1="14" y1="2" x2="14" y2="4" />
            </svg>
          </div>
        )}
      </div>

      {/* Typography */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`${sizeClasses.title} font-black text-slate-900 tracking-tight whitespace-nowrap leading-none`}
          >
            Unifood
          </span>
          {badgeText && (
            <span
              className={`${sizeClasses.badge} font-bold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 leading-none inline-flex items-center justify-center shrink-0`}
            >
              {badgeText}
            </span>
          )}
        </div>
        {showSubtitle && (
          <span className={`${sizeClasses.sub} text-slate-500 font-medium tracking-wide mt-1 truncate`}>
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );
};
