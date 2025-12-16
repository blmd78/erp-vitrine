# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Quick Reference

**Type de projet:** Site vitrine monopage ERP
**Stack:** Next.js 16 + TypeScript + Tailwind CSS v3 + next-intl
**Gestionnaire de packages:** Yarn 4.10.3 (via Corepack)
**Node version:** 20.9.0+

## 🚀 Démarrage rapide

```bash
# Activer Node 20 et Corepack
source ~/.nvm/nvm.sh
nvm use 20
corepack enable

# Installer les dépendances
yarn install

# Lancer le serveur de développement
yarn dev
```

Le site sera accessible sur http://localhost:3000

## 📁 Architecture du projet

```
├── app/
│   ├── [locale]/          # Pages avec routing i18n
│   │   ├── layout.tsx     # Layout par locale (FR/EN)
│   │   ├── page.tsx       # Page monopage principale
│   │   └── globals.css    # Styles globaux Tailwind
│   └── layout.tsx         # Layout racine
├── components/            # Composants React
│   ├── Navigation.tsx     # Barre de navigation fixe
│   ├── Hero.tsx          # Section Hero
│   ├── About.tsx         # Section À propos
│   ├── Services.tsx      # Section Services
│   ├── Contact.tsx       # Section Contact + Formulaire
│   └── LanguageSwitcher.tsx  # Switch FR/EN
├── i18n/                 # Configuration i18n
│   ├── config.ts         # Locales supportées (fr, en)
│   └── request.ts        # Config next-intl
├── messages/             # Traductions JSON
│   ├── fr.json          # Français
│   └── en.json          # Anglais
└── middleware.ts        # Middleware i18n Next.js
```

## 🎨 Styling

**Tailwind CSS v3.4.1**
- Configuration: `tailwind.config.ts`
- PostCSS: `postcss.config.mjs`
- Classes utilitaires disponibles dans tous les composants
- Variables CSS personnalisées dans `globals.css`

**Variables principales:**
```css
--background: #ffffff (light) / #0a0a0a (dark)
--foreground: #171717 (light) / #ededed (dark)
```

## 🌍 Internationalisation (i18n)

**next-intl configuré pour:**
- Français (fr) - langue par défaut
- Anglais (en)

**Utilisation dans les composants:**
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('SectionName');
  return <h1>{t('key')}</h1>;
}
```

**Ajouter une traduction:**
1. Ajouter la clé dans `messages/fr.json` et `messages/en.json`
2. Utiliser `t('key')` dans le composant
3. Les URLs sont automatiques: `/` (fr) et `/en`

## 🧩 Sections du site monopage

1. **Hero** - Section d'accueil avec CTA
2. **About** - Présentation + 3 valeurs (Innovation, Qualité, Satisfaction)
3. **Services** - 3 services ERP (Finance, RH, Supply Chain)
4. **Contact** - Formulaire + Informations de contact

**Navigation:** Défilement fluide via `scrollIntoView({ behavior: 'smooth' })`

## 🛠️ Commandes importantes

```bash
# Développement
yarn dev              # Serveur de dev sur port 3000

# Build
yarn build           # Compilation production
yarn start           # Serveur production

# Utilitaires
yarn lint            # ESLint

# Résoudre les conflits de port
lsof -ti:3000 | xargs kill -9
```

## ⚙️ Configuration spécifique

**Yarn 4 avec node-modules**
- Mode: `nodeLinker: node-modules` (dans `.yarnrc.yml`)
- Raison: Compatibilité Turbopack Next.js 16

**Next.js + next-intl**
- Plugin configuré dans `next.config.ts`
- Middleware pour routing i18n dans `middleware.ts`
- Deprecated warning sur "middleware" → ignorer ou migrer vers "proxy"

## 🐛 Problèmes courants

**Port 3000 déjà utilisé:**
```bash
lsof -ti:3000 | xargs kill -9
rm -f .next/dev/lock
yarn dev
```

**Erreur Corepack:**
```bash
corepack enable
corepack prepare yarn@4.10.3 --activate
```

**Cache Next.js corrompu:**
```bash
rm -rf .next
yarn dev
```

**Tailwind ne s'applique pas:**
- Vérifier que `globals.css` contient `@tailwind base/components/utilities`
- Vérifier import dans `app/[locale]/layout.tsx`
- Relancer le serveur

## 📝 Bonnes pratiques

1. **Composants:** Toujours marquer avec `'use client'` si utilisation de hooks
2. **Traductions:** Ne jamais hardcoder du texte, toujours utiliser `t()`
3. **Styles:** Préférer les classes Tailwind aux styles inline
4. **Types:** TypeScript strict activé, toujours typer les props
5. **Git:** Avant commit, vérifier que `yarn build` passe

## 🔄 Workflow de développement

1. Créer une branche pour la fonctionnalité
2. Modifier les fichiers nécessaires
3. Tester en local avec `yarn dev`
4. Vérifier le build avec `yarn build`
5. Commit et push

## 🌐 Déploiement

**Vercel (recommandé):**
```bash
yarn global add vercel
vercel
```

**Variables d'environnement:** Aucune pour l'instant

## 📚 Documentation

- [Next.js 16](https://nextjs.org/docs)
- [Tailwind CSS v3](https://tailwindcss.com/docs)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Yarn 4](https://yarnpkg.com/)

