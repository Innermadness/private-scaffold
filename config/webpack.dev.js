// webpack-merge 这里只是用了它来混合base的配置，还有更多的API
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
});
