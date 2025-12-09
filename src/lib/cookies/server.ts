/**
 * Server-side cookie utilities (for Astro middleware)
 */

export const createServerCookieManager = (request: Request) => {
	const cookieHeader = request.headers.get('cookie') || ''

	return {
		get: (name: string): string | null => {
			const cookies = cookieHeader.split(';')
			const cookieName = `${encodeURIComponent(name)}=`

			for (const cookie of cookies) {
				const trimmedCookie = cookie.trim()
				if (trimmedCookie.startsWith(cookieName)) {
					const value = trimmedCookie.substring(cookieName.length)
					return decodeURIComponent(value)
				}
			}

			return null
		},

		getAll: (): Record<string, string> => {
			const cookies: Record<string, string> = {}

			if (!cookieHeader) {
				return cookies
			}

			cookieHeader.split(';').forEach(cookie => {
				const [name, value] = cookie.trim().split('=')
				if (name && value) {
					cookies[decodeURIComponent(name)] =
						decodeURIComponent(value)
				}
			})

			return cookies
		},
	}
}
