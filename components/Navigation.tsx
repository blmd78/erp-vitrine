'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    // { key: 'home', label: t('home') },
    // { key: 'about', label: t('about') },
    // { key: 'services', label: t('services') },
    // { key: 'contact', label: t('contact') },
  ];

  return (
    <nav className="fixed top-2 left-2 right-2 glass-effect backdrop-blur-lg z-50 border border-white/10 rounded-l">
      <div className="mx-auto px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ERP Solutions
        </div>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => scrollToSection(item.key)}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
