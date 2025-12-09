import { sequence } from 'astro:middleware'

import { cacheMiddleware } from './lib/middleware/cache'
import { errorHandlerMiddleware } from './lib/middleware/error-handler'
import { i18nMiddleware } from './lib/middleware/i18n'
import { loggingMiddleware } from './lib/middleware/logging'
import { metricsMiddleware } from './lib/middleware/metrics'
// Import specialized middleware modules
import { urlMappingMiddleware } from './lib/middleware/url-mapping'

export const onRequest = sequence(
	urlMappingMiddleware, // 1. Map URLs → internal [locale]/ structure
	i18nMiddleware, // 2. Initialize i18n system and inject context
	metricsMiddleware, // 4. Collect application metrics
	cacheMiddleware, // 5. Set optimal cache headers for performance
	errorHandlerMiddleware, // 6. Handle 404/500 errors with localized pages
	loggingMiddleware, // 7. Log final responses with error context (MUST BE LAST)
)
