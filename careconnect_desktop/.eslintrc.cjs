/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  settings: {
    react: { version: 'detect' },
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  overrides: [
    {
      files: ['src/main/**/*.ts', 'src/main/**/*.tsx'],
      env: { node: true, browser: false },
    },
    {
      files: ['src/renderer/**/*.ts', 'src/renderer/**/*.tsx'],
      env: { browser: true, node: false },
    },
  ],
  ignorePatterns: ['dist-main', 'dist-renderer', 'node_modules', 'release'],
};
