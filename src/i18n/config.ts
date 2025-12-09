import type { Locale } from '@/types/i18n'

const LANGS = {
	en: 'en',
	fr: 'fr',
} as const

export const SUPPORTED_LOCALES: readonly Locale[] = [LANGS.en, LANGS.fr]
export const DEFAULT_LOCALE = LANGS.fr

export const languages = [
	{ code: LANGS.en, name: 'English', flag: '🇺🇸' },
	{ code: LANGS.fr, name: 'Français', flag: '🇫🇷' },
] as const

/**
 * Type guard to check if a string is a valid Locale
 * Single source of truth for locale validation
 */
export const isValidLocale = (locale: string | null): locale is Locale => {
	return locale !== null && SUPPORTED_LOCALES.includes(locale as Locale)
}
