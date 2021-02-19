module.exports = {
  env: {
    browser: true,
    es6: true,
    node:true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    '../../.eslintrc.js'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
};
