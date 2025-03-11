<script lang="ts" setup>
    const route = useRoute()
</script>
<template>
    <div class="bg-cat-crust p-2 h-12 text-cat-text flex flex-row justify-between items-center">
        <NuxtLink to="/" class="hidden md:block text-2xl font-bold">MotorTruck1221</NuxtLink>
        <div class="flex flex-row justify-right items-center gap-2 md:gap-4">
            <NuxtLink to="/" :class="route.path === '/' ? 'text-cat-pink' : ''" class="text-md md:text-lg hover:text-cat-sapphire font-semibold">Home</NuxtLink>
            <NuxtLink to="/projects" :class="route.path === '/projects' ? 'text-cat-pink' : ''" class="text-md md:text-lg hover:text-cat-sapphire font-semibold">Projects</NuxtLink>
            <NuxtLink to="/contact" :class="route.path === '/contact' ? 'text-cat-pink' : ''" class="text-md md:text-lg hover:text-cat-sapphire font-semibold">Contact</NuxtLink>
            <NuxtLink to="/blog" :class="route.path === `/blog/${route.params.slug}` ? 'text-cat-pink' : '' || route.path === '/blog' ? 'text-cat-pink' : ''" class="text-md md:text-lg mr-2 hover:text-cat-sapphire font-semibold">Blog</NuxtLink>
        </div>
    </div>
</template>
