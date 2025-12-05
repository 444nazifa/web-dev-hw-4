import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // *** ADD THIS LINE ***
  base: '/Web-Dev-HW3/', 
  // *********************
  plugins: [react()],
})