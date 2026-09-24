import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Ensures nobody can view your original JSX source files in DevTools
    minify: 'esbuild', // Minifies and mangles function and variable names into unreadable code
  },
})