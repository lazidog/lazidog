{
  /** @type {import('eslint').Linter.Config} */
  module.exports = {
    extends: [
      '@lazidog/style-code/eslint/base',
      '@lazidog/style-code/eslint/next',
    ].map(require.resolve),
    ignorePatterns: ['src/gql'],
  };
}
