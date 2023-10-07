module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  globals: {
    logger: true,
    io: true,
  },
  extends: ['plugin:react/recommended'],
  rules: {
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
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['time', 'timeEnd', 'timeLog'] }],
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': [0, { js: 'always' }],

    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: { 'import/resolver': { node: { extensions: ['.js', '.jsx'] } } },
};
