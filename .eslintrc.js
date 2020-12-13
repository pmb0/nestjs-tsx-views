module.exports = {
  extends: ['@heise'],
  rules: {
    'node/no-missing-import': 'off',
    'unicorn/import-style': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
  env: {
    node: true,
  }
}
