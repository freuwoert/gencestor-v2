// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/test-utils',
        '@nuxt/ui',
    ],
    css: ['~/assets/css/main.css'],
    compatibilityDate: '2025-07-15',
    devtools: {
        enabled: true
    },
})