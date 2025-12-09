# @nextnode/config-manager

A powerful TypeScript configuration management library with **automatic type generation** from your JSON config files. Provides flexible, environment-aware configuration loading with intelligent type inference, eliminating the need for manual type annotations.

## ✨ Key Features

### 🚀 Automatic Type Generation
- **Zero configuration**: Types are automatically generated from your JSON config files
- **Smart detection**: Automatically detects user projects and config directories
- **Intelligent caching**: Only regenerates types when config files change
- **Perfect type safety**: Eliminates optional chaining (`?.`) in your configuration access

### 🎯 Enhanced Type Inference
- **No generics needed**: `getConfig()` automatically infers precise types
- **Path-based inference**: `getConfig('email.from')` returns the exact type
- **Module augmentation**: Optional schema declaration for even more precise types

### 💪 Robust & Maintainable
- **Modern error handling**: Meaningful error propagation without silent failures
- **Clean architecture**: Refactored codebase following modern TypeScript patterns
- **Zero defensive coding**: Eliminates unnecessary try-catch blocks and fallbacks

## Core Features

- 🚀 **Automatic type generation** - Generates precise TypeScript types from your JSON config files
- 🎯 **Intelligent type inference** - No generics needed, automatic type detection from config structure
- 🔧 **Environment-based configuration** - Support for multiple environments (development, staging, production)
- 🛡️ **Perfect type safety** - Eliminates optional chaining with precise generated types
- 📁 **Smart config detection** - Automatically finds config directories (config/, configs/, src/config/, etc.)
- 🎯 **Dot notation access** - Easy access to nested configuration values with type safety
- 🔄 **Intelligent caching** - Hash-based change detection, only regenerates when needed
- ✅ **Configuration validation** - Built-in validation for required configuration paths
- 🌍 **Environment detection** - Automatic environment detection with manual override
- 💪 **Robust error handling** - Modern error patterns with meaningful error propagation
- 📦 **Zero configuration** - Works out of the box for most project structures

## Installation

```bash
npm install @nextnode/config-manager
```

Or with pnpm:

```bash
pnpm add @nextnode/config-manager
```

Or with yarn:

```bash
yarn add @nextnode/config-manager
```

## Quick Start

### Basic Usage

```typescript
import { initConfig, getConfig } from '@nextnode/config-manager'

// Initialize the configuration system (automatically detects config/ directory)
initConfig({
  configDir: './config',  // optional, auto-detected
  environment: 'development',  // optional, auto-detected from NODE_ENV
  cache: true  // optional, defaults to true
})

// Get configuration values with automatic type inference
const appName = getConfig('app.name')        // string - no generics needed!
const emailProvider = getConfig('email.provider')  // string
const features = getConfig('app.features')  // string[]

// Get entire configuration sections with perfect types
const emailConfig = getConfig('email')  // EmailConfig with all properties typed
const appConfig = getConfig('app')      // AppConfig with all properties typed
const fullConfig = getConfig()          // Complete config object, fully typed

// Perfect type safety - no optional chaining needed!
console.log(emailConfig.from)          // ✅ Direct access
console.log(appConfig.features.length) // ✅ Array methods available
```

### Configuration File Structure

Create configuration files in your project's `config` directory:

```
config/
├── default.json          # Base configuration
├── development.json      # Development overrides
├── staging.json         # Staging overrides
└── production.json      # Production overrides
```

**Example `config/default.json`:**
```json
{
  "app": {
    "name": "My Application",
    "version": "1.0.0",
    "features": ["authentication", "analytics"],
    "environment": "development"
  },
  "email": {
    "provider": "resend",
    "from": "noreply@example.com",
    "to": "admin@example.com",
    "templates": {
      "projectRequest": {
        "subject": "New Project Request",
        "companyName": "Your Company",
        "websiteUrl": "https://example.com"
      }
    }
  }
}
```

**Example `config/production.json`:**
```json
{
  "app": {
    "environment": "production"
  },
  "email": {
    "provider": "nodemailer",
    "from": "noreply@yourcompany.com",
    "to": "admin@yourcompany.com"
  }
}
```

## 🚀 Automatic Type Generation

The library automatically generates precise TypeScript types from your JSON configuration files, providing perfect type safety without any manual setup.

### How It Works

1. **Auto-Detection**: When you install `@nextnode/config-manager` in your project, it automatically detects if you have a `config/` directory
2. **Smart Generation**: On first use of `initConfig()` or `getConfig()`, it scans your JSON files and generates TypeScript definitions
3. **Intelligent Caching**: Types are only regenerated when your config files change (using MD5 hash comparison)
4. **Zero Configuration**: Works out of the box with standard project structures

### Generated Type Files

The system creates a `types/config.d.ts` file in your project root:

