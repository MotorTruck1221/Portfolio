<script lang="ts" setup>
    const route = useRoute();
</script>
<template>
        <div class="sticky top-[5%] hidden md:flex flex-col h-[90vh] xl:h-[85vh] 2xl:h-[90vh] gap-4 justify-center items-center sticky text-cat-text">
            <div class="h-1/2 border-2 border-cat-pink w-1"></div>
            <NuxtLink to="https://github.com/motortruck1221/" target="_blank" class="w-10 h-10 xl:w-20 xl:h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fab', 'github']" />
            </NuxtLink>
            <NuxtLink to="https://discord.com/users/818995901791207454" target="_blank" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fab', 'discord']" />
            </NuxtLink>
            <NuxtLink to="https://twitter.com/motortruck1221" target="_blank" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fab', 'twitter']" />
            </NuxtLink>
            <div class="h-1/2 border-2 border-cat-pink w-1"></div>
        </div>
</template>
