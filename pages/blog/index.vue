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
    const getExtraData = async (path: string): Promise<{ description: string, series?: { title: string, part: number }}> => {
        const { description, series } = await queryCollection('blog').path(path).first();
        return { description, series };
    }
    const { data } = await useAsyncData('navigation', () => {
        return queryCollectionNavigation('blog', ['description', 'series']).order('date', 'DESC');
    }); 
</script>
<template>
    <div class="h-full w-full text-cat-text flex flex-row justify-left items-center gap-8 p-4"> 
        <div class="h-full w-full flex flex-col justify-left items-top gap-4">
            <div class="flex w-full flex-row justify-between items-center">
                <h1 class="text-4xl font-bold">Blog Posts</h1>
                <button><font-awesome-icon class="font-bold text-4xl hover:text-cat-pink active:text-cat-blue transition-all duration-300" @click="rss()" :icon="['fas', 'rss']" /></button>
            </div>
            <div class="h-full w-full flex flex-col flex-wrap justify-left items-top gap-4" v-for="item in data" :key="item.path">
                <div v-for="blog in item.children" :key="blog.path" class="w-full h-24 rounded-lg flex flex-row justify-left items-top bg-cat-crust pr-2 pl-2 pt-2 pb-2 border-2 border-cat-pink">
                    <div class="flex flex-col flex-grow overflow-hidden">
                        <NuxtLink :to="blog.path" class="transition-all duration-300 text-cat-pink active:text-cat-blue md:text-cat-text md:hover:text-cat-pink whitespace-nowrap text-ellipsis overflow-hidden font-semibold text-xl w-full">
                            {{ blog.title }} {{ blog.series ? `(Part: ${blog.series.part})` : null }}
                        </NuxtLink>
                        <p class="text-cat-text opacity-75 whitespcae-nowrap text-ellipsis overflow-hidden w-full">{{ blog.description || "No description" }}</p>
                    </div>
                    <NuxtLink class="hidden md:flex transition-all duration-300 hover:bg-cat-pink h-full w-[3.2rem] bg-cat-blue rounded-md text-center flex items-center justify-center text-2xl" :to="blog.path">
                        <font-awesome-icon class="text-cat-crust" :icon="['fas', 'right-long']" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
