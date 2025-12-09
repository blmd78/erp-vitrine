/**
 * Tests for CookieError
 */

import { describe, expect, it } from 'vitest'

import { CookieError } from '../errors'

describe('CookieError', () => {
	it('should create error with message and details', () => {
		const error = new CookieError('Test error', {
			name: 'testCookie',
			strategy: 'TestStrategy',
		})

		expect(error.message).toBe('Test error')
		expect(error.details.name).toBe('testCookie')
		expect(error.details.strategy).toBe('TestStrategy')
	})

	it('should have name property set to CookieError', () => {
		const error = new CookieError('Test error', {})

		expect(error.name).toBe('CookieError')
	})

	it('should be instance of Error', () => {
		const error = new CookieError('Test error', {})

		expect(error).toBeInstanceOf(Error)
	})

	it('should accept error object in details', () => {
		const originalError = new Error('Original error')
		const error = new CookieError('Wrapper error', {
			error: originalError,
			strategy: 'TestStrategy',
		})

		expect(error.details.error).toBe(originalError)
	})

	it('should work with minimal details', () => {
		const error = new CookieError('Minimal error', {})

		expect(error.message).toBe('Minimal error')
		expect(error.details).toEqual({})
	})
})
