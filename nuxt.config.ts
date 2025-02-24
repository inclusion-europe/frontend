// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
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
  }
})