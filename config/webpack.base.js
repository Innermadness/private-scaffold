const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SRC_PATH, MODULES_PATH, DIST_PATH } = require('./constants.js');

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
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint')
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: SRC_PATH
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
