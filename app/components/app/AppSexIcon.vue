<template>
    <div :class="`${color} rounded-full flex items-center justify-center`">
        <UIcon :name="icon" :class="`${innerClass}`" />
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        sex: {
            type: [String, null],
            default: null,
        },
        innerClass: {
            type: String,
            default: 'size-5',
        },
    })

    const color = computed(() => {
        switch (props.sex) {
            case 'male': return 'bg-blue-500/10 text-blue-500 border border-blue-500'
            case 'female': return 'bg-pink-500/10 text-pink-500 border border-pink-500'
            case 'unknown': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500'
            default: return 'bg-elevated text-default border border-default'
        }
    })

    const icon = computed(() => {
        switch (props.sex) {
            case 'male': return 'i-lucide-mars'
            case 'female': return 'i-lucide-venus'
            case 'unknown': return 'i-lucide-circle-question-mark'
            default: return 'i-lucide-circle-slash'
        }
    })
</script>

<style lang="sass" scoped>
</style>