'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs - n8n style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent leading-tight">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-foreground/80 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
        <button
          onClick={() => scrollToSection('services')}
          className="group px-10 py-5 bg-primary text-white rounded-2xl text-lg font-semibold hover:bg-primary-hover transition-all duration-300 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
        >
          <span className="flex items-center gap-2">
            {t('cta')}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
