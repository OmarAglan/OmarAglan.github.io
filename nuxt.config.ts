// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  site: { url: '', name: 'Omar Aglan' },
  app: {
    buildAssetsDir: 'assets',
  },
  ssr: false, // Disable server-side rendering for static site generation
  modules: ['@nuxtjs/i18n', ['@nuxtjs/google-fonts', {
    families: {
      Rubik: [400, 700],
    }
  }], '@nuxtjs/sitemap'],
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'en', iso: 'en-US', dir: 'ltr', file: 'en.json' },
      { code: 'ar', iso: 'ar-SA', dir: 'rtl', file: 'ar.json' }
    ],
    lazy: true,
    defaultLocale: 'en',
  },
})