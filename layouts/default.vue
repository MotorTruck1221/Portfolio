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
            {hid: 'og:image', property: 'og:image', content: 'https://motortruck1221.com/logo.png'},
            {hid: 'twitter:image', name: 'twitter:image', content: 'https://motortruck1221.com/logo.png'},
            {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
            {hid: 'twitter:site', name: 'twitter:site', content: '@motortruck1221'},
            {hid: 'twitter:creator', name: 'twitter:creator', content: '@motortruck1221'},
            {hid: 'og:title', property: 'og:title', content: 'MotorTruck1221'},
            {hid: 'og:site_name', property: 'og:site_name', content: 'MotorTruck1221'},
            {hid: 'og:description', property: 'og:description', content: 'MotorTruck1221\'s personal website. And Blog.'},
            {hid: 'og:url', property: 'og:url', content: 'https://motortruck1221.com'},
            {hid: 'og:type', property: 'og:type', content: 'website'},
        ],
        link: [
            {rel: 'icon', type: 'image/x-png', href: '/logo.png'},
        ],
    })
    useSchemaOrg([
        defineWebPage({
            '@type': 'ProfilePage',
            mainEntity: {
                '@type': 'Person',
                name: 'MotorTruck1221',
                additionalName: 'MotorTruck',
                description: 'Fullstack Developer',
                jobTitle: 'Developer',
                image: 'https://motortruck1221.com/logo.png',
                url: 'https://motortruck1221.com',
                sameAs: [
                    'https://github.com/motortruck1221/',
                    'https://gitlab.com/motortruck1221/',
                    'https://twitter.com/motortruck1221/',
                    'https://discord.com/users/818995901791207454/',
                ],
                worksFor: [
                    {
                        '@type': 'Organization',
                        name: 'Ruby Network',
                        url: 'https://ruby.rubynetwork.co',
                    },
                    {
                        '@type': 'Organization',
                        name: 'Nebula Services',
                        url: 'https://nebulaproxy.io',
                    },
                ],
                isPartOf: [
                    {
                        '@type': 'Website',
                        name: 'MotorTruck1221',
                        url: 'https://motortruck1221.com',
                    },
                    {
                        '@type': 'Organization',
                        name: 'Ruby Network',
                        url: 'https://ruby.rubynetwork.co',
                    },
                    {
                        '@type': 'Organization',
                        name: 'Nebula Services',
                        url: 'https://nebulaproxy.io',
                    },
                    {
                        '@type': 'Organization',
                        name: 'Mercury Workshop',
                        url: 'https://mercurywork.shop',
                    },
                ],
            },
        }),
    ])
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
