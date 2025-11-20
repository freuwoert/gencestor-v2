<template>
    <div class="flex flex-col">
        <div class="flex p-4 gap-2 items-center border-b border-accented">
            <UInput v-model="query" placeholder="Search" leading-icon="i-lucide-search">
                <template #trailing>
                    <UButton size="xs" variant="ghost" color="neutral" @click="fetch" icon="i-lucide-refresh-ccw" />
                </template>
            </UInput>
            <div class="flex-1"></div>
            <UButton color="primary" @click="editAnimal.open()" trailing-icon="i-lucide-plus">Neu anlegen</UButton>
        </div>

        <UTable :data="items" :columns @select="onSelect">
            <template #name-cell="{ row }">
                <div class="flex gap-3 items-center">
                    <AppSexIcon class="w-8 h-8" :sex="row.original.sex" />
                    {{ conditionalReverse([row.original.name, row.original.kennel], row.original.kennelNameFirst).join(' ') || '—' }}
                </div>
            </template>
            <template #action-cell="{ row }">
                <UDropdownMenu :items="getDropdownActions(row.original)">
                    <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
                </UDropdownMenu>
            </template>
        </UTable>
    </div>

    <SlideoverEditAnimal ref="editAnimal" />
</template>

<script lang="ts" setup>
    import type { TableColumn } from '@nuxt/ui'
    import type { Row } from '@tanstack/vue-table'
    import { useClipboard } from '@vueuse/core'

    const editAnimal = ref()
    const query = ref('')
    const items = ref<any[]>([])
    const pagination = ref({
        page: 0,
        size: 50,
        totalPages: 10,
        totalItems: 0,
    })



    const toast = useToast()
    const { copy } = useClipboard()
    const UButton = resolveComponent('UButton')
    const UDropdownMenu = resolveComponent('UDropdownMenu')
    const columns: TableColumn<Animal>[] = [
        {
            id: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'chipNumber',
            header: 'Chipnummer',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'studbookNumber',
            header: 'Zuchtbuch-Nr.',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'breed',
            header: 'Rasse',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'birthDate',
            header: 'Geburtstag',
            cell: info => info.getValue()
                ? new Date(info.getValue() as string).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })
                : '—',
        },
        {
            accessorKey: 'size',
            header: 'Größe',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'hairType',
            header: 'Haartyp',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'hairColor',
            header: 'Haarfarbe',
            cell: info => info.getValue() || '—',
        },
        {
            id: 'action',
        },
    ]

    function getDropdownActions(row: Row<Animal>) {
        return [
            {
                label: 'ID Kopieren',
                icon: 'i-lucide-copy',
                onSelect() {
                    copy(row.id.toString())
                    toast.add({ title: 'ID in die Zwischenablage kopiert', color: 'success', icon: 'i-lucide-circle-check' })
                }
            },
            { type: 'separator', },
            {
                label: 'Bearbeiten',
                icon: 'i-lucide-edit',
                onSelect: () => editAnimal.value.open(row),
            },
            {
                label: 'Duplizieren',
                icon: 'i-lucide-copy',
                onSelect: () => editAnimal.value.open({ ...row, id: null }),
            },
            {
                label: 'Löschen',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: () => deleteAnimal(parseInt(row.id)),
            },
        ]
    }

    function onSelect(_: any, row: Row<Animal>) {
        editAnimal.value.open(row.original)
    }



    async function fetch() {
        const { items: results, page, size, totalPages, totalItems } = await $fetch('/api/animals', {
            method: 'GET',
            params: {
                page: pagination.value.page,
                size: pagination.value.size,
                query: query.value,
            },
        })

        items.value = results
        pagination.value.page = page
        pagination.value.size = size
        pagination.value.totalPages = totalPages
        pagination.value.totalItems = totalItems
    }

    async function deleteAnimal(id: number) {
        await $fetch(`/api/animals/${id}`, {
            method: 'DELETE',
        })
    }

    onMounted(() => {
        fetch()
    })
</script>

<style lang="sass" scoped>
</style>