import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use root path for local development and Netlify
  // For GitHub Pages deployment, set base: '/S4S/'
  base: process.env.GITHUB_PAGES === 'true' ? '/S4S/' : '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
