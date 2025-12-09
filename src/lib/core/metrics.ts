/**
 * Application Metrics and Monitoring Utilities
 * Provides custom metrics for Fly.io Prometheus integration
 */

// Simple in-memory metrics store for custom metrics
class MetricsStore {
	private metrics: Map<string, number> = new Map()
	private counters: Map<string, number> = new Map()
	private histograms: Map<string, number[]> = new Map()

	// Increment a counter
	incrementCounter(name: string, value: number = 1): void {
		const current = this.counters.get(name) || 0
		this.counters.set(name, current + value)
	}

	// Set a gauge value
	setGauge(name: string, value: number): void {
		this.metrics.set(name, value)
	}

	// Record a histogram value
	recordHistogram(name: string, value: number): void {
		const values = this.histograms.get(name) || []
		values.push(value)
		// Keep only last 1000 values to prevent memory leaks
		if (values.length > 1000) {
			values.shift()
		}
		this.histograms.set(name, values)
	}

	// Get Prometheus formatted metrics
	getPrometheusMetrics(): string {
		let output = ''

		// Export counters
		for (const [name, value] of this.counters.entries()) {
			output += `# TYPE ${name} counter\n`
			output += `${name} ${value}\n`
		}

		// Export gauges
		for (const [name, value] of this.metrics.entries()) {
			output += `# TYPE ${name} gauge\n`
			output += `${name} ${value}\n`
		}

		// Export histograms (simplified - just count and sum)
		for (const [name, values] of this.histograms.entries()) {
			const count = values.length
			const sum = values.reduce((a, b) => a + b, 0)
			const avg = count > 0 ? sum / count : 0

			output += `# TYPE ${name}_count counter\n`
			output += `${name}_count ${count}\n`
			output += `# TYPE ${name}_sum counter\n`
			output += `${name}_sum ${sum}\n`
			output += `# TYPE ${name}_avg gauge\n`
			output += `${name}_avg ${avg}\n`
		}

		return output
	}

	// Reset all metrics (useful for testing)
	reset(): void {
		this.metrics.clear()
		this.counters.clear()
		this.histograms.clear()
	}
}

// Global metrics instance
export const metrics = new MetricsStore()

// Common application metrics
export const ApplicationMetrics = {
	// Page view tracking
	recordPageView(path: string): void {
		metrics.incrementCounter('app_page_views_total')
		metrics.incrementCounter(`app_page_views_by_path{path="${path}"}`)
	},

	// Response time tracking
	recordResponseTime(duration: number): void {
		metrics.recordHistogram('app_response_time_seconds', duration / 1000)
	},

	// Error tracking
	recordError(type: string, path?: string): void {
		metrics.incrementCounter('app_errors_total')
		metrics.incrementCounter(`app_errors_by_type{type="${type}"}`)
		if (path) {
			metrics.incrementCounter(`app_errors_by_path{path="${path}"}`)
		}
	},

	// Build info
	setBuildInfo(version: string, commit: string): void {
		metrics.setGauge(
			`app_build_info{version="${version}",commit="${commit}"}`,
			1,
		)
	},

	// Memory usage (Node.js specific)
	recordMemoryUsage(): void {
		if (process?.memoryUsage) {
			const mem = process.memoryUsage()
			metrics.setGauge('app_memory_heap_used_bytes', mem.heapUsed)
			metrics.setGauge('app_memory_heap_total_bytes', mem.heapTotal)
			metrics.setGauge('app_memory_rss_bytes', mem.rss)
			metrics.setGauge('app_memory_external_bytes', mem.external)
		}
	},
}

// Types for middleware
interface ExpressRequest {
	url?: string
}

interface ExpressResponse {
	statusCode: number
	on: (event: string, callback: () => void) => void
}

type NextFunction = () => void

// Middleware for automatic metrics collection
export function createMetricsMiddleware(): {
	timing: (
		req: ExpressRequest,
		res: ExpressResponse,
		next?: NextFunction,
	) => void
	memoryMonitoring: () => void
} {
	return {
		// Request timing middleware
		timing: (
			req: ExpressRequest,
			res: ExpressResponse,
			next?: NextFunction,
		): void => {
			const start = Date.now()

			res.on('finish', () => {
				const duration = Date.now() - start
				ApplicationMetrics.recordResponseTime(duration)

				if (req.url) {
					ApplicationMetrics.recordPageView(req.url)
				}

				if (res.statusCode >= 400) {
					ApplicationMetrics.recordError(
						`http_${res.statusCode}`,
						req.url,
					)
				}
			})

			if (next) next()
		},

		// Memory monitoring
		memoryMonitoring: (): void => {
			// Update memory metrics every 30 seconds
			setInterval(() => {
				ApplicationMetrics.recordMemoryUsage()
			}, 30000)
		},
	}
}

// Health check with metrics
export function getHealthStatus(): {
	status: string
	timestamp: string
	uptime: number | null
	memory: {
		heapUsed: string
		heapTotal: string
		rss: string
	} | null
	version: string
	commit: string
} {
	const memUsage =
		typeof process !== 'undefined' ? process.memoryUsage() : null

	return {
		status: 'healthy',
		timestamp: new Date().toISOString(),
		uptime: typeof process !== 'undefined' ? process.uptime() : null,
		memory: memUsage
			? {
					heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
					heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
					rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
				}
			: null,
		version: process.env.APP_VERSION || 'unknown',
		commit: process.env.APP_COMMIT || 'unknown',
	}
}

// Initialize metrics with build info
if (typeof process !== 'undefined') {
	ApplicationMetrics.setBuildInfo(
		process.env.APP_VERSION || 'dev',
		process.env.APP_COMMIT || 'local',
	)

	// Start memory monitoring
	createMetricsMiddleware().memoryMonitoring()
}
