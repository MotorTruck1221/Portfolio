<script lang="ts" setup>
    const slug = useRoute().params.slug;
    const { data: post } = await useAsyncData(`blog-${slug}`, () => {
        return queryCollection('blog').path(`/blog/${slug}`).first()
    });
</script>
<template>
    <div class="text-cat-text p-4 w-full md:w-[90%] h-full flex flex-row justify-center items-top">
        <div class="h-full w-full flex flex-col justify-center items-center">
            <div class="flex flex-col justify-lrft item-top h-full w-[90%] bg-cat-crust opacity-90 p-4 rounded-lg 
                prose prose-slate prose-invert max-w-none prose-md md:prose-xl overflow-y-auto overflow-x-hidden text-wrap break-words text-white slide-in-text">
                <ContentRenderer :value="post" />
                <div class="h-16 w-full flex flex-row justify-between items-center gap-4 mt-auto">
                    <NuxtLink to="/blog">Back</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
