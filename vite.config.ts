import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import { smartyServerPlugin } from './dist/main.modern'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
const name = 'main'
export default defineConfig({
    plugins: [
        dts(),
        vue(),
    ],
})
