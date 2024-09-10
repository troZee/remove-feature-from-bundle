# Removing features from a react native app

## Introduction

In modern mobile app development, optimizing the size of the final bundle based on feature flags is crucial for delivering a fast and efficient user experience. React Native, a popular framework for building cross-platform mobile apps, leverages **Metro Bundler** and **Terser** to achieve this optimization. This guide delves into how these tools work in tandem to remove unused code based on environment variables, ensuring the final bundle includes only the necessary features.

## Understanding Metro Bundler

Metro Bundler serves as the default JavaScript bundler for React Native. It aggregates all JavaScript code and assets into a single bundle for app loading. Key features include:

- **Hot Reloading**: Allows for real-time code changes without a full reload.
- **Fast Refresh**: Updates the UI instantly upon code changes.
- **Source Maps**: Facilitates debugging by mapping minified code back to its original source.

Metro's role extends to preparing code for production through minification and tree shaking.

## Introduction to Terser

Terser is a JavaScript toolkit for parsing, mangling, and compressing code, crucial for:

- **Minification**: Strips unnecessary characters to reduce file size.
- **Mangling**: Renames variables and functions to shorter versions.
- **Dead Code Elimination**: Removes unreachable or unused code.

By integrating Terser with Metro, React Native optimizes the bundle for size and performance.

## Leveraging Environment Variables

Environment variables, particularly `process.env`, dictate the build type (development or production). This distinction allows for tailored optimizations:

- In production, aggressive minification and code elimination are employed.

### Example: Conditional Code Removal

```javascript
if (__DEV__) {
  console.log('This is a development build.');
} else {
  console.log('This is a production build.');
}
```

In production, Terser removes the `__DEV__` block since `__DEV__` is set to `false`.

## Metro Configuration for Feature Flags

This configuration file sets up Metro to manage feature flags via environment variables:

1. **Environment Setup**:

   ```javascript
   require('dotenv').config();
   const path = require('path');
   ```

   Loads environment variables from `.env` and imports the `path` module.

2. **Custom Block List**:

   ```javascript
   const blockCustomExts = [];
   if (process.env.FEATURE_A === 'false') {
     blockCustomExts.push(new RegExp('.+.featurea'));
   }
   if (process.env.FEATURE_B === 'false') {
     blockCustomExts.push(new RegExp('.+.featureb'));
   }
   ```

   This dynamically creates a block list based on feature flags, allowing for feature toggling.

3. **Custom Configuration**:

   ```javascript
   const config = {
     resolver: {
       resolveRequest: MetroSymlinksResolver(),
       assetExts: assetExts,
       sourceExts: sourceExts,
       blockList: [blockList, ...blockCustomExts],
     },
   };
   ```

   Combines default settings with custom block lists for feature-specific builds.

4. **Merge Configuration**:

   ```javascript
   module.exports = mergeConfig(defaultConfig, config);
   ```

   Merges custom settings with default configurations.

## Testing Your App

- Duplicate `.env.example` to `.env`.
- Modify flags in `.env` as needed.
- Run the app with `yarn start --reset-cache` followed by `yarn android` or `yarn ios`.

This setup allows for dynamic feature inclusion, enhancing app performance and user experience by tailoring the build to specific needs or environments.
