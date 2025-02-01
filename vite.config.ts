import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@splinetool/runtime', '@splinetool/react-spline'],
    exclude: []
  },
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/@splinetool\/*/]
    },
    rollupOptions: {
      output: {
        manualChunks: undefined
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
  }
});
