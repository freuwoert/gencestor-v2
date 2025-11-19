<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<script lang="ts" setup>
    useHead({
        htmlAttrs: {
            class: 'bg-elevated h-full'
        },
        bodyAttrs: {
            class: 'bg-transparent h-full'
        },
    })
</script>
