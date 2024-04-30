module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true, 'cypress/globals': true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended', 'airbnb', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  plugins: ['react-refresh', 'cypress'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'only-multiline'],
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
