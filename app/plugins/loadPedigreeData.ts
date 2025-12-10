export default defineNuxtPlugin({
    name: 'load-pedigree-data',
    async setup()
    {
        const pedigreeDataStore = usePedigreeDataStore()
        await pedigreeDataStore.fetch()
    }
})