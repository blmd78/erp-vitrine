'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('About');

  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('title')}
        </h2>

        <p className="text-lg mb-6 text-foreground/80 text-center max-w-3xl mx-auto">
          {t('intro')}
        </p>

        <p className="text-lg mb-16 text-foreground/80 text-center max-w-3xl mx-auto">
          {t('mission')}
        </p>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-10 text-center text-foreground">{t('values')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="glass-effect text-center p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/50">
                <div className="text-5xl mb-6">💡</div>
                <h4 className="font-semibold text-xl text-foreground">{t('value1')}</h4>
              </div>
            </div>
            <div className="relative group">
              <div className="glass-effect text-center p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/50">
                <div className="text-5xl mb-6">⭐</div>
                <h4 className="font-semibold text-xl text-foreground">{t('value2')}</h4>
              </div>
            </div>
            <div className="relative group">
              <div className="glass-effect text-center p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-primary/50">
                <div className="text-5xl mb-6">🤝</div>
                <h4 className="font-semibold text-xl text-foreground">{t('value3')}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
