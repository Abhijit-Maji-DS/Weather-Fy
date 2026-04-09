# React + JavaScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react
 uses Babel
 (or oxc
 when used in rolldown-vite
) for Fast Refresh
@vitejs/plugin-react-swc
 uses SWC
 for Fast Refresh
React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see this documentation:
https://react.dev/learn/react-compiler/installation

Expanding the ESLint configuration

If you are developing a production application, you can update the configuration to enable stricter lint rules for JavaScript:

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      // Other configs...

      // Recommended JS rules
      'eslint:recommended',

      // Other configs...
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
])

You can also install eslint-plugin-react-x and eslint-plugin-react-dom for React-specific lint rules:

// eslint.config.js
import { defineConfig } from 'eslint/config'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      // Recommended JS rules
      'eslint:recommended',

      // Enable lint rules for React
      reactX.configs.recommended,

      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
])
