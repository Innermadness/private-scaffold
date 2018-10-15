const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  SRC_PATH,
  BROWSERS_LIST_MAP,
  MODULES_PATH,
  DIST_PATH
} = require('./constants.js');

const ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    app: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': SRC_PATH
    },
    modules: [
      MODULES_PATH,
      'node_modules'
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: MODULES_PATH,
        include: SRC_PATH,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ]
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            exclude: MODULES_PATH,
            include: SRC_PATH,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: BROWSERS_LIST_MAP[ENV]
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
              // 考虑到样式热更新问题，dev时不剥离css。
              {
                loader: ENV === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader
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
                      browsers: BROWSERS_LIST_MAP[ENV]
                    })
                  ]
                }
              },
              {
                loader: require.resolve('less-loader')
              }
            ]
          },
          {
            test: /\.(bmp|png|jpe?g|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: '[name].[hash:6].[ext]',
                  outputPath: 'static/images/',
                  publicPath: '../images'
                }
              }
            ]
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: '[name].[hash:6].[ext]',
                  outputPath: 'static/fonts/',
                  publicPath: '../fonts'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html'
    })
  ],
  output: {
    filename: 'static/js/bundle.js',
    path: DIST_PATH
  }
};
