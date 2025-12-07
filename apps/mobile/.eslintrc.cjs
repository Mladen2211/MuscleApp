module.exports = {
  root: false,
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  env: {
    es2022: true
  },
  ignorePatterns: ['node_modules', 'dist']
};
