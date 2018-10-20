// webpack-merge 这里只是用了它来混合base的配置，还有更多的API
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseWebpackConfig = require('./webpack.base.js');
const { DIST_PATH } = require('./constants.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    namedChunks: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/styles/index.css'
    }),
    new CleanWebpackPlugin(['../dist/*'], { allowExternal: true }),
    new BundleAnalyzerPlugin()
  ],
  output: {
    filename: 'static/js/[name].[chunkhash:5].js',
    path: DIST_PATH
  }
});
