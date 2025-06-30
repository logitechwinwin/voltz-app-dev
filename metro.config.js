const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    enableBabelRCLookup: false,
    enableBabelRuntime: false,
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  server: {
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        res.setHeader('X-Fast-Refresh', '1');
        return middleware(req, res, next);
      };
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);