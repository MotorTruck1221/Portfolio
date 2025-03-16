<script lang="ts" setup>
    useHead({
        title: 'Projects',
    });
</script>
<template>
    <div class="h-full text-cat-text flex flex-row justify-left items-center gap-8 p-4">
        <div class="h-full text-cat-text flex flex-col justify-center w-full items-center">
            <h1 class="text-4xl font-bold">Projects</h1>
            <p class="text-xl mb-8">Here are some of my projects</p>
            <div class="flex flex-row flex-shrink justify-center items-center gap-4 flex-wrap w-3/4">
                <ProjectCard
                    title="Ruby"
                    description="A fast, easy to use proxy that's designed to look & act like a web browser"
                    image="/projectImages/ruby.png"
                    link="https://github.com/ruby-network/ruby"
                />
                <ProjectCard
                    title="Incognito"
                    description="An incredibly easy to deploy, speedy and fast web proxy"
                    image="/projectImages/incognito.png"
                    link="https://github.com/titaniumnetwork-dev/incognito"
                />
                <ProjectCard
                    title="Dotfiles"
                    description="My dotfiles utilizing NixOS"
                    image="/projectImages/dotfiles.png"
                    link="https://github.com/motortruck1221/dotfiles"
                />
                <ProjectCard
                    title="Flash Player"
                    description="An application that allows you to play flash games and animations."
                    image="/projectImages/flashplayer.png"
                    link="https://github.com/allancoding/flashplayer"
                />
                <ProjectCard
                    title="Prism OS"
                    description="An in dev Linux OS w/support for Windows apps"
                    image="/projectImages/prism.png"
                    link="https://github.com/prismnet"
                /> 
                <ProjectCard
                    title="Create Dreamland App"
                    description="Easily setup dreamland.js"
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
