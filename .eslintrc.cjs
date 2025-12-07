module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  ignorePatterns: ['**/dist/**', '**/build/**', '**/.next/**', '**/.expo/**'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: null
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended']
    }
  ]
};
