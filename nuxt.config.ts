// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      imClientId: '1234',
      imAuthServer: '/authorize',
      noauth: 'false',
      notlive: 'false',
      backendUrl: '/',
      indicatorsYears: '2023,2024',
      defaultTitle: 'Inclusion Europe',
      nwsltrFormAction: '/newsletter',
    }
  },
  // Essential for OpenGraph tags on dynamic pages
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Inclusion Europe' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@inclusioneurope' }
      ]
    }
  }
})