<script lang="ts" setup>
    const { data } = await useFetch("/api/tracks", {
        method: 'POST',
    })
</script>
<template>
    <div class="hidden md:block absolute w-96 h-32 border-cat-pink border-2 right-2 bottom-2 bg-cat-base">
        <div class="relative w-full h-full flex items-center p-2 gap-4">
            <NuxtImg class="w-28 h-28 object-fit" :alt="`Recently listened to song: ${data.name} by: ${data.artist}`" :src="`${data.images.xl}`" />
            <div class="flex-grow text-left font-bold text-md whitespace-nowrap overflow-hidden text-ellipsis w-full">
                <p class="text-center text-xl mb-2 border-b-2"> Now Playing: </p>
                <p class=" text-center text-ellipsis whitespace-nowrap"> {{ data.name }}</p>
                <p class="text-center mb-2"> By: {{ data.artist }} </p>
                <p class="border-t-2 text-center"> Last updated: {{ data.lastFetch }} ago </p>
            </div>
        </div>
    </div>
</template>
