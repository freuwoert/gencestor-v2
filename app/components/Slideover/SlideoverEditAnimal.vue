<template>
    <USlideover :title="title" v-model:open="isOpen">
        <template #body>
            <div class="flex flex-col">
                <span>Identität</span>
                <div class="mt-2 flex gap-2 items-center" :class="{'flex-row-reverse': form.kennelNameFirst}">
                    <UInput class="flex-1" v-model="form.name" placeholder="Name" leading-icon="i-lucide-tag" />
                    <UButton @click="form.kennelNameFirst = !form.kennelNameFirst" color="neutral" variant="ghost" icon="i-lucide-arrow-right-left" />
                    <UInput class="flex-1" v-model="form.kennel" placeholder="Zwinger" leading-icon="i-lucide-house" />
                </div>
                <UInput class="mt-4" v-model="form.chipNumber" placeholder="Chipnummer" leading-icon="i-lucide-cpu" />
                <UInput class="mt-4" v-model="form.studbookNumber" placeholder="Zuchtbuch-Nr." leading-icon="i-lucide-book-user" />

                <span class="mt-6">Geburt</span>
                <UInputMenu class="mt-4" v-model="(form.breed as string)" :items="breedItems" createItem="always" @create="onCreateBreed" placeholder="Rasse" leading-icon="i-lucide-dog" />                
                <USelect class="mt-4 pl-14" v-model="(form.sex as string)" value-key="value" placeholder="Geschlecht" :items="sexItems">
                    <template #leading>
                        <AppSexIcon inner-class="size-4" class="w-10 h-6" :sex="form.sex" />
                    </template>
                </USelect>
                <UInput type="date" class="mt-4" v-model="(form.birthDate as null)" leading-icon="i-lucide-calendar">
                    <template v-if="form.birthDate" #trailing>
                        <UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Datum entfernen" @click="form.birthDate = null"/>
                    </template>
                </UInput>

                <span class="mt-6">Aussehen</span>
                <UInputMenu class="mt-2" v-model="(form.hairType as string)" :items="hairTypeItems" createItem="always" @create="onCreateHairType" placeholder="Haartyp" leading-icon="i-lucide-waves" />
                <UInputMenu class="mt-4" v-model="(form.hairColor as string)" :items="hairColorItems" createItem="always" @create="onCreateHairColor" placeholder="Haarfarbe" leading-icon="i-lucide-palette" />
                <UInput class="mt-4" v-model="form.size" placeholder="Größe" leading-icon="i-lucide-ruler" />

                <span class="mt-6">Notizen</span>
                <UTextarea class="mt-2" v-model="form.notes" placeholder="Notizen" leading-icon="i-lucide-notebook" />
            </div>
        </template>

        <template #footer>
            <UButton label="Abbrechen" variant="outline" @click="close" />
            <div class="flex-1"></div>
            <UButton label="Speichern" @click="save" />
        </template>
    </USlideover>
</template>

<script lang="ts" setup>
    const isOpen = ref(false)
    const isLoading = ref(false)
    const isEditing = computed(() => form.value.id != null)
    const title = computed(() => isEditing.value ? `Tier #${form.value.id} bearbeiten` : 'Neues Tier erstellen')

    const form = ref<Partial<Animal>>({
        chipNumber: '',
        studbookNumber: '',
        name: '',
        kennel: '',
        kennelNameFirst: false,
        awardsLength1: '',
        awardsLength2: '',
        awardsLength3: '',
        awardsLength4: '',
        notes: '',
        birthDate: null,
        breed: '',
        sex: 'male',
        size: '',
        hairType: '',
        hairColor: '',
        motherId: null,
        fatherId: null,
    })

    const sexItems = ref([
        { label: 'Rüde', icon: 'i-lucide-mars', value: 'male' },
        { label: 'Hündin', icon: 'i-lucide-venus', value: 'female' },
        { label: 'Unbekannt', icon: 'i-lucide-circle-question-mark', value: 'unknown' },
    ])

    const breedItems = ref<string[]>([])
    function onCreateBreed(newBreed: string) {
        breedItems.value.push(newBreed)
        form.value.breed = newBreed
    }

    const hairTypeItems = ref<string[]>([])
    function onCreateHairType(newHairType: string) {
        hairTypeItems.value.push(newHairType)
        form.value.hairType = newHairType
    }

    const hairColorItems = ref<string[]>([])
    function onCreateHairColor(newHairColor: string) {
        hairColorItems.value.push(newHairColor)
        form.value.hairColor = newHairColor
    }



    function open(animal: Partial<Animal> = {}) {
        form.value = { ...form.value, ...animal }
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    async function save() {
        isLoading.value = true
        isEditing.value ? await update() : await create()
        isLoading.value = false
        close()

        fetchInitialData()
    }

    async function create() {
        await $fetch('/api/animals', {
            method: 'POST',
            body: form.value,
        })
    }
    
    async function update() {
        await $fetch(`/api/animals/${form.value.id}`, {
            method: 'PUT',
            body: form.value,
        })
    }

    async function fetchInitialData() {
        breedItems.value = await $fetch<string[]>('/api/animals/breeds')
        hairTypeItems.value = await $fetch<string[]>('/api/animals/hair-types')
        hairColorItems.value = await $fetch<string[]>('/api/animals/hair-colors')
    }

    onMounted(() => {
        fetchInitialData()
    })

    defineExpose({
        open,
        close
    })
</script>

<style lang="sass" scoped>
</style>