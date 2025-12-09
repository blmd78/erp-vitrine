# @nextnode/logger

## 0.2.3

### Patch Changes

- [#8](https://github.com/NextNodeSolutions/logger/pull/8) [`a71b105`](https://github.com/NextNodeSolutions/logger/commit/a71b105237215b8d3032e3dacd5150f74f08a223) Thanks [@walid-mos](https://github.com/walid-mos)! - Fixed browser compatibility issues with TypeScript strict mode by replacing globalThis usage with direct global access (window, document, crypto, importScripts). Updated environment detection to use proper typeof checks and added DOM/WebWorker library types to TypeScript configuration.

## 0.2.2

### Patch Changes

- [#6](https://github.com/NextNodeSolutions/logger/pull/6) [`0823977`](https://github.com/NextNodeSolutions/logger/commit/08239770866614d267a37015cba3691e17336253) Thanks [@walid-mos](https://github.com/walid-mos)! - Fix TypeScript path resolution in build output

  - Add tsc-alias dependency to resolve @/ paths during build process
  - Update build script to run tsc-alias after TypeScript compilation
  - Fix module resolution issue where @/ paths in tests weren't resolved properly
  - Ensure built package can be imported correctly from external projects
  - All existing functionality preserved with improved build reliability

## 0.2.1

### Patch Changes

- [#4](https://github.com/NextNodeSolutions/logger/pull/4) [`cbc752f`](https://github.com/NextNodeSolutions/logger/commit/cbc752feaee53a7fd92629c86f197a08c816153b) Thanks [@walid-mos](https://github.com/walid-mos)! - fix: add files field to package.json to ensure dist folder is published to npm

  Previously, the package was publishing source TypeScript files instead of the built JavaScript files in the dist directory. This caused issues when consuming the package as the TypeScript files were present in node_modules instead of the compiled JavaScript.

## 0.2.0

### Minor Changes

- [#1](https://github.com/NextNodeSolutions/logger/pull/1) [`a02f95e`](https://github.com/NextNodeSolutions/logger/commit/a02f95e9206719c9fab44e888e5b1bf37784eaf4) Thanks [@walid-mos](https://github.com/walid-mos)! - feat: implement comprehensive NextNode logger with structured logging capabilities

  - Add core logging functionality with log levels (debug, info, warn, error)
  - Implement location-aware logging with file path and line number tracking
  - Add structured message formatting with consistent timestamp and metadata
  - Include cryptographic utilities for log integrity (hashing, signature verification)
  - Add serialization utilities for complex data types
  - Reorganize project structure with dedicated core, utils, and types modules
  - Remove CommonJS support, ES6 modules only
  - Modernize test suite with Vitest best practices
