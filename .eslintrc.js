module.exports = {
  'env': {
    'node': true,
    'es2020': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  'globals': {
    'task': 'readonly',
  },
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'no-console': [
      'off',
    ],
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'no-trailing-spaces': [
      'error',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'no-var': [
      'error',
    ],
    'comma-dangle': [
      'error',
      {
        'objects': 'always-multiline',
        'arrays': 'always-multiline',
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'key-spacing': [
      'error',
      {
        'afterColon': true,
        'mode': 'minimum',
      },
    ],
  },
};
