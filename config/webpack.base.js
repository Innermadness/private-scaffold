const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const DIST_PATH = path.resolve(__dirname, '../dist');
const SRC_PATH = path.resolve(__dirname, '../src');
const MODULES_PATH = path.resolve(__dirname, '../node_modules');

const browsersList = [
  '>1%',
  'last 4 versions',
  'Firefox ESR',
  'not ie < 9',
];

module.exports = {
  entry: {
    app: './src/index.js',
  },
  resolve: {
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      '@': SRC_PATH,
    },
    modules: [
      MODULES_PATH,
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: SRC_PATH,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            'react',
            [
              'env',
              {
                targets: {
                  browsers: browsersList,
                },
                modules: false,
              },
            ],
          ],
          plugins: ['babel-plugin-transform-runtime', 'babel-plugin-syntax-dynamic-import'],
        },
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: true,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 2,
                camelCase: true,
                modules: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    browsers: browsersList,
                  }),
                ],
              },
            },
            {
              loader: require.resolve('less-loader'),
            },
          ],
        }),
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
              publicPath: '../images',
            },
          },
        ],
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
              publicPath: '../fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './template.html',
    }),
    new ExtractTextWebpackPlugin({
      filename: 'static/styles/index.css',
    }),
    new CleanWebpackPlugin(['../dist/*'], { allowExternal: true }),
  ],
  output: {
    filename: 'static/js/bundle.js',
    path: DIST_PATH,
  },
};
