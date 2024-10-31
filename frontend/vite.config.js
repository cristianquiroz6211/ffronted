import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/general/api/v1': {
        target: 'http://localhost:8080', // Asegúrate de que esta URL sea correcta
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/general\/api\/v1/, '') // Esto reescribe la URL
      }
    }
  }
})