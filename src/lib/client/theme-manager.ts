/**
 * Theme management utilities for client-side theme switching
 * Handles dark/light mode toggle, persistence via cookies
 */

import { createLogger } from '@nextnode/logger'

import { COOKIE_NAMES } from '@/lib/constants'
import { getCookie, setCookie } from '@/lib/cookies'

export type Theme = 'light' | 'dark' | 'system'

const themeLogger = createLogger({ prefix: 'theme' })

/**
 * Get the current theme preference from cookie
 */
const getThemeFromCookie = async (): Promise<Theme | null> => {
	try {
		const cookieTheme = await getCookie(COOKIE_NAMES.THEME)
		if (cookieTheme && ['light', 'dark', 'system'].includes(cookieTheme)) {
			return cookieTheme as Theme
		}
	} catch (error) {
		themeLogger.warn('Failed to read theme from cookie', {
			details: { error },
		})
	}
	return null
}

/**
 * Get the current theme preference (synchronous)
 * Uses window.initialTheme or window.currentTheme as cache
 */
export const getCurrentTheme = (): Theme => {
	// Try cached theme from global state
	if (
		window.currentTheme &&
		['light', 'dark'].includes(window.currentTheme)
	) {
		return window.currentTheme
	}

	// Fallback: check if window has initialTheme from SSR
	if (window.initialTheme) {
		return window.initialTheme
	}

	// Final fallback: check system preference
	const systemPrefersDark = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches
	return systemPrefersDark ? 'dark' : 'light'
}

/**
 * Update all theme toggle icons in the document
 */
const updateThemeIcons = (theme: Theme): void => {
	const sunIcons = document.querySelectorAll('[id^="sun-icon"]')
	const moonIcons = document.querySelectorAll('[id^="moon-icon"]')

	sunIcons.forEach(sunIcon => {
		if (theme === 'dark') {
			sunIcon.classList.add('hidden')
		} else {
			sunIcon.classList.remove('hidden')
		}
	})

	moonIcons.forEach(moonIcon => {
		if (theme === 'dark') {
			moonIcon.classList.remove('hidden')
		} else {
			moonIcon.classList.add('hidden')
		}
	})
}

/**
 * Apply theme to the document and update UI elements
 */
export const applyTheme = (theme: Theme): void => {
	// Update document class
	if (theme === 'dark') {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}

	// Update theme toggle icons across all components
	updateThemeIcons(theme)

	// Store globally for other components
	window.currentTheme = theme
}

/**
 * Set a specific theme
 */
export const setTheme = async (theme: Theme): Promise<void> => {
	// Save to cookie and wait for completion
	await setCookie(COOKIE_NAMES.THEME, theme, {
		path: '/',
		maxAge: 365 * 24 * 60 * 60, // 1 year
		sameSite: 'lax',
	})

	// Apply theme (also updates window.currentTheme)
	applyTheme(theme)

	// Dispatch custom event for React components
	window.dispatchEvent(
		new CustomEvent('theme-changed', {
			detail: { theme },
		}),
	)
}

/**
 * Toggle between light and dark themes
 */
export const toggleTheme = async (): Promise<void> => {
	const currentTheme = getCurrentTheme()
	const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light'
	await setTheme(newTheme)
}

/**
 * Initialize theme system: apply initial theme and set up event listeners
 */
export const initTheme = (): void => {
	// Apply initial theme
	applyTheme(getCurrentTheme())

	// Listen for system theme changes
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
	mediaQuery.addEventListener('change', async e => {
		// Only apply system theme if user hasn't set a preference or chose 'system'
		const savedTheme = await getThemeFromCookie()
		if (!savedTheme || savedTheme === 'system') {
			applyTheme(e.matches ? 'dark' : 'light')
		}
	})

	// Set up theme toggle buttons
	const themeToggleButtons = document.querySelectorAll('[id^="theme-toggle"]')
	themeToggleButtons.forEach(button => {
		button.addEventListener('click', async () => await toggleTheme())
	})
}

// Make functions available globally
window.getCurrentTheme = getCurrentTheme
window.setTheme = setTheme
window.toggleTheme = toggleTheme
window.initTheme = initTheme

// Global types are declared in types/global.d.ts
