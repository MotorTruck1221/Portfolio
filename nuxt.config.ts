// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  pages: true,
  modules: ["@nuxt/content", '@nuxtjs/tailwindcss'],
  content: {
      highlight: {
          theme: 'github-light'
        }
    },
    tailwindcss: {
        viewer: true,
    },
    nitro: {
        preset: "static",
    },
})
