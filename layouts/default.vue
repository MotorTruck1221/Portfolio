<script lang="ts" setup>
    import '~/assets/overwrites.scss';
    useHead({
        titleTemplate: (name) => {return name ? `${name} - MotorTruck1221` : 'MotorTruck1221'},
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
