<script lang="ts" setup>
    const route = useRoute();
    import { Icon as Iconify } from "@iconify/vue";
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
            <NuxtLink to="https://bsky.app/profile/motortruck1221.com" target="_blank" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fab', 'bluesky']" />
            </NuxtLink>
            <NuxtLink to="https://reddit.com/u/motortruck1221" target="_blank" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fab', 'reddit']" />
            </NuxtLink>
            <NuxtLink to="https://matrix.to/#/@motortruck1221:matrix.org" target="_blank" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <Iconify icon="cib:matrix" :ssr="true" />
            </NuxtLink>
            <NuxtLink to="https://signal.me/#eu/GbgYyXavfhkEN81opgHzlpi3lrpNCxqSkqfdgxCtO196-tlraqRBmbek4AUCv9_M" target="_blank" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fab', 'signal-messenger']" />
            </NuxtLink>
            <NuxtLink to="mailto:motortruck1221@protonmail.com" class="w-20 h-20 flex justify-center items-center text-4xl transition-all ease-in-out duration-300 hover:text-cat-flamingo">
                <font-awesome-icon :icon="['fas', 'envelope']" />
            </NuxtLink>
            <div class="h-1/2 border-2 border-cat-pink w-1"></div>
        </div>
</template>
