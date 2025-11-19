<template>
    <NuxtLink :to="to" class="app-nav-button">
        <UIcon :name="icon" class="size-6" />
        <span>{{ label }}</span>
    </NuxtLink>
</template>

<script lang="ts" setup>
    defineProps({
        label: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: 'i-lucide-heart'
        },
        to: {
            type: String as any,
        },
    })
</script>

<style lang="sass" scoped>
    .app-nav-button
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        border-radius: .5rem .5rem 0 0
        height: 3.5rem
        width: 5.5rem

        &.router-link-active
            background: var(--ui-bg)

        > span
            font-size: 0.75rem
            color: var(--color-text-secondary)
</style>