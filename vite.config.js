import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/e7sebli/',
  plugins: [react()],

  build: {
    // ── Output ──────────────────────────────────────────────
    outDir: 'dist',
    emptyOutDir: true,

    // ── Minification ────────────────────────────────────────
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
      },
      mangle: { toplevel: true },
      format: { comments: false },
    },

    // ── Assets ──────────────────────────────────────────────
    assetsInlineLimit: 4096, // inline assets < 4 kB as base64

    // ── CSS ─────────────────────────────────────────────────
    cssMinify: true,
    cssCodeSplit: true,

    // ── Chunks ──────────────────────────────────────────────
    rollupOptions: {
      output: {
        // Split vendor libraries into a separate chunk for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer'
            }
            if (id.includes('lucide')) {
              return 'vendor-lucide'
            }
            return 'vendor'
          }
        },
        // Clean file names
        chunkFileNames:  'assets/[name]-[hash].js',
        entryFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },

    // ── Source maps (off in production) ─────────────────────
    sourcemap: false,

    // ── Target (Android WebView supports ES2015+) ────────────
    target: ['es2015', 'chrome87'],
  },
})
