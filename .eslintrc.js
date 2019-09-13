module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "global-require": "off",
    "import/prefer-default-export": "off",
    "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
    "no-param-reassign": "off",
    "jsx-a11y/media-has-caption": "off",
    "react/prop-types": "off",
    "no-restricted-globals": "off",
    "radix": "off",
    "no-underscore-dangle": "off",
    "no-console": "off",
    "prefer-destructuring": "off",
  }
};
