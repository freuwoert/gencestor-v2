<template>
    <UTooltip arrow :text="tooltip">
        <NuxtLink :to="to" class="app-nav-button rounded-t-lg">
            <UIcon :name="icon" class="size-6" />
            <div class="corner left"></div>
            <div class="corner right"></div>
        </NuxtLink>
    </UTooltip>
</template>

<script lang="ts" setup>
    defineProps({
        tooltip: {
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
        position: relative
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        height: 100%
        aspect-ratio: 1

        &.router-link-active
            background: var(--ui-bg)
            color: var(--ui-primary)

            .corner
                opacity: 1

        &:focus
            outline: 2px solid var(--ui-primary)
            outline-offset: -2px
            background: var(--ui-bg)

        .corner
            position: absolute
            width: calc(var(--ui-radius) * 2)
            height: calc(var(--ui-radius) * 2)
            overflow: hidden
            pointer-events: none
            bottom: 0
            opacity: 0

            &::after
                content: ''
                position: absolute
                top: -100%
                width: 200%
                height: 200%
                border-radius: 50%
                box-shadow: 0 0 0 100rem var(--ui-bg)

            &.left
                right: 100%
                &::after
                    left: -100%

            &.right
                left: 100%
                &::after
                    right: -100%
</style>