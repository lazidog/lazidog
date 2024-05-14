{
  /** @type {import('eslint').Linter.Config} */
  module.exports = {
    extends: [
      '@root/style-code/eslint/base',
      '@root/style-code/eslint/next',
    ].map(require.resolve),
    ignorePatterns: ['src/gql'],
  };
}
