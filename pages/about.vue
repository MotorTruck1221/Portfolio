<script lang="ts" setup>
    useHead({
        title: 'About',
    });
    const { data: about } = await useAsyncData(`about`, () => {
        return queryCollection('about').first()
    });
</script>
<template>
    <div class="h-full w-full flex flex-col justify-center items-center gap-4">
        <AboutCard title="Contact">
            <div class="w-full h-full flex-grow flex flex-row gap-5 flex-wrap justify-center">
                <div class="h-44 w-full lg:w-2/4 2xl:w-1/3 border-2 border-cat-sapphire rounded-md mt-4 p-2 flex flex-col gap-2">
                    <h1 class="text-lg lg:text-xl font-bold"> Discord </h1>
                    <p class="text-sm lg:text-md"> The best way to get a hold of me is here.
                        My Discord handle is: <NuxtLink class="underline text-cat-pink font-bold" to="https://discord.com/users/818995901791207454" target="_blank">@motortruck1221</NuxtLink>
                    </p>
                </div> 
                <div class="h-44 w-full lg:w-2/4 2xl:w-1/3 border-2 border-cat-sapphire rounded-md mt-4 p-2 flex flex-col gap-2">
                    <h1 class="text-lg lg:text-xl font-bold"> Matrix </h1>
                    <p class="text-sm lg:text-md"> If anything is confidential please contact me here or on Signal before Discord. My Matrix is: 
                        <NuxtLink class="underline text-cat-pink font-bold" target="_blank" to="https://matrix.to/#/@motortruck1221:matrix.org">@motortruck1221:matrix.org</NuxtLink>
                    </p>
                </div>
                <div class="h-44 w-full lg:w-2/4 2xl:w-1/3 border-2 border-cat-sapphire rounded-md mt-4 p-2 flex flex-col gap-2">
                    <h1 class="text-lg lg:text-xl font-bold"> Signal </h1>
                    <p class="text-sm lg:text-md"> As said before, if anything is confidential here or Matrix are the preferred platforms for that. (Note: I may be slower to respond here) 
                        My handle is: <NuxtLink class="underline text-cat-pink font-bold" to="https://signal.me/#eu/GbgYyXavfhkEN81opgHzlpi3lrpNCxqSkqfdgxCtO196-tlraqRBmbek4AUCv9_M" tagret="_blank">@motortruck.1221</NuxtLink>
                    </p>
                </div>
                <div class="h-44 w-full lg:w-2/4 2xl:w-1/3 border-2 border-cat-sapphire rounded-md mt-4 p-2 flex flex-col gap-2">
                    <h1 class="text-lg lg:text-xl font-bold"> Twitter/X </h1>
                    <p class="text-sm lg:text-md"> This should be used as almost a last resort. I rarely (if ever) check Twitter/X DM's. 
                        My Twitter/X handle is: <NuxtLink class="underline text-cat-pink font-bold" to="https://twitter.com/motortruck1221" target="_blank">@motortruck1221</NuxtLink>
                    </p>
                </div>
                <div class="h-44 w-full lg:w-2/4 2xl:w-1/3 border-2 border-cat-sapphire rounded-md mt-4 p-2 flex flex-col gap-2 overflow-hidden text-ellipsis">
                    <h1 class="text-lg lg:text-xl font-bold"> Email </h1>
                    <p class="text-sm lg:text-md"> I may miss anything you send here. However, I do check it every so often. Please try the others first before attempting this one.
                        You can email me at: <NuxtLink to="mailto:motortruck1221@protonmail.com" target="_blank" class="underline text-cat-pink font-bold whitespace-nowrap overflow-hidden text-ellipsis">motortruck1221@protonmail.com</NuxtLink>
                    </p>
                </div> 
            </div>
        </AboutCard>
        <AboutCard title="About this site">
        </AboutCard>
        <AboutCard title="About me">
            <div class="prose prose-slate prose-invert max-w-none prose-md overflow-y-auto overflow-x-hidden text-wrap break-words text-white mt-4">
                <ContentRenderer :value="about" />
            </div>
        </AboutCard> 
    </div>
</template>
