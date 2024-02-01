<script lang="ts" setup>
    import '~/assets/overwrites.scss';
    useHead({
        titleTemplate: (name) => {return name ? `${name} - MotorTruck1221` : 'MotorTruck1221'},
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'MotorTruck1221\'s personal website. And Blog.'},
            {name: 'format-detection', content: 'telephone=no'},
            {name: 'msapplication-TileColor', content: '#000000'},
            {name: 'theme-color', content: '#000000'},
        ],
        link: [
            {rel: 'icon', type: 'image/x-png', href: '/logo.png'},
        ],
    })
    const needBg = ref(true);
    const particlesLoaded = (container?: Container) => {
        needBg.value = false;
    }
</script>
<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex-1" :class="needBg ? 'bg-cat-base' : ''">
            <client-only>
                <vue-particles id="tsparticles" url="/mainParticles.json" @particles-loaded="particlesLoaded" />
            </client-only>
            <main class="h-full w-full">
                <slot />
            </main>
        </div>
    </div>
</template>
