const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    'import/order': 'error',
    'no-eval': 1,
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-unreachable': 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', args: 'none' }],
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-implicit-globals': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: false },
      },
      { enforceForRenamedProperties: false },
    ],
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': ['error', { functions: false }],
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'object-curly-newline': [
      'error',
      { ExportDeclaration: { multiline: true, minProperties: 4 } },
    ],
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['time', 'timeEnd', 'timeLog'] }],
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': [0, { js: 'always' }],
  },
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  globals: {
    logger: true,
    io: true,
  },
};
