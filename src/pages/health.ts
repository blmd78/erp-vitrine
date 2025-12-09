/**
 * Health check endpoint
 * Provides application health status and basic metrics
 */

import type { APIRoute } from 'astro'

import { getHealthStatus } from '../lib/core/metrics'
import { metricsLogger } from '../lib/logging'

export const GET: APIRoute = async ({ request: _request }) => {
	try {
		const health = getHealthStatus()

		// Add additional health checks
		const healthData = {
			...health,
			checks: {
				// Basic service availability
				service: 'up',

				// Memory check - fail if using more than 90% of available heap
				memory: ((): string => {
					if (typeof process !== 'undefined') {
						const mem = process.memoryUsage()
						const memoryUsagePercent =
							(mem.heapUsed / mem.heapTotal) * 100
						return memoryUsagePercent > 90 ? 'warning' : 'ok'
					}
					return 'unknown'
				})(),

				// Uptime check
				uptime:
					typeof process !== 'undefined' && process.uptime() > 0
						? 'ok'
						: 'warning',
			},

			// Environment info
			environment: {
				nodeVersion:
					typeof process !== 'undefined'
						? process.version
						: 'unknown',
				platform:
					typeof process !== 'undefined'
						? process.platform
						: 'unknown',
				arch: typeof process !== 'undefined' ? process.arch : 'unknown',
			},
		}

		// Determine overall status
		const hasWarnings = Object.values(healthData.checks).some(
			status => status === 'warning',
		)
		const hasErrors = Object.values(healthData.checks).some(
			status => status === 'error',
		)

		let overallStatus = 'healthy'
		let httpStatus = 200

		if (hasErrors) {
			overallStatus = 'unhealthy'
			httpStatus = 503
		} else if (hasWarnings) {
			overallStatus = 'degraded'
			httpStatus = 200 // Still considered healthy for load balancers
		}

		healthData.status = overallStatus

		return new Response(JSON.stringify(healthData, null, 2), {
			status: httpStatus,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		})
	} catch (error) {
		metricsLogger.error('Health check error', {
			scope: 'health-check-error',
			details: { error },
		})

		return new Response(
			JSON.stringify(
				{
					status: 'unhealthy',
					error: 'Health check failed',
					timestamp: new Date().toISOString(),
				},
				null,
				2,
			),
			{
				status: 503,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
	}
}
