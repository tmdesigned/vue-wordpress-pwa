module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-prototype-builtins": "off",
     "vue/multi-word-component-names": "off"
  },
  parserOptions: {
    "requireConfigFile": false,
    "ecmaVersion": 2020,
    "sourceType": "module"  },
  overrides: [
    {
      files: ['tests/unit/**/*.spec.js'],
      env: { jest: true }
    }
  ]
}