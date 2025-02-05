import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/OmarAglan.github.io/',
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: [],
    exclude: []
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      }
    }
  },
  server: {
    headers: {
      "Cache-Control": "no-store",
    },
    watch: {
      usePolling: true
    },
    hmr: {
      overlay: true
    }
  },
  assetsInclude: ['**/*.md']
});
