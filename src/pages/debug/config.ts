import { getConfig } from '@nextnode/config-manager'
import type { APIRoute } from 'astro'

import { configLogger } from '../../lib/logging'

export const GET: APIRoute = async () => {
	try {
		const environment = process.env.NODE_ENV || 'NOT_SET'
		const appConfig = getConfig('app')
		const emailConfig = getConfig('email')

		const debugInfo = {
			timestamp: new Date().toISOString(),
			environment: {
				NODE_ENV: environment,
			},
			config: {
				app: appConfig,
				email: {
					// Only show non-sensitive config
					provider: emailConfig?.provider,
					from: emailConfig?.from,
				},
			},
		}

		return new Response(JSON.stringify(debugInfo, null, 2), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		})
	} catch (error) {
		configLogger.error('Config debug endpoint error', {
			scope: 'debug-config-error',
			details: {
				error,
				message:
					error instanceof Error ? error.message : 'Unknown error',
				type:
					error instanceof Error
						? error.constructor.name
						: 'UnknownError',
			},
		})

		const errorInfo = {
			timestamp: new Date().toISOString(),
			error: {
				message:
					error instanceof Error ? error.message : 'Unknown error',
				type:
					error instanceof Error
						? error.constructor.name
						: 'UnknownError',
			},
			environment: {
				NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
			},
		}

		return new Response(JSON.stringify(errorInfo, null, 2), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
			},
		})
	}
}
