/**
 * Test helpers and mocks for cookie tests
 */

import { vi } from 'vitest'

import type { Cookie } from '@/types/cookie-store'

/**
 * Mock Cookie Store API
 */
export const mockCookieStoreAPI = () => {
	const cookieStore = {
		get: vi.fn(),
		getAll: vi.fn(),
		set: vi.fn(),
		delete: vi.fn(),
	}

	Object.defineProperty(window, 'cookieStore', {
		writable: true,
		configurable: true,
		value: cookieStore,
	})

	Object.defineProperty(window, 'isSecureContext', {
		writable: true,
		configurable: true,
		value: true,
	})

	// Mock location.protocol with writable descriptor
	Object.defineProperty(window, 'location', {
		value: { protocol: 'https:' },
		writable: true,
		configurable: true,
	})

	return cookieStore
}

/**
 * Mock document.cookie
 */
export const mockDocumentCookie = () => {
	let cookieValue = ''

	Object.defineProperty(document, 'cookie', {
		get: vi.fn(() => cookieValue),
		set: vi.fn((value: string) => {
			// Simple cookie storage simulation
			if (value.includes('expires=Thu, 01 Jan 1970')) {
				// Delete cookie
				const name = value.split('=')[0]
				const cookies = cookieValue.split('; ')
				cookieValue = cookies
					.filter(c => !c.startsWith(`${name}=`))
					.join('; ')
			} else {
				// Add/update cookie
				const parts = value.split(';')
				const nameValue = parts[0]
				if (!nameValue) return

				const [name] = nameValue.split('=')
				if (!name) return

				const cookies = cookieValue.split('; ').filter(c => c)
				const existing = cookies.findIndex(c =>
					c.startsWith(`${name}=`),
				)

				if (existing >= 0) {
					cookies[existing] = nameValue
				} else {
					cookies.push(nameValue)
				}

				cookieValue = cookies.join('; ')
			}
		}),
		configurable: true,
	})

	Object.defineProperty(window, 'isSecureContext', {
		writable: true,
		configurable: true,
		value: false,
	})

	// Mock location.protocol with writable descriptor
	Object.defineProperty(window, 'location', {
		value: { protocol: 'http:' },
		writable: true,
		configurable: true,
	})

	return {
		getCookies: () => cookieValue,
		setCookies: (value: string) => {
			cookieValue = value
		},
		clearCookies: () => {
			cookieValue = ''
		},
	}
}

/**
 * Reset all cookie mocks
 */
export const resetCookieMocks = () => {
	vi.clearAllMocks()

	// Remove cookieStore if it exists
	if ('cookieStore' in window) {
		// @ts-expect-error - Removing mock
		window.cookieStore = undefined
	}

	// Reset document.cookie
	Object.defineProperty(document, 'cookie', {
		value: '',
		writable: true,
		configurable: true,
	})

	// Reset window properties
	Object.defineProperty(window, 'isSecureContext', {
		value: false,
		writable: true,
		configurable: true,
	})

	// Reset location
	Object.defineProperty(window, 'location', {
		value: { protocol: 'http:' },
		writable: true,
		configurable: true,
	})
}

/**
 * Create mock Cookie object
 */
export const createMockCookie = (
	name: string,
	value: string,
	overrides: Partial<Cookie> = {},
): Cookie => ({
	name,
	value,
	domain: 'localhost',
	expires: Date.now() + 86400000, // 1 day
	path: '/',
	sameSite: 'lax',
	secure: false,
	partitioned: false,
	...overrides,
})

/**
 * Create mock Request for server tests
 */
export const createMockRequest = (cookieHeader = ''): Request => {
	return {
		headers: {
			get: (name: string) => {
				if (name === 'cookie') return cookieHeader
				return null
			},
		},
	} as unknown as Request
}
