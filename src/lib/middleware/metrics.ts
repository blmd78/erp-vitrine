/**
 * Metrics Collection Middleware
 * Handles application metrics and analytics tracking
 */

import { defineMiddleware } from 'astro:middleware'

import { ApplicationMetrics } from '../core/metrics'
import { shouldTrackMetrics } from './utils'

/**
 * Middleware for collecting application metrics
 */
export const metricsMiddleware = defineMiddleware(async (context, next) => {
	const { request } = context
	const startTime = Date.now()
	const url = new URL(request.url)
	const path = url.pathname

	// Process the request
	const response = await next()

	// Record metrics after response
	const duration = Date.now() - startTime

	// Record page view (exclude API and asset requests)
	if (shouldTrackMetrics(path)) {
		ApplicationMetrics.recordPageView(path)
	}

	// Record response time
	ApplicationMetrics.recordResponseTime(duration)

	// Record errors
	if (response.status >= 400) {
		ApplicationMetrics.recordError(`http_${response.status}`, path)
	}

	return response
})
