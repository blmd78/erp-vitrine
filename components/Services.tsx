'use client';

import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      icon: '💰',
      title: t('service1Title'),
      description: t('service1Description'),
    },
    {
      icon: '👥',
      title: t('service2Title'),
      description: t('service2Description'),
    },
    {
      icon: '📦',
      title: t('service3Title'),
      description: t('service3Description'),
    },
  ];

  return (
    <section id="services" className="min-h-screen flex items-center justify-center py-20 px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="glass-effect p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 h-full backdrop-blur-xl">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{service.description}</p>
              </div>
              {/* Gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-secondary/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
