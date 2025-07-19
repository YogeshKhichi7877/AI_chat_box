import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/AI_chat_box/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
