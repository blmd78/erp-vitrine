# Site Vitrine ERP - Monopage

Site vitrine moderne **monopage** construit avec Next.js, TypeScript, Tailwind CSS et support multilingue (i18n).

## Technologies utilisées

- **Next.js 16** - Framework React pour la production
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utilitaire
- **next-intl** - Internationalisation (i18n)
- **Yarn 4** - Gestionnaire de packages (mode node-modules)

## Langues supportées

- 🇫🇷 Français (par défaut)
- 🇬🇧 English

## Sections du site

Le site est structuré en 4 sections principales sur une seule page:

1. **Hero** - Section d'accueil avec titre et CTA
2. **À Propos** - Présentation de l'entreprise et valeurs
3. **Services** - Liste des services ERP proposés
4. **Contact** - Formulaire de contact et informations

## Prérequis

- Node.js 20.9.0 ou supérieur
- Yarn (activé via corepack)

## Installation

```bash
# Activer corepack (si pas déjà fait)
corepack enable

# Installer les dépendances
yarn install
```

## Développement

```bash
# Démarrer le serveur de développement
yarn dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `yarn dev` - Démarre le serveur de développement
- `yarn build` - Compile l'application pour la production
- `yarn start` - Démarre le serveur de production
- `yarn lint` - Lance le linter ESLint

## Structure du projet

```
.
├── app/
│   ├── [locale]/          # Pages avec support i18n
│   │   ├── layout.tsx     # Layout pour chaque locale
│   │   ├── page.tsx       # Page principale (monopage)
│   │   └── globals.css    # Styles globaux avec Tailwind
│   └── layout.tsx         # Layout racine
├── components/            # Composants réutilisables
│   ├── Navigation.tsx     # Barre de navigation
│   ├── Hero.tsx          # Section Hero
│   ├── About.tsx         # Section À propos
│   ├── Services.tsx      # Section Services
│   ├── Contact.tsx       # Section Contact avec formulaire
│   └── LanguageSwitcher.tsx  # Sélecteur de langue
├── i18n/                 # Configuration i18n
│   ├── config.ts
│   └── request.ts
├── messages/             # Fichiers de traduction
│   ├── fr.json          # Traductions françaises
│   └── en.json          # Traductions anglaises
└── middleware.ts        # Middleware Next.js pour i18n
```

## Internationalisation (i18n)

Le projet utilise `next-intl` pour gérer les traductions. Les fichiers de traduction se trouvent dans le dossier `messages/`.

### Ajouter une nouvelle langue

1. Créer un fichier de traduction dans `messages/` (ex: `messages/es.json`)
2. Ajouter la locale dans `i18n/config.ts`
3. Les URLs seront automatiquement générées (ex: `/es`)

### Utiliser les traductions

```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Hero');

  return <h1>{t('title')}</h1>;
}
```

## Navigation

Le site utilise un défilement fluide entre les sections. La navigation se fait via:
- La barre de navigation fixe en haut
- Les boutons CTA dans les différentes sections

## Déploiement

Le projet peut être déployé sur Vercel, Netlify ou tout autre plateforme supportant Next.js.

### Vercel

```bash
# Installer Vercel CLI
yarn global add vercel

# Déployer
vercel
```

## Notes techniques

- Le projet utilise Yarn en mode `node-modules` pour la compatibilité avec Turbopack
- La navigation entre sections utilise `scrollIntoView` avec smooth behavior
- Le formulaire de contact est une démo (simulation d'envoi)

## Licence

MIT
