<script lang="ts" setup>
    import type { NuxtError } from '#app';

    const props = defineProps({
        error: Object as () => NuxtError
    });

    useHead({
        title: 'Error!'
    });
</script>
<template>
    <div>
        <NuxtLayout>
            <div class="flex h-full p-4 justify-center items-center">
                <div class="flex flex-col bg-cat-crust justify-center items-center h-full w-full md:w-1/2 gap-4 overflow-hidden text-wrap break-words opacity-90 rounded-md">
                    <h1 class="text-4xl font-bold text-cat-pink">Error {{ error.statusCode }}</h1>
                    <p class="text-lg text-cat-pink">{{ error.message }}</p>
                    <NuxtLink to="/" class="text-lg text-cat-pink border-2 border-cat-pink p-4 hover:bg-cat-pink hover:text-cat-crust transition-all duration-300 ease-in-out rounded-md">Go Back Home</NuxtLink>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>
