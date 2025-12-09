# @nextnode/logger

A TypeScript logging library for NextNode projects

## Installation

```bash
npm install @nextnode/logger
```

Or with pnpm:

```bash
pnpm add @nextnode/logger
```

## Usage

### Basic Setup

```typescript
import { NextnodeClient } from '@nextnode/logger';

// Initialize the client
const client = new NextnodeClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.nextnode.com', // optional, defaults to this
  timeout: 30000 // optional, defaults to 30 seconds
});
```

### Execute a Function

```typescript
// Execute a function
const result = await client.executeFunction({
  functionName: 'my-function',
  payload: {
    key: 'value',
    data: [1, 2, 3]
  },
  headers: {
    'Custom-Header': 'value'
  }
});

if (result.success) {
  console.log('Function result:', result.data);
} else {
  console.error('Function error:', result.error);
}
```

### Configuration Management

```typescript
// Update configuration
client.updateConfig({
  apiKey: 'new-api-key',
  timeout: 60000
});

// Get current configuration
const config = client.getConfig();
console.log('Current config:', config);
```

## API Reference

### NextnodeClient

#### Constructor

```typescript
new NextnodeClient(config?: NextnodeConfig)
```

#### Methods

- `executeFunction<T>(request: FunctionRequest): Promise<FunctionResponse<T>>` - Execute a function
- `updateConfig(newConfig: Partial<NextnodeConfig>): void` - Update client configuration
- `getConfig(): NextnodeConfig` - Get current configuration

### Types

#### NextnodeConfig

```typescript
interface NextnodeConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
}
```

#### FunctionRequest

```typescript
interface FunctionRequest {
  functionName: string;
  payload?: Record<string, any>;
  headers?: Record<string, string>;
}
```

#### FunctionResponse

```typescript
interface FunctionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}
```

## Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Publishing

```bash
npm publish
```

## License

ISC
