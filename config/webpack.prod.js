// webpack-merge 这里只是用了它来混合base的配置，还有更多的API
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ],
    namedChunks: true,
    splitChunks: {
      chunks: 'all'
    }
  }
});