```typescript
// types/config.d.ts (auto-generated)
declare module '@nextnode/config-manager' {
  interface UserConfigSchema {
    app: {
      name: string
      version: string
      features: string[]
      environment: string
    }
    email: {
      provider: string
      from: string
      to: string
      templates: {
        projectRequest: {
          subject: string
          companyName: string
          websiteUrl: string
        }
      }
    }
  }
}
```

### Project Detection

The auto-generation system detects user projects by:

- ✅ Finding a `config/` directory in your project root
- ✅ Checking that the current project is NOT `@nextnode/config-manager` itself
- ✅ Supporting various config directory names (`config/`, `configs/`, `src/config/`, etc.)

### Manual Type Generation

You can also generate types manually using the CLI:

```bash
# Generate types for your config directory
npx @nextnode/config-manager generate-types

# Custom config directory
npx @nextnode/config-manager generate-types ./my-config ./types/my-config.d.ts
```

## API Reference

### Configuration Functions

#### `initConfig(options?)`
Initialize the configuration system with custom options. **Automatically triggers type generation** for user projects.

```typescript
initConfig({
  environment?: string    // Override auto-detected environment
  configDir?: string     // Custom config directory path (auto-detected if not provided)
  cache?: boolean        // Enable/disable caching (default: true)
})
```

**New Behavior:**
- Automatically detects `config/` directory in your project root
- Triggers type generation on first initialization
- Only regenerates types when config files change

#### `getConfig(path?, environment?)` / `getConfig<T>(path?, environment?)`
Get configuration value with **automatic type inference**. No generics needed in most cases!

```typescript
// ✨ NEW: Automatic type inference (recommended)
const value = getConfig('email.from')         // string
const features = getConfig('app.features')    // string[]
const emailConfig = getConfig('email')        // EmailConfig
const allConfig = getConfig()                 // Full config object

// Legacy: Manual type specification (still supported)
const value = getConfig<string>('email.from')
const features = getConfig<string[]>('app.features')

// Environment override
const prodEmail = getConfig('email.from', 'production')
```

**Type Inference Features:**
- **Path-based inference**: Return type automatically matches your config structure
- **Section inference**: Getting `'email'` returns the complete `EmailConfig` interface
- **Full config inference**: Calling `getConfig()` returns the complete typed configuration

#### `hasConfig(path, environment?)`
Check if a configuration path exists.

```typescript
if (hasConfig('email.templates.welcome')) {
  // Configuration exists
}
```

#### `validateRequiredConfig(requiredPaths, environment?)`
Validate that required configuration paths exist.

```typescript
const validation = validateRequiredConfig([
  'app.name',
  'email.from',
  'email.provider'
])

if (!validation.valid) {
  console.error('Missing required config:', validation.missing)
}
```

### Utility Functions

#### `getEnvironment()`
Get the current environment name.

```typescript
const env = getEnvironment()  // 'development', 'staging', 'production', etc.
```

#### `getAvailableEnvironments()`
Get list of all available configuration environments.

```typescript
const environments = getAvailableEnvironments()
// ['default', 'development', 'staging', 'production']
```

#### `clearConfigCache()`
Clear the configuration cache (useful for testing or hot reloading).

```typescript
clearConfigCache()
```

### Advanced Utilities

#### `deepMerge(target, source)`
Deep merge configuration objects.

```typescript
import { deepMerge } from '@nextnode/config-manager'

const merged = deepMerge(baseConfig, overrideConfig)
```

#### `getNestedValue<T>(object, path)`
Get nested value using dot notation.

```typescript
import { getNestedValue } from '@nextnode/config-manager'

const value = getNestedValue(config, 'email.templates.welcome.subject')
```

#### `setNestedValue(object, path, value)`
Set nested value using dot notation.

```typescript
import { setNestedValue } from '@nextnode/config-manager'

setNestedValue(config, 'email.provider', 'sendgrid')
```

## TypeScript Support

### 🚀 Automatic Type Generation (Recommended)

The library now **automatically generates** precise TypeScript definitions from your JSON config files:

```typescript
// types/config.d.ts (auto-generated from your JSON files)
declare module '@nextnode/config-manager' {
  interface UserConfigSchema {
    app: {
      name: string
      version: string
      features: string[]
      environment: string
    }
    email: {
      provider: 'resend' | 'nodemailer'  // Inferred from your actual values
      from: string
      to: string
      replyTo?: string                   // Optional if null in any config
      templates: {
        projectRequest: {
          subject: string
          companyName: string
          websiteUrl: string
          companyLogo?: string
        }
      }
    }
  }
}

// Now your code has perfect type safety:
const config = getConfig()              // Fully typed!
const provider = getConfig('email.provider')  // 'resend' | 'nodemailer'
```

### Manual Module Augmentation (Advanced)

For even more precise types, you can manually declare your configuration schema:

