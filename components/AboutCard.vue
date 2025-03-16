<script lang="ts" setup>
    const props = defineProps({
        title: String,
    });
</script>
<template>
    <div class="w-5/6 bg-cat-crust rounded-md border-cat-pink border-2 flex flex-col items-center text-cat-text p-4" :id=title.toLowerCase()>
        <h1 class="text-cat-text text-4xl font-bold mb-4"> {{ title }} </h1>
        <div class="border-t-2 border-cat-pink w-full flex-grow h-full flex flex-wrap">
            <slot />
        </div>
    </div>
</template>
