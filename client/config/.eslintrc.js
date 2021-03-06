module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  root: true,
  extends: [
    'airbnb',
    "prettier",
    "prettier/react"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    it: 'readonly',
    describe: 'readonly',
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
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true, // allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise
        "allowTemplateLiterals": true // allows strings to use backticks
      }
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0,
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prefer-stateless-function": 0,
    "no-param-reassign":0,
    "import/no-cycle": 0,
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
      }
    ],
    'jsx-a11y/no-static-element-interactions': 0
  },
};
