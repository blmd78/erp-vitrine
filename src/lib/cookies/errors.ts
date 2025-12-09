/**
 * Custom error class for cookie operations
 */
export class CookieError extends Error {
	constructor(
		message: string,
		public details: {
			name?: string
			error?: unknown
			strategy?: string
		},
	) {
		super(message)
		this.name = 'CookieError'
	}
}
