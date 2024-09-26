<script lang="ts" setup>
    const { $toast } = useNuxtApp();
    const url = useRequestURL();
    useHead({
        title: 'Blog',
    })
    async function rss() {
        navigator.clipboard.writeText(`${url.origin}/rss.xml`);
        $toast.info("URL copied to clipboard!");
    }
</script>
<template>
    <div class="h-full w-full text-cat-text flex flex-row justify-left items-center gap-8 p-4"> 
        <div class="h-full w-full flex flex-col justify-left items-top gap-4">
            <div class="flex w-full flex-row justify-between items-center">
                <h1 class="text-4xl font-bold">Blog Posts</h1>
                <button><font-awesome-icon class="font-bold text-4xl hover:text-cat-pink active:text-cat-blue transition-all duration-300" @click="rss()" :icon="['fas', 'rss']" /></button>
            </div>
            <ContentNavigation v-slot="{ navigation }">
                <div class="h-full w-full flex flex-col flex-wrap justify-left items-top gap-4" v-for="link of navigation" :key="link._path">
                    <div v-for="link of link.children" :key="link._path"
                            class="w-full h-24 rounded-lg flex flex-row justify-left items-top bg-cat-crust pr-2 pl-2 pt-2 pb-2 border-2 border-cat-pink">
                        <div class="flex flex-col flex-grow overflow-hidden">
                            <NuxtLink :to="link._path" class="transition-all duration-300 text-cat-pink active:text-cat-blue md:text-cat-text md:hover:text-cat-pink whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-xl w-full">{{ link.title }} {{ link.series ? `(Part: ${link.series.part})` : null }}</NuxtLink>
                            <p class="text-cat-text opacity-75 whitespace-nowrap text-ellipsis overflow-hidden w-full">{{ link.description || "No Description" }}</p>
                        </div>
                        <NuxtLink class="hidden md:flex transition-all duration-300 hover:bg-cat-pink h-full w-[3.2rem] bg-cat-blue rounded-md text-center flex items-center justify-center text-2xl" :to="link._path">
                            <font-awesome-icon class="text-cat-crust" :icon="['fas', 'right-long']" />
                        </NuxtLink>
                    </div>
                </div>
            </ContentNavigation>
        </div>
    </div>
</template>
