const webpack = require('webpack');

const normalConfig = require('./webpack.config');

exports = module.exports = Object.create(normalConfig);
exports.plugins = (normalConfig.plugins || []).slice();
exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
