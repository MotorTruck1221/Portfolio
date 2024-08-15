export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  pages: true,

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
      "@nuxt/content",
      '@nuxtjs/tailwindcss',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      'nuxt-schema-org',
      "@nuxt/image",
      "nuxt-api-shield"
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
      highlight: {
          theme: 'catppuccin-frappe',
          langs: ['javascript', 'typescript', 'json', 'html', 'css', 'scss', 'xml', 'yaml', 'markdown', 'nginx', 'shell', 'bash', 'dockerfile', 'jsonc'],
        },
        navigation: {
            fields: ['title', 'description', 'series' ],
        },
        experimental: {
            search: {
                indexed: true,
            },
        },
    },

  schemaOrg: {
      defaults: false,
  },
  site: {
      trailingSlash: true,
      name: 'MotorTruck1221',
      url: 'https://motortruck1221.com/' 
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
  ],
  image: {
      domains: ['lastfm.freetls.fastly.net']
  },
  build: {
      transpile: [
          "@fortawesome/fontawesome-svg-core",
          "@fortawesome/free-brands-svg-icons",
          "@fortawesome/vue-fontawesome",
      ],
  },
  compatibilityDate: '2024-07-28',
})
