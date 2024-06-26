// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  pages: true,
  modules: [
      "@nuxt/content", 
      '@nuxtjs/tailwindcss',
      '@nuxtjs/robots',
      '@nuxtjs/sitemap',
      'nuxt-schema-org',
  ],
  content: {
      highlight: {
          theme: 'catppuccin-frappe',
          langs: ['javascript', 'typescript', 'json', 'html', 'css', 'scss', 'xml', 'yaml', 'markdown', 'nginx', 'shell', 'bash', 'dockerfile'],
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
        default: false,
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
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
    ],
    build: {
        transpile: [
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-brands-svg-icons",
            "@fortawesome/vue-fontawesome",
        ],
    },
})
