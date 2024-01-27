<script lang="ts" setup>
    useHead({
        titleTemplate: (name) => {return name ? `${name} - MotorTruck1221` : 'MotorTruck1221'},
    })
</script>
<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex-1 bg-cat-base">
            <main class="h-full w-full">
                <slot />
            </main>
        </div>
    </div>
</template>
