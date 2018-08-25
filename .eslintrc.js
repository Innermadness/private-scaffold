module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    jsx: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'no-console': 'off',
    'arrow-parens': 'off',
    'linebreak-style': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
};
