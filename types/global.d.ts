import type { TFunction } from './i18n'
import type { Locale } from '@/i18n/config'
import type { Theme } from '../src/lib/client/theme-manager'

declare global {
	interface Window {
		// Locale management
		currentLanguage: Locale
		currentLocale: Locale
		changeLanguage: (locale: Locale) => Promise<void>
		initLanguage: () => void

		// Theme management
		currentTheme: Theme
		initialTheme: Theme
		getCurrentTheme: () => Theme
		setTheme: (theme: Theme) => void
		toggleTheme: () => void
		initTheme: () => void
	}

	// Astro App namespace extension for middleware
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace App {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface Locals {
			locale: Locale
			t: TFunction
			theme: 'light' | 'dark'
			errorRewrite?: {
				originalPath: string
				targetPath: string
				status: number
			}
		}
	}
}
