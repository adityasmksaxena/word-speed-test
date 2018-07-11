module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    indent: [2, 2, {'SwitchCase': 1}],
    camelcase: 1,
    'no-console': 1,
    'max-len': [1, 120, 2],
    'react/jsx-filename-extension': 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight", "to" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    'no-underscore-dangle': 0,
    'arrow-parens': [2, 'as-needed'],
    'consistent-return': 0,
    'function-paren-newline': [2, 'consistent'],
    'no-absolute-path': {'esmodule': false},
    'no-unused-vars': [2, {
      vars: 'local',
      args: 'none'
    }],
    'no-trailing-spaces': [2, { 'skipBlankLines': true }],
    "semi": [1, "always"],
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'object-curly-newline': [2, { multiline: true, consistent: true}],
  }
};