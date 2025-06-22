import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,          // ✅ allow external access in dev (not needed for Render)
    strictPort: true,
  },
  preview: {
    host: true,          // ✅ needed if you use `vite preview` (but not used on Render)
    port: 4173,          // ✅ default Vite preview port
    allowedHosts: ['mern-task-manager-1-1m3r.onrender.com'], // ✅ your frontend Render URL
  },
  build: {
    outDir: 'dist',       // ✅ default is 'dist', keep this unless changed
  },
});
