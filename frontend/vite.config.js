import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/Cristian/Downloads/ffronted/ffronted/frontend/certs/localhost-key.pem'), // Ruta a tu clave privada
      cert: fs.readFileSync('C:/Users/Cristian/Downloads/ffronted/ffronted/frontend/certs/localhost.pem') // Ruta a tu certificado
    },
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