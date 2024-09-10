require('dotenv').config();

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
// eslint-disable-next-line import/no-extraneous-dependencies
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, blockList, sourceExts} = defaultConfig.resolver;

const blockCustomExts = [];

console.log(`🚀🚀🚀🚀🚀🚀🚀🚀 `, process.env.FEATURE_A);

if (process.env.FEATURE_A === 'false') {
  blockCustomExts.push(new RegExp(`.+.featurea`));
}
if (process.env.FEATURE_B === 'false') {
  blockCustomExts.push(new RegExp(`.+.featureb`));
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