```typescript
// In your project, create a types/config.d.ts file:
declare module '@nextnode/config-manager' {
  interface UserConfigSchema {
    app: {
      name: string
      version: string
      features: ('auth' | 'analytics' | 'payments')[]  // Specific union types
      environment: 'development' | 'staging' | 'production'
      debug?: boolean
    }
    email: {
      provider: 'sendgrid' | 'resend' | 'mock'
      from: string
      to: string
      apiKey?: string  // Only in production
    }
    database: {
      host: string
      port: number
      ssl: boolean
      credentials: {
        username: string
        password: string
      }
    }
  }
}
```

## Environment Detection

The configuration system automatically detects the environment in this order:

1. `environment` option passed to `initConfig()`
2. `NODE_ENV` environment variable
3. Defaults to `'development'`

## Configuration Loading Priority

Configurations are merged in this order (later configs override earlier ones):

1. `default.json` - Base configuration
2. `{environment}.json` - Environment-specific configuration  
3. `local.json` - Local overrides (git-ignored, optional)

## Best Practices

### 1. Leverage Automatic Type Generation 🚀
```typescript
// ✅ RECOMMENDED: Let the library handle types automatically
initConfig({ configDir: './config' })
const emailConfig = getConfig('email')  // Perfectly typed!
const dbHost = getConfig('database.host')  // string

// ❌ AVOID: Manual type annotations (unless needed for specific unions)
const emailConfig = getConfig<EmailConfig>('email')
```

### 2. Organize Configuration by Feature
```json
{
  "database": {
    "host": "localhost",
    "port": 5432,
    "ssl": false
  },
  "redis": {
    "host": "localhost", 
    "port": 6379
  },
  "email": {
    "provider": "resend",
    "from": "noreply@example.com"
  },
  "features": {
    "authentication": true,
    "analytics": false,
    "payments": true
  }
}
```

### 3. Use Environment Variables for Secrets
```json
{
  "database": {
    "password": "${DATABASE_PASSWORD}"
  },
  "email": {
    "apiKey": "${EMAIL_API_KEY}"
  },
  "auth": {
    "jwtSecret": "${JWT_SECRET}"
  }
}
```

### 4. Validate Required Configuration at Startup
```typescript
// ✅ With automatic type inference, validation is easier
const validation = validateRequiredConfig([
  'database.host',
  'database.password',
  'email.apiKey',
  'auth.jwtSecret'
])

if (!validation.valid) {
  console.error('Missing required configuration:', validation.missing)
  process.exit(1)
}

// ✅ Direct access with confidence (no optional chaining needed)
const config = getConfig()
console.log(`Connecting to ${config.database.host}:${config.database.port}`)
```

### 5. Handle Configuration Errors Gracefully
```typescript
// ✅ The library now propagates meaningful errors
try {
  await initConfig({ configDir: './config' })
} catch (error) {
  // You'll get specific error messages for:
  // - Missing config directory
  // - Invalid JSON syntax
  // - Configuration validation failures
  // - Type generation issues
  console.error('Configuration initialization failed:', error.message)
  process.exit(1)
}
```

### 6. Structure for Multiple Environments
```
config/
├── default.json         # Base configuration
├── development.json     # Development overrides
├── staging.json        # Staging environment
├── production.json     # Production environment
├── test.json          # Test environment
└── local.json         # Git-ignored local overrides
```

## Troubleshooting

### Configuration Not Found
- Verify the config directory path
- Check file naming (must match environment name)
- Ensure JSON syntax is valid

### Type Errors
- Ensure TypeScript types match your configuration structure
- Use generic types for custom configuration schemas
- Check that optional fields are properly marked

### Environment Issues
- Verify `NODE_ENV` is set correctly
- Use `getEnvironment()` to debug current environment
- Check `getAvailableEnvironments()` for valid options

### Error Handling
- The library uses modern error propagation patterns
- Errors are no longer silently swallowed - you'll see meaningful messages
- Configuration and type generation failures surface with specific details
- Use try-catch blocks around `initConfig()` for graceful error handling

## Contributing

We welcome contributions! Please ensure your code:

- Follows TypeScript best practices
- Includes proper type definitions
- Has comprehensive test coverage
- Follows the existing code style

## Development

```bash
# Install dependencies
pnpm install

# Generate config types from test fixtures
pnpm generate-test-types

# Run tests with full coverage
pnpm test

# Type checking (includes test type generation)
pnpm type-check

# Linting
pnpm lint

# Build the library
pnpm build

# Format code
pnpm format

# Manual type generation for config directory
pnpm generate-config-types [configDir] [outputFile]
```

### Development Workflow

1. **Type Generation**: The library includes automatic type generation for both library development and user projects
2. **Test Types**: Run `pnpm generate-test-types` to generate types from test fixtures
3. **Type Safety**: The `type-check` script automatically generates test types before checking
4. **Continuous Integration**: All scripts are designed to work in CI environments

### Working with Generated Types

During development, you may need to regenerate types:

```bash
# Regenerate types from your project's config files
node src/generate-types.js ./config ./types/config.d.ts

# Or use the npm script for test fixtures
pnpm generate-test-types
```

## License

ISC