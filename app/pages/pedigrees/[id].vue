<template>
    <div class="h-full flex items-stretch">
        <div class="w-96 flex flex-col gap-4 p-4 border-r border-default">
            <UInput v-model="form.title" variant="subtle" placeholder="Wurfname" />
            <UInput v-model="form.kennel" placeholder="Zwinger" leading-icon="i-lucide-house">
                <template #trailing>
                    <UTooltip arrow text="Zwingername zuerst">
                        <div><USwitch v-model="form.kennelNameFirst" /></div>
                    </UTooltip>
                </template>
            </UInput>
            <UInputMenu v-model="(form.breed as string)" :items="animalDataStore.breeds" createItem="always" @create="onCreateBreed" placeholder="Rasse" leading-icon="i-lucide-dog"/>
            <UInput type="date" v-model="(form.birthDate as null)" leading-icon="i-lucide-calendar"/>
            <UTextarea v-model="form.address" placeholder="Züchter / Adresse" leading-icon="i-lucide-info" />
            <div class="flex-1"></div>
            <UButton label="Speichern" icon="i-lucide-save" @click="save()" :loading="isLoading" />
        </div>
        <div class="flex-1 flex flex-col gap-4 p-4 overflow-auto">
            <UFieldGroup class="ml-auto">
                <UButton icon="i-lucide-plus" variant="subtle" @click="openEditPuppy()">Welpe erstellen</UButton>
                <AppAnimalSelect @select="syncPuppy($event)">
                    <UButton icon="i-lucide-search" variant="outline">Welpe suchen</UButton>
                </AppAnimalSelect>
            </UFieldGroup>
            <UContextMenu :items="contextMenuItems" arrow>
                <UTable class="min-h-120 rounded-lg border border-default" :data="form.animals" :columns="columns" @select="onSelect" @contextmenu="onContextMenu">
                    <template #name-cell="{ row }">
                        <div class="flex gap-3 items-center">
                            <AppSexIcon class="w-8 h-8" :sex="row.original.sex" /> {{ row.original.name || '—' }}
                        </div>
                    </template>
    
                    <template #action-cell="{ row }">
                        <div class="flex items-center justify-end gap-1">
                            <UButton icon="i-lucide-edit-2" size="sm" color="neutral" variant="subtle" aria-label="Bearbeiten" @click="openEditPuppy(row.original)"/>
                            <UButton icon="i-lucide-copy-plus" size="sm" color="neutral" variant="subtle" aria-label="Duplizieren" @click="openEditPuppy({ ...row.original, id: null })"/>
                            <USeparator orientation="vertical" class="h-8 mx-1"/>
                            <UButton icon="i-lucide-minus" size="sm" color="error" variant="subtle" aria-label="Entfernen" @click="removePuppy(row.original)"/>
                        </div>
                    </template>
                </UTable>
            </UContextMenu>

            <div class="flex flex-col gap-2">
                <AppTreeBuilder class="flex-1" v-if="form.father" :animal="form.father" :generation="1" @edit="openEditParent" @assignParent="assignParent" @createParent="createParent" />
                <AppTreeBuilder class="flex-1" v-if="form.mother" :animal="form.mother" :generation="1" @edit="openEditParent" @assignParent="assignParent" @createParent="createParent" />
            </div>
        </div>
    </div>


    <SlideoverEditAnimal ref="editAnimal" />
</template>

<script lang="ts" setup>
    import dayjs from 'dayjs'
    import type { Row } from '@tanstack/vue-table'
    import type { ContextMenuItem, TableColumn } from '@nuxt/ui'
    import type { PedigreeResource } from '~~/types/pedigree'
    import type { AnimalResource, AnimalStructure } from '~~/types/animal'

    definePageMeta({
        validate: (route): boolean => !!route.params.id && !Number.isNaN(Number(route.params.id)),
    })

    useSeoMeta({
        title: 'Ahnentafel Details',
        description: 'Details und Bearbeitung einer Ahnentafel',
    })
    
    const id = Number(useRoute().params.id)
    const isLoading = ref(false)
    const form = ref<Partial<PedigreeResource>>({})
    const editAnimal = ref()
    const animalDataStore = useAnimalDataStore()



    const UButton = resolveComponent('UButton')
    const columns: TableColumn<AnimalResource>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'chipNumber',
            header: 'Chip-Nr.',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'studbookNumber',
            header: 'ZB-Nr.',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'hairColor',
            header: 'Haarfarbe',
            cell: info => info.getValue() || '—',
        },
        {
            accessorKey: 'notes',
            header: 'Notizen',
            cell: info => info.getValue() || '—',
        },
        {
            id: 'action',
        },
    ]

    function getActions(row: Row<AnimalResource>) {
        return [
            {
                label: 'Bearbeiten',
                icon: 'i-lucide-edit-2',
                onSelect: () => openEditPuppy(row.original),
            },
            {
                label: 'Duplizieren',
                icon: 'i-lucide-copy-plus',
                onSelect: () => openEditPuppy({ ...row.original, id: null }),
            },
            { type: 'separator', },
            {
                label: 'Entfernen',
                icon: 'i-lucide-minus',
                color: 'error',
                onSelect: () => removePuppy(row.original),
            },
        ]
    }
    
    const contextMenuItems = ref<ContextMenuItem[]>([])
    function onContextMenu(_: Event, row: Row<AnimalResource>) {
        contextMenuItems.value = getActions(row) as ContextMenuItem[]
    }

    function onSelect(_: Event, row: Row<AnimalResource>) {
        editAnimal.value.open(row.original)
    }

    function onCreateBreed(newBreed: string) {
        animalDataStore.breeds.push(newBreed)
        form.value.breed = newBreed
    }



    function openEditPuppy(animal: Partial<AnimalStructure> = {}) {
        editAnimal.value.open({
            ...animal,
            kennelNameFirst: form.value.kennelNameFirst,
            kennel: form.value.kennel,
            breed: form.value.breed,
            birthDate: form.value.birthDate,
        }, syncPuppy, {
            hide: ['PARENTS', 'breed', 'birthDate'],
            disable: ['kennelNameFirst', 'kennel']
        })
    }

    function syncPuppy(animal: Partial<AnimalResource>) {
        let index = form.value.animals?.findIndex((a: AnimalResource) => a.id === animal.id) ?? -1
        if (index >= 0) {
            form.value.animals[index] = { ...form.value.animals[index], ...animal }
        }
        else {
            form.value.animals.push(animal)
        }
    }

    function removePuppy(animal: Partial<AnimalResource>) {
        form.value.animals = form.value.animals.filter((a: AnimalResource) => a.id !== animal.id)
    }


    
    function openEditParent(e: {animal: Partial<AnimalResource>}) {
        editAnimal.value.open(e.animal, fetchTrees, {
            hide: ['ACTIONS'],
            disable: ['sex'],
        })
    }

    async function assignParent(e: {parent: Partial<AnimalResource>, role: 'father' | 'mother', child: Partial<AnimalResource>}) {
        await $fetch('/api/animals/'+e.child.id, {
            method: 'PUT',
            body: e.role === 'father' ? { fatherId: e.parent.id } : { motherId: e.parent.id },
        })
        await fetchTrees()
    }

    function createParent(e: {role: 'father' | 'mother', child: Partial<AnimalResource>}) {
        editAnimal.value.open({
            sex: e.role === 'father' ? 'male' : 'female'
        }, (parent: Partial<AnimalResource>) => {
            assignParent({ parent: parent, role: e.role, child: e.child })
        }, {
            hide: ['ACTIONS'],
            disable: ['sex'],
        })
    }

    function reset() {
        form.value = {
            title: '',
            kennel: '',
            address: '',
            birthDate: null,
            breed: '',
            animals: [],
            mother: null,
            father: null,
        }
    }

    async function fetch() {
        isLoading.value = true
        await fetchPedigree()
        await fetchTrees()
        isLoading.value = false
    }

    async function fetchPedigree() {
        form.value = { ...form.value, ...(await $fetch('/api/pedigrees/'+id))}
        form.value.birthDate = form.value.birthDate ? dayjs(form.value.birthDate).format('YYYY-MM-DD') : null
    }

    async function fetchTrees() {
        if (form.value.fatherId) form.value.father = await fetchTree(form.value.fatherId)
        if (form.value.motherId) form.value.mother = await fetchTree(form.value.motherId)
    }

    async function fetchTree(id: number): Promise<AnimalResource | null> {
        return await $fetch('/api/animals/'+id+'/tree', { params: { generations: 4 } })
    }

    async function save() {
        isLoading.value = true
        await $fetch('/api/pedigrees/'+id, {
            method: 'PUT',
            body: {
                ...form.value,
                animals: form.value.animals?.map((a: AnimalResource) => a.id) || [],
                motherId: form.value.mother?.id || null,
                fatherId: form.value.father?.id || null,
            },
        })
        isLoading.value = false
    }

    reset()
    fetch()
</script>

<style lang="sass" scoped>
</style>