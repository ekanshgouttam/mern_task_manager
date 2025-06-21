import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: ['mern-task-manager-1-1m3r.onrender.com'], // ✅ Add your Render frontend domain
  },
});
