import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/', // Since we're using a custom domain (omardev.engineer)
  optimizeDeps: {
    include: [],
    exclude: []
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          syntax: ['react-syntax-highlighter'],
        },
        // Ensure consistent file naming for better caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Optimize for production
    minify: 'terser',
    cssMinify: true,
    // Generate manifest for better caching
    manifest: true
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
  assetsInclude: ['**/*.md'],
  // Ensure proper handling of React Router for SPA
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  }
});
