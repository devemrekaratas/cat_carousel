// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-vuefire', '@pinia/nuxt','pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/css/main.css'],
  ssr:false,
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: import.meta.env.VUE_FIRE_API_KEY, 
      authDomain: import.meta.env.VUE_FIRE_AUTH_DOMAIN,
      projectId: import.meta.env.VUE_FIRE_PROJECT_ID,
      storageBucket: import.meta.env.VUE_FIRE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VUE_FIRE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VUE_FIRE_APP_ID,
    }
  },
  runtimeConfig: {
    catApiKey: import.meta.env.CAT_API_KEY,
    proxyUrl: import.meta.env.PROXY_URL,

  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})