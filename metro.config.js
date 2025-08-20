const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts = [...config.resolver.assetExts, 'ttf', 'otf'];

// Optimize bundle size and performance
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Enable optimizations for better performance
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Optimize resolver for faster builds
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Watchman configuration for better file watching
config.watchFolders = [];

// Optimize for production builds
if (process.env.NODE_ENV === 'production') {
  config.transformer.minifierPath = require.resolve('metro-minify-terser');
  config.transformer.minifierConfig = {
    ...config.transformer.minifierConfig,
    ecma: 2017,
    keep_fnames: false,
    mangle: {
      keep_fnames: false,
    },
  };
}

module.exports = config;
