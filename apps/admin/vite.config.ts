import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@homebridge/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
  server: { port: 3002, proxy: { '/v1': 'http://localhost:3001' } },
});
