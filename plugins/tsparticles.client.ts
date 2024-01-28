import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';
import { defineNuxtPlugin } from '#app';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Particles, {
        init: async (engine) => {
            await loadSlim(engine);
        }
    })
})
