import type { MiddlewareHandler } from 'astro'

/**
 * Cache middleware for optimal performance
 * Sets Cache-Control headers based on content type and route
 */
export const cacheMiddleware: MiddlewareHandler = async (context, next) => {
	const response = await next()
	const { pathname } = context.url

	// Don't cache API routes, dynamic content, or error pages
	if (
		pathname.includes('/api/') ||
		pathname.includes('/debug/') ||
		pathname.includes('/metrics') ||
		pathname.includes('/404') ||
		pathname.includes('/500')
	) {
		response.headers.set('Cache-Control', 'no-store, must-revalidate')
		return response
	}

	// Optimized images from Astro - long-term cache (content-addressed via query params)
	if (pathname.startsWith('/_image')) {
		// 1 year cache - safe because URL changes when image content changes
		response.headers.set(
			'Cache-Control',
			'public, max-age=31536000, immutable',
		)
		// CDN-specific cache headers (Cloudflare, Fastly, etc.)
		response.headers.set(
			'CDN-Cache-Control',
			'public, max-age=31536000, immutable',
		)
		response.headers.set(
			'Cloudflare-CDN-Cache-Control',
			'public, max-age=31536000',
		)
		return response
	}

	// Get content type
	const contentType = response.headers.get('Content-Type') || ''

	// Static assets (fonts, images, CSS, JS) - long-term cache
	if (
		pathname.includes('/_astro/') ||
		pathname.includes('/fonts/') ||
		pathname.match(/\.(woff2|woff|ttf|eot|otf)$/) ||
		pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/) ||
		pathname.match(/\.(css|js)$/)
	) {
		// 1 year cache for hashed static assets
		response.headers.set(
			'Cache-Control',
			'public, max-age=31536000, immutable',
		)
		// CDN-specific cache headers (Cloudflare, Fastly, etc.)
		response.headers.set(
			'CDN-Cache-Control',
			'public, max-age=31536000, immutable',
		)
		response.headers.set(
			'Cloudflare-CDN-Cache-Control',
			'public, max-age=31536000',
		)
		return response
	}

	// HTML pages - short cache with stale-while-revalidate
	if (contentType.includes('text/html')) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=0, s-maxage=60, stale-while-revalidate=86400',
		)
		return response
	}

	// Default for other content
	response.headers.set(
		'Cache-Control',
		'public, max-age=3600, stale-while-revalidate=86400',
	)

	return response
}
