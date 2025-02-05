import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdPlugin from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    base:'OmarAglan.github.io',
    mdPlugin.plugin({
      mode: ['html', 'raw']
    })
  ],
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
  },
  assetsInclude: ['**/*.md']
});
