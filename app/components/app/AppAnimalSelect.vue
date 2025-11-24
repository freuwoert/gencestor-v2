<template>
    <UPopover arrow v-model:open="open">
        <slot></slot>
        <template #content>
            <UCommandPalette :placeholder="props.placeholder" :groups="groups" :loading="status === 'pending'" v-model:search-term="searchTerm" autofocus @update:model-value="select">
                <template #item-label="{ item }">
                    <div class="flex gap-2 items-center">
                        <AppSexIcon :sex="item.sex" class="size-8" />
                        <div class="flex flex-col">
                            <span>{{ conditionalReverse([item.name, item.kennel], item.kennelNameFirst).join(' ') }}</span>
                            <span class="text-xs text-muted">Chip: <b>{{ item.chipNumber || '—' }}</b> ZB: <b>{{ item.studbookNumber || '—' }}</b></span>
                        </div>
                    </div>
                </template>
            </UCommandPalette>
        </template>
    </UPopover>
</template>

<script lang="ts" setup>
    import { refDebounced } from '@vueuse/core'

    const props = defineProps({
        sex: {
            type: Array as () => ('male' | 'female' | 'unknown')[],
            default: () => [],
        },
        exclude: {
            type: Array as () => number[],
            default: () => [],
        },
        placeholder: {
            type: String,
            default: 'Tiere suchen...',
        },
    })

    const emit = defineEmits([
        'select',
        'close',
    ])

    const open = ref(false)
    const searchTerm = ref('')
    const searchTermDebounced = refDebounced(searchTerm, 200)

    const { data: items, status } = await useFetch('/api/animals', {
        query: {
            query: searchTermDebounced,
            sex: props.sex,
            exclude: [-1, -1, ...props.exclude].filter(Boolean),
            size: 100,
        },
        transform: (data: any) => data?.items,
        lazy: true,
    })

    const groups = computed(() => [{
        id: 'animals',
        items: items.value || [],
        ignoreFilter: true
    }])

    function select(animal: any) {
        emit('select', animal as Animal)
        searchTerm.value = ''
        open.value = false
        emit('close')
    }
</script>

<style lang="sass" scoped>
</style>