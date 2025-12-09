/**
 * Centralized metrics configuration
 * Defines color palette and constants for performance metrics displays
 */

/**
 * Standard color palette for metrics visualization
 * Used consistently across LighthouseGauges, PerformanceMetrics, etc.
 */
export const METRIC_COLORS = [
	'#10b981', // Green
	'#3b82f6', // Blue
	'#8b5cf6', // Purple
	'#f59e0b', // Amber
	'#ec4899', // Pink
	'#06b6d4', // Cyan
] as const

/**
 * Type for metric color values
 */
export type MetricColor = (typeof METRIC_COLORS)[number]

/**
 * Get a color from the palette by index with fallback
 */
export const getMetricColor = (index: number): MetricColor => {
	return METRIC_COLORS[index] ?? METRIC_COLORS[0]
}
