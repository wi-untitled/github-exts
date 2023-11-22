import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// TODO: makes dedicated enrties for popup and content script
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
