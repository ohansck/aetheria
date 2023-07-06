// vite.config.js
//import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: '/index.html',
                pages: '/12-weeks-of-aws.html',
            },
        },

    },

})