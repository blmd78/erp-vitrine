# @nextnode/functions-client

A TypeScript utility library for Nextnode Functions, providing utilities for date formatting, data processing, client creation, and comprehensive logging.

## Installation

```bash
pnpm add @nextnode/functions-client
```

Or with npm:

```bash
npm install @nextnode/functions-client
```

## Features

- ✅ **Type-safe**: Full TypeScript support with strict mode
- 📅 **Date utilities**: Flexible date formatting with internationalization
- 🔧 **Utility functions**: Deep merge, object validation, async delay
- 📝 **Comprehensive logging**: Built on @nextnode/logger with specialized loggers
- 🎯 **Data processing**: Transform and validate data with metadata
- ⚡ **ESM-only**: Modern ES modules
- 🧪 **Well-tested**: Comprehensive test coverage with Vitest

## Requirements

- Node.js >= 24.0.0
- TypeScript >= 5.0.0 (for development)

## Usage

### Date Formatting

```typescript
import { formatDate } from '@nextnode/functions-client'

// Basic usage with defaults
formatDate(new Date())
// Output: "November 24, 2025"

// With custom locale
formatDate(new Date(), 'fr-FR')
// Output: "24 novembre 2025"

// With custom options
formatDate(new Date(), 'en-US', {
	year: 'numeric',
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
})
// Output: "Nov 24, 2025, 12:00 PM"

// Works with timestamps and strings
formatDate('2025-11-24') // String input
formatDate(Date.now()) // Timestamp input
```

### Client Creation

```typescript
import { createClient } from '@nextnode/functions-client'

// Create a client instance
const client = createClient({
	apiKey: 'your-api-key',
	baseUrl: 'https://api.example.com',
	timeout: 5000,
})

console.log(client)
// Output: { apiKey: 'your-api-key', baseUrl: 'https://api.example.com' }
```

### Configuration Validation

```typescript
import { validateConfig } from '@nextnode/functions-client'

const config = { apiKey: 'test', baseUrl: 'https://api.example.com' }

if (validateConfig(config)) {
	// TypeScript knows config is Record<string, unknown>
	console.log('Valid configuration')
}

validateConfig(null) // false
validateConfig([]) // false
validateConfig('string') // false
```

### Data Processing

```typescript
import { processData } from '@nextnode/functions-client'

const data = [
	{ id: 1, name: 'item1' },
	{ id: 2, name: 'item2' },
]

const processed = await processData(data)

console.log(processed)
// Output: [
//   { id: 1, name: 'item1', processed: true, timestamp: 1700000000000 },
//   { id: 2, name: 'item2', processed: true, timestamp: 1700000000000 }
// ]
```

### Utility Functions

```typescript
import { deepMerge, isObject, delay } from '@nextnode/functions-client'

// Deep merge objects
const merged = deepMerge({ a: 1, nested: { b: 2 } }, { nested: { c: 3 } })
// Result: { a: 1, nested: { b: 2, c: 3 } }

// Check if value is object
isObject({}) // true
isObject([]) // false
isObject(null) // false

// Async delay
await delay(1000) // Wait 1 second
```

### Logging

The library includes comprehensive logging with @nextnode/logger:

```typescript
import {
  logger,
  coreLogger,
  apiLogger,
  logError,
  logDebug,
  logApiResponse
} from '@nextnode/functions-client'

// Basic logging
coreLogger.info('Processing started', { itemCount: 10 })

// Error logging with context
try {
  // ... some operation
} catch (error) {
  logError(error, {
    userId: 123,
    action: 'fetchData'
  })
}

// API response logging
logApiResponse('get', '/api/users', 200, { users: [...] })

// Debug logging
logDebug('Complex computation', {
  input: data,
  result: output
})
```

## API Reference

### Core Functions

#### `createClient(options?: ClientConfig)`

Creates a client instance with optional configuration.

**Parameters:**

- `options.apiKey?: string` - API key for authentication
- `options.baseUrl?: string` - Base URL for API requests
- `options.timeout?: number` - Request timeout in milliseconds

**Returns:** `{ apiKey?: string; baseUrl?: string }`

#### `validateConfig(config: unknown)`

Type guard for validating configuration objects.

**Returns:** `boolean` - True if config is a valid object

#### `processData(data: unknown[])`

Processes data array with metadata addition.

**Returns:** `Promise<unknown[]>` - Processed data with `processed` and `timestamp` fields

### Date Functions

#### `formatDate(date, locale?, options?)`

Formats a date into a localized string.

**Parameters:**

- `date: Date | string | number` - The date to format
- `locale?: string` - Locale for formatting (default: 'en-US')
- `options?: Intl.DateTimeFormatOptions` - Formatting options

**Returns:** `string` - Formatted date string

### Utility Functions

#### `deepMerge<T>(target: T, source: Partial<T>)`

Deep merges two objects.

**Returns:** `T` - Merged object

#### `isObject(value: unknown)`

Type guard for checking if value is a plain object.

**Returns:** `boolean`

#### `delay(ms: number)`

Delays execution for specified milliseconds.

**Returns:** `Promise<void>`

### Logging Functions

#### `logger`, `coreLogger`, `apiLogger`, `utilsLogger`

Specialized logger instances for different modules.

#### `logError(error, context?)`

Logs errors with context and stack trace.

#### `logDebug(label, data)`

Logs debug information with structured data.

#### `logApiResponse(method, url, status, data?)`

Logs API responses with method, URL, and status.

## Type Definitions

### ClientConfig

```typescript
interface ClientConfig {
	apiKey?: string
	baseUrl?: string
	timeout?: number
}
```

### ApiResponse<T>

```typescript
interface ApiResponse<T = unknown> {
	success: boolean
	data?: T
	error?: string
	statusCode: number
}
```

### LibraryError

```typescript
interface LibraryError {
	code: string
	message: string
	details?: Record<string, unknown>
}
```

## Development

### Prerequisites

- Node.js >= 24.0.0
- PNPM 10.11.0

### Setup

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate test coverage
pnpm test:coverage
```

### Code Quality

```bash
# Lint and format
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check
```

### Release Process

This library uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm changeset:version

# Publish to NPM
pnpm changeset:publish
```

## License

ISC

## Author

Walid M
