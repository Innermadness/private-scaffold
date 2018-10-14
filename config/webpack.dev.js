// webpack-merge 这里只是用了它来混合base的配置，还有更多的API
const merge = require('webpack-merge');
// const autoprefixer = require('autoprefixer');
// const { BROWERS_LIST } = require('./constants.js');
const baseWebpackConfig = require('./webpack.base.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      // 开发中使用最新版chrome，几乎可以忽略js的兼容性，为提高开发效率可禁用babel相关配置
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            '@babel/preset-react'
            // '@babel/preset-env', // 比如它
          ],
          plugins: [
            // '@babel/plugin-transform-runtime', // 比如它
            '@babel/plugin-syntax-dynamic-import',
            'react-hot-loader/babel'
          ]
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          // 开发中为确保样式也能热更新，因此不能将样式单独剥离，使用style-loader
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2,
              camelCase: true,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          // 样式兼容仍然建议在开发模式中和线上的同步，css不比js，容易有疏忽的。如果要严谨些，应该和production同步
          // {
          //   loader: require.resolve('postcss-loader'),
          //   options: {
          //     ident: 'postcss',
          //     plugins: () => [
          //       autoprefixer({
          //         browsers: BROWERS_LIST
          //       })
          //     ]
          //   }
          // },
          {
            loader: require.resolve('less-loader')
          }
        ]
      }
    ]
  },
  // development阶段需要一个devServer
  devServer: {
    compress: true, // g-zip
    port: 3000, // localhost端口号，默认8080
    clientLogLevel: 'error', // 屏蔽一些webpack打印的log信息，一般是start/reload页面完成前打印的，比如favicon。
    overlay: true // 构建错误会以浮层的形式遮盖在页面上
  }
});
