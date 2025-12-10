import { defineStore } from 'pinia'

export const usePedigreeDataStore = defineStore('pedigree-data', () => {
    const breeders = ref<string[]>([])

    async function fetch() {
        breeders.value = await $fetch<string[]>('/api/pedigrees/breeders')
    }

    return {
        breeders,
        fetch,
    }
})