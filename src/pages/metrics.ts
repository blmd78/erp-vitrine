/**
 * Metrics endpoint for Prometheus scraping
 * Exposes application metrics in Prometheus format
 */

import type { APIRoute } from 'astro'

import { metrics } from '../lib/core/metrics'
import { metricsLogger } from '../lib/logging'

export const GET: APIRoute = async ({ request: _request }) => {
	try {
		// Get Prometheus formatted metrics
		const prometheusMetrics = metrics.getPrometheusMetrics()

		// Add some basic Node.js metrics if available
		let additionalMetrics = ''

		if (typeof process !== 'undefined') {
			const memUsage = process.memoryUsage()
			const uptime = process.uptime()

			// Node.js process metrics
			additionalMetrics += `# TYPE nodejs_memory_heap_used_bytes gauge\n`
			additionalMetrics += `nodejs_memory_heap_used_bytes ${memUsage.heapUsed}\n`
			additionalMetrics += `# TYPE nodejs_memory_heap_total_bytes gauge\n`
			additionalMetrics += `nodejs_memory_heap_total_bytes ${memUsage.heapTotal}\n`
			additionalMetrics += `# TYPE nodejs_memory_rss_bytes gauge\n`
			additionalMetrics += `nodejs_memory_rss_bytes ${memUsage.rss}\n`
			additionalMetrics += `# TYPE nodejs_memory_external_bytes gauge\n`
			additionalMetrics += `nodejs_memory_external_bytes ${memUsage.external}\n`
			additionalMetrics += `# TYPE nodejs_process_uptime_seconds gauge\n`
			additionalMetrics += `nodejs_process_uptime_seconds ${uptime}\n`

			// Add timestamp
			additionalMetrics += `# TYPE app_metrics_timestamp gauge\n`
			additionalMetrics += `app_metrics_timestamp ${Date.now()}\n`
		}

		const fullMetrics = prometheusMetrics + additionalMetrics

		return new Response(fullMetrics, {
			status: 200,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		})
	} catch (error) {
		metricsLogger.error('Error generating metrics', {
			scope: 'metrics-generation-error',
			details: { error },
		})

		return new Response('Error generating metrics', {
			status: 500,
			headers: {
				'Content-Type': 'text/plain',
			},
		})
	}
}
