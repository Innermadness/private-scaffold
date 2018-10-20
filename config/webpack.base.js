const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {
  SRC_PATH,
  BROWSERS_LIST_MAP,
  MODULES_PATH
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
  // dev时，千万不要optimization.minimize = true;
  // 原本几百毫秒的更新，会变成几秒！
  optimization: {
    // 开启代码分割，all会将所有公共依赖，各个异步引入的模块分别打包成额外的js（满足一定条件）。
    // 公共依赖通常代码变动较少（版本更新才会有变动），会打包进vendor中。
    // 浏览器访问线上页面时，这部分可以优先使用缓存。
    splitChunks: {
      chunks: 'all'
    },
    // 启用runtimeChunk，webpack还有一段关于模块执行的代码，同样变动较少
    // 开启后将单独提出一份js，也有利于浏览器缓存。
    runtimeChunk: {
      name: 'runtime'
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
            loader: 'babel-loader?cacheDirectory=true', // 启用缓存，加速编译
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
                'react-hot-loader/babel' // react专用的热更新包
              ]
            }
          },
          {
            test: /\.(less|css)$/,
            use: [
              // 考虑到样式热更新问题，dev时不剥离css。
              {
                loader: ENV === 'development'
                  ? require.resolve('style-loader')
                  : MiniCssExtractPlugin.loader
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
    }),
    new ProgressBarPlugin(),
    new ManifestPlugin()
  ]
};
