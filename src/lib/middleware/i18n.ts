/**
 * I18n Initialization Middleware
 * Handles internationalization setup and context injection
 */

import { defineMiddleware } from 'astro:middleware'

import { initializeI18n } from '../i18n/astro'
import { middlewareLogger } from '../logging'

/**
 * Middleware for initializing the i18n system
 */
export const i18nMiddleware = defineMiddleware(async (context, next) => {
	const url = new URL(context.request.url)
	const path = url.pathname

	// Initialize new i18n system
	try {
		const { locale, t } = initializeI18n(context.request)

		// Store i18n context in locals for components to access
		context.locals.locale = locale
		context.locals.t = t
	} catch (error) {
		middlewareLogger.error('I18n initialization failed', {
			scope: 'i18n-init-error',
			details: {
				error,
				path,
			},
		})
		// Fallback to default locale
		context.locals.locale = 'en'
		context.locals.t = (key: string): string => key
	}

	return next()
})
