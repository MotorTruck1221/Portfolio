<script lang="ts" setup>
    useHead({
        title: 'Projects',
    });
</script>
<template>
    <div class="h-full text-cat-text flex flex-row justify-left items-center gap-8 p-4">
        <div class="h-full text-cat-text flex flex-col justify-left w-full items-top">
            <h1 class="text-4xl font-bold">Projects</h1>
            <p class="text-xl mb-8">Here are some of my projects</p>
            <div class="flex flex-row flex-shrink justify-center items-center gap-4 flex-wrap w-full">
                <ProjectCard
                    title="Ruby"
                    description="A fast, easy to use, and customizable proxy, designed to act and look like a browser."
                    image="/projectImages/ruby.png"
                    link="https://github.com/ruby-network/ruby"
                />
                <ProjectCard
                    title="Flash Player"
                    description="An application that allows you to play flash games and animations."
                    image="/projectImages/flashplayer.png"
                    link="https://github.com/allancoding/flashplayer"
                />
                <ProjectCard
                    title="Prism OS"
                    description="A linux distro that aims to have full compatibility with Windows applications."
                    image="/projectImages/prism.png"
                    link="https://github.com/prismnet"
                /> 
                <ProjectCard
                    title="Create Dreamland App"
                    description="Easily setup dreamland.js with your favorite tools"
                    image="https://raw.githubusercontent.com/MotorTruck1221/dreamland-stuff/main/create-dreamland-app/example.gif"
                    link="https://github.com/motortruck1221/dreamland-stuff/tree/main/create-dreamland-app"
                />
                <ProjectCard
                    title="Vite Plugin Dreamland"
                    description="A simple plugin for Vite with usage dreamland.js"
                    image="/projectImages/vdp.png"
                    link="https://github.com/motortruck1221/dreamland-stuff/tree/main/vite-plugin-dreamland"
                />
            </div>
            <h1 class="text-4xl font-bold mt-8">Contributions</h1>
            <p class="text-xl mb-8">Projects I've contributed to</p>
            <div class="flex flex-row flex-shrink justify-center items-center gap-4 flex-wrap w-full">
                <ProjectCard
                    title="Nebula"
                    description="A stunning and sleek web proxy with support for hundreds of popular sites."
                    image="/projectImages/contribs/nebula.png"
                    link="https://github.com/NebulaServices/Nebula"
                />
                <ProjectCard
                    title="EmulatorJS Netplay"
                    description="A netplay implementation for EmulatorJS."
                    image="/projectImages/contribs/emu.png"
                    link="https://github.com/EmulatorJS/emulatorjs-netplay"
                />
            </div>
        </div>
    </div>
</template>
