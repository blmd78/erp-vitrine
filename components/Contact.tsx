'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Contact() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('title')}
        </h2>
        <p className="text-lg mb-16 text-center text-foreground/80 max-w-2xl mx-auto">
          {t('intro')}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="glass-effect p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-semibold mb-8 text-foreground">{t('info')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-medium text-foreground/70 mb-1">{t('email')}</h4>
                  <p className="text-lg text-foreground">contact@erp-vitrine.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-medium text-foreground/70 mb-1">{t('phone')}</h4>
                  <p className="text-lg text-foreground">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-medium text-foreground/70 mb-1">{t('address')}</h4>
                  <p className="text-lg text-foreground">123 Rue de l'ERP<br />75001 Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-3xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-foreground/80">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-foreground/80">
                  {t('email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-foreground/80">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all backdrop-blur-sm resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]"
              >
                {t('send')}
              </button>
              {submitted && (
                <div className="glass-effect p-4 rounded-xl border border-green-500/30 bg-green-500/10">
                  <p className="text-green-400 text-center font-medium flex items-center justify-center gap-2">
                    <span>✓</span> {t('success')}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
