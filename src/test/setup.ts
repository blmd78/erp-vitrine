// ====================================
// TEST SETUP - VITEST CONFIGURATION
// ====================================

import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// ====================================
// LOGGER MOCKING
// ====================================

// Mock the entire @nextnode/logger module to silence logs in tests
vi.mock('@nextnode/logger', () => ({
	createLogger: vi.fn(() => ({
		info: vi.fn(),
		warn: vi.fn(),
		error: vi.fn(),
		debug: vi.fn(),
	})),
}))

// ====================================
// ENVIRONMENT SETUP
// ====================================

// Ensure NODE_ENV is set to test
process.env.NODE_ENV = 'test'

// Mock any global objects that might be needed in tests
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

// Mock window.scrollTo (required by motion/framer-motion)
Object.defineProperty(window, 'scrollTo', {
	writable: true,
	value: vi.fn(),
})
