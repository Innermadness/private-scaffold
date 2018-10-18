const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
const { DIST_PATH } = require('./constants.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // development阶段需要一个devServer
  devServer: {
    compress: true, // g-zip
    port: 3000, // localhost端口号，默认8080
    clientLogLevel: 'error', // 屏蔽一些webpack打印的log信息，一般是start/reload页面完成前打印的，比如favicon。
    overlay: true, // 构建错误会以浮层的形式遮盖在页面上
    hot: true
  },
  output: {
    filename: 'static/js/[name].[hash:5].js',
    path: DIST_PATH
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
