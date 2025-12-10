<template>
    <USlideover :title="title" v-model:open="isOpen">
        <template #body>
            <div class="flex flex-col">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-1">
                        <UInputMenu class="flex-1" v-model="(form.breeder as string)" :items="pedigreeDataStore.breeders" createItem="always" @create="onCreateBreeder" placeholder="Züchter" leading-icon="i-lucide-user"/>
                        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-x" aria-label="Züchter entfernen" @click="form.breeder = null" :disabled="!form.breeder" />
                    </div>
                    <div class="flex items-center gap-1">
                        <UInputMenu class="flex-1" v-model="(form.kennel as string)" :items="animalDataStore.kennels" createItem="always" @create="onCreateKennel" placeholder="Zwinger" leading-icon="i-lucide-house"/>
                        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-x" aria-label="Zwinger entfernen" @click="form.kennel = null" :disabled="!form.kennel" />
                    </div>
                    <div class="flex items-center gap-1">
                        <UInput class="flex-1" v-model="form.title" placeholder="Wurfname" leading-icon="i-lucide-type" />
                        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-x" aria-label="Wurfname entfernen" @click="form.title = null" :disabled="!form.title" />
                    </div>
                    <UTextarea v-model="form.address" autoresize placeholder="Züchter / Adresse" leading-icon="i-lucide-map-pin" />
                </div>
            </div>
        </template>

        <template #footer>
            <div class="flex-1 flex flex-row-reverse">
                <UFieldGroup>
                    <UButton label="Speichern" @click="save()" :loading="isLoading" />
                    <UDropdownMenu :items="saveItems" arrow>
                        <UButton icon="i-lucide-chevron-down" />
                    </UDropdownMenu>
                </UFieldGroup>
                <div class="flex-1"></div>
                <UButton label="Abbrechen" variant="outline" @click="close" />
            </div>
        </template>
    </USlideover>
</template>

<script lang="ts" setup>
    import type { PedigreeResource, PedigreeStructure } from '~~/types/pedigree'

    const isOpen = ref(false)
    const isLoading = ref(false)
    const isEditing = computed(() => form.value.id != null)
    const title = computed(() => isEditing.value ? 'Ahnentafel bearbeiten' : 'Neue Ahnentafel erstellen')
    const animalDataStore = useAnimalDataStore()
    const pedigreeDataStore = usePedigreeDataStore()

    const emit = defineEmits([
        'saved',
        'created',
        'updated',
        'closed',
    ])

    const form = ref<Partial<PedigreeStructure>>({})

    const saveItems = ref([
        { label: 'Speichern und Neu', icon: 'i-lucide-plus', onSelect: () => save('createNew') },
        { label: 'Speichern und Duplikat', icon: 'i-lucide-copy-plus', onSelect: () => save('createDuplicate') },
        { label: 'Speichern ohne schließen', icon: 'i-lucide-save', onSelect: () => save('stayOpen') },
    ])



    function onCreateBreeder(item: string) {
        pedigreeDataStore.breeders.push(item)
        form.value.breeder = item
    }

    function onCreateKennel(item: string) {
        animalDataStore.kennels.push(item)
        form.value.kennel = item
    }



    function open(pedigree: Partial<PedigreeResource> = {}) {
        reset()
        form.value = {
            ...form.value,
            ...pedigree,
        }
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
        emit('closed')
    }

    function reset() {
        form.value = {
            id: null,
            breeder: '',
            title: '',
            kennel: '',
            address: '',
        }
    }

    async function save(mode?: 'stayOpen' | 'createNew' | 'createDuplicate') {
        isLoading.value = true
        isEditing.value ? await update() : await create()
        isLoading.value = false
        emit('saved')

        switch (mode) {
            case 'stayOpen': return;
            case 'createNew': reset(); return;
            case 'createDuplicate': form.value.id = null; return;
            default: close(); return;
        }
    }

    async function create() {
        await $fetch('/api/pedigrees', {
            method: 'POST',
            body: form.value,
        })

        emit('created')
    }
    
    async function update() {
        await $fetch('/api/pedigrees/'+form.value.id, {
            method: 'PUT',
            body: form.value,
        })

        emit('updated')
    }

    defineExpose({
        open,
        close
    })
</script>

<style lang="sass" scoped>
</style>