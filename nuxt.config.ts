export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  pages: true,

  app: {
      pageTransition: {
          name: 'page',
          mode: 'out-in'
      }
  },

  runtimeConfig: {
    lastFMKey: process.env.NUXT_LASTFM_KEY,
    lastFMUser: process.env.NUXT_LASTFM_USER,
    lastFMURL: process.env.NUXT_LASTFM_URL,
    apiKey: process.env.NUXT_API_KEY,
  },

  experimental: {
      componentIslands: true,
  },

  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      'nuxt-schema-org',
      "@nuxt/image",
      "nuxt-api-shield",
      "@nuxt/icon",
      "@nuxt/content"
  ],

  nuxtApiShield: {
      limit: {
          max: 12,
          duration: 108,
          ban: 2629800000, //one month ban LMAO
      },
      delayOnBan: true,
      errorMessage: "Politely, fuck off. Thanks :)",
  },

  content: {
      build: {
          markdown: {
            highlight: {
                theme: 'catppuccin-frappe',
                langs: ['javascript', 'typescript', 'json', 'html', 'css', 'scss', 'xml', 'yaml', 'markdown', 'nginx', 'shell', 'bash', 'dockerfile', 'jsonc', 'js', 'ts', 'jsx', 'tsx'],
            }
          }
      }
    },

  schemaOrg: {
      defaults: false,
  },

  site: {
      trailingSlash: true,
      name: 'MotorTruck1221',
      url: 'https://motortruck1221.com/' 
  },

  icon: {
      componentName: 'NuxtIcon',
      serverBundle: {
          collections: ['cib']
      }
  },

  tailwindcss: {
      viewer: true,
  },

  nitro: {
      prerender: {
          crawlLinks: true,
          routes: ['/sitemap.xml'],
      },
      preset: "node-cluster",
      storage: {
          "shield": {
              driver: "fs",
              base: './data/bannedDB'
          }
      }
  },

  css: [
      '@fortawesome/fontawesome-svg-core/styles.css',
      'vue-toast-notification/dist/theme-default.css'
  ],

  build: {
      transpile: [
          "@fortawesome/fontawesome-svg-core",
          "@fortawesome/free-brands-svg-icons",
          "@fortawesome/vue-fontawesome",
          "@fortawesome/free-solid-svg-icons"
      ],
  },

  compatibilityDate: '2025-03-16',
})
