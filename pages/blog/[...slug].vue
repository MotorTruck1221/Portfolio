<script lang="ts" setup>
    const route = useRoute()
</script>
<template>
    <div class="text-cat-text p-4 w-full h-full flex flex-row justify-left items-top">
        <div class="h-full w-full flex flex-col justify-center items-center">
            <div class="flex flex-col justify-left item-top h-full w-full bg-cat-crust opacity-90 p-4 rounded-lg 
                prose prose-slate prose-invert prose-md overflow-y-auto overflow-x-hidden text-wrap break-words text-white">
                <ContentDoc />
                <div class="h-16 w-full flex flex-row justify-between items-center gap-4 mt-auto">
                    <NuxtLink to="/blog">Back</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
