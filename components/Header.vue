<script lang="ts" setup>
    const route = useRoute()
</script>
<template>
    <div class="bg-cat-crust p-2 h-12 text-cat-text flex flex-row justify-between items-center">
        <h1 class="text-2xl font-bold">MotorTruck1221</h1>
        <div class="hidden md:flex flex-row justify-right items-center gap-4">
            <NuxtLink to="/" :class="route.path === '/' ? 'text-cat-pink' : ''" class="text-lg font-semibold">Home</NuxtLink>
            <NuxtLink to="/projects" :class="route.path === '/projects' ? 'text-cat-pink' : ''" class="text-lg font-semibold">Projects</NuxtLink>
            <NuxtLink to="/blog" :class="route.path === '/blog' ? 'text-cat-pink' : ''" class="text-lg mr-2 font-semibold">Blog</NuxtLink>
        </div>
    </div>
</template>
