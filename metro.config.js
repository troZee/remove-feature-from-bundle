require('dotenv').config();

const path = require('path');

const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, blockList, sourceExts} = defaultConfig.resolver;

const blockCustomExts = [];

if (process.env.FEATURE_A === 'false') {
  blockCustomExts.push(new RegExp('.+.featurea'));
}
if (process.env.FEATURE_B === 'false') {
  blockCustomExts.push(new RegExp('.+.featureb'));
}

/**
 *  type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: MetroSymlinksResolver(),
    assetExts: assetExts,
    sourceExts: sourceExts,
    blockList: [blockList, ...blockCustomExts],
  },
};

module.exports = mergeConfig(defaultConfig, config);
