<template>
    <form @submit.prevent="save" class="contents">
        <div class="inline-flex flex-col gap-4">
            <div class="flex gap-4">
                <div class="flex-1 flex flex-col p-2 aspect-[1/1.414] rounded-lg border border-muted/50 bg-muted mt-6 relative">
                    <span class="text-xs text-muted text-center absolute  inset-0 -top-5">Seite 1 Links</span>
                    <div class="flex gap-4 justify-center">
                        <UInput type="number" v-model="form['margin.1.top']" class="w-14 font-mono" />
                    </div>
                    <div class="flex-1 flex justify-between gap-2">
                        <UInput type="number" v-model="form['margin.1.left']" class="w-14 font-mono" />
                        <UInput type="number" v-model="form['margin.1.right']" class="w-14 font-mono" />
                    </div>
                    <div class="flex gap-4 justify-center">
                        <UInput type="number" v-model="form['margin.1.bottom']" class="w-14 font-mono" />
                    </div>
                </div>
    
                <div class="flex-1 flex flex-col p-2 aspect-[1/1.414] rounded-lg border border-muted/50 bg-muted mt-6 relative">
                    <span class="text-xs text-muted text-center absolute  inset-0 -top-5">Seite 1 Rechts</span>
                    <div class="flex gap-4 justify-center">
                        <UInput type="number" v-model="form['margin.2.top']" class="w-14 font-mono" />
                    </div>
                    <div class="flex-1 flex justify-between gap-2">
                        <UInput type="number" v-model="form['margin.2.left']" class="w-14 font-mono" />
                        <UInput type="number" v-model="form['margin.2.right']" class="w-14 font-mono" />
                    </div>
                    <div class="flex gap-4 justify-center">
                        <UInput type="number" v-model="form['margin.2.bottom']" class="w-14 font-mono" />
                    </div>
                </div>
            </div>
    
            <div class="flex flex-col p-2 aspect-[1.414] rounded-lg border border-muted/50 bg-muted mt-6 relative">
                <span class="text-xs text-muted text-center absolute  inset-0 -top-5">Seite 2</span>
                <div class="flex gap-4 justify-center">
                    <UInput type="number" v-model="form['margin.3.top']" class="w-14 font-mono" />
                </div>
                <div class="flex-1 flex justify-between gap-2">
                    <UInput type="number" v-model="form['margin.3.left']" class="w-14 font-mono" />
                    <UInput type="number" v-model="form['margin.3.right']" class="w-14 font-mono" />
                </div>
                <div class="flex gap-4 justify-center">
                    <UInput type="number" v-model="form['margin.3.bottom']" class="w-14 font-mono" />
                </div>
            </div>
        </div>
        <UButton type="submit">Speichern</UButton>
        <UColorModeSelect />
    </form>
</template>

<script lang="ts" setup>
    const form = ref({
        'margin.1.top': 5,
        'margin.1.bottom': 5,
        'margin.1.left': 5,
        'margin.1.right': 5,
        'margin.2.top': 5,
        'margin.2.bottom': 5,
        'margin.2.left': 5,
        'margin.2.right': 5,
        'margin.3.top': 5,
        'margin.3.bottom': 5,
        'margin.3.left': 5,
        'margin.3.right': 5,
    })

    async function save() {
        await $fetch('/api/settings', {
            method: 'PUT',
            body: form.value,
        })
    }

    async function fetch() {
        form.value = { ...form.value, ...(await $fetch('/api/settings')) }
    }

    onMounted(() => {
        fetch()
    })
</script>

<style lang="sass" scoped>
</style>