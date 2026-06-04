import { defineConfig } from 'vite'

export default defineConfig({
    base: '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                graduacion: 'graduacion.html',
                bodas: 'bodas.html',
                personalizacion: 'personalizacion.html',
                extranjera: 'extranjera.html',
                nacionales: 'nacionales.html',
            },
        },
    },
})
