export default defineNuxtConfig({
    nitro: {
        serverAssets: [
            { baseName: 'templates', dir: './assets/templates' },
            { baseName: 'fonts', dir: './assets/fonts' },
            { baseName: 'images', dir: './assets/images' },
        ],
    },
    modules: [
      '@nuxt/eslint',
      '@nuxt/test-utils',
      '@nuxt/ui',
      '@pinia/nuxt',
    ],

    css: [
        '~/assets/css/main.css',
    ],

    compatibilityDate: '2025-07-15',

    devtools: {
        enabled: true
    },
})