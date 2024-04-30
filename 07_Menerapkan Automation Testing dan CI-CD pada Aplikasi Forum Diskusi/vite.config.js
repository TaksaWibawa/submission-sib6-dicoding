/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    testMatch: ['**/__tests__/**/*.test.js'],
    environment: 'jsdom',
    testTimeout: 10000,
  },
});
