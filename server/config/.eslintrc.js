module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
    describe: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-unused-vars": ["error", { "args": "after-used" }],
    "no-use-before-define": ["error", { "functions": false }]
  },
};
