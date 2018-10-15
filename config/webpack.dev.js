// webpack-merge 这里只是用了它来混合base的配置，还有更多的API
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    minimize: true
  },
  // development阶段需要一个devServer
  devServer: {
    compress: true, // g-zip
    port: 3000, // localhost端口号，默认8080
    clientLogLevel: 'error', // 屏蔽一些webpack打印的log信息，一般是start/reload页面完成前打印的，比如favicon。
    overlay: true // 构建错误会以浮层的形式遮盖在页面上
  }
});
