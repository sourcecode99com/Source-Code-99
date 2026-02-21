import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite configuration for React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
  }
});
