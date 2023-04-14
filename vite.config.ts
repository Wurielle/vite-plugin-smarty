import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
const name = 'main'
export default defineConfig({
    plugins: [
        vue(),
    ],
})
