const path = require('path');

module.exports = {
  BROWSERS_LIST_MAP: {
    production: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9'
    ],
    development: [
      'last 2 Chrome versions'
    ]
  },
  DIST_PATH: path.resolve(__dirname, '../dist'),
  SRC_PATH: path.resolve(__dirname, '../src'),
  MODULES_PATH: path.resolve(__dirname, '../node_modules')
};
