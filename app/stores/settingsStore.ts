import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref<Record<string, any>>({
        'general.notes': '',
    })

    async function fetch() {
        settings.value = { ...settings.value, ...(await $fetch<Record<string, any>>('/api/settings'))}
    }

    async function save() {
        await $fetch<Record<string, any>>('/api/settings', {
            method: 'put',
            body: settings.value,
        })
    }

    return {
        settings,
        fetch,
        save,
    }
})