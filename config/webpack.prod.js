// webpack-merge 这里只是用了它来混合base的配置，还有更多的API
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const baseWebpackConfig = require('./webpack.base.js');
const { BROWERS_LIST } = require('./constants.js');

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
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    namedChunks: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: BROWERS_LIST
                },
                modules: false
              }
            ]
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            'react-hot-loader/babel' // production下插件内部逻辑禁用，页面有引用，因此不能删除
          ]
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          // 上线版本样式要剥离，使用mini-css-extract-plugin提供的loader
          {
            loader: MiniCssExtractPlugin.loader
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
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: BROWERS_LIST
                })
              ]
            }
          },
          {
            loader: require.resolve('less-loader')
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/styles/index.css'
    }),
    new CleanWebpackPlugin(['../dist/*'], { allowExternal: true })
  ]
});
