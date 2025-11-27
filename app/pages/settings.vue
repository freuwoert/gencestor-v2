<template>
    <form @submit.prevent="settingsStore.save" v-if="settingsStore.settings" class="flex flex-col items-start p-4 gap-4">
        <UTextarea class="mt-2" v-model="settingsStore.settings['general.notes']" placeholder="Notizen" leading-icon="i-lucide-notebook" />
        
        <UButton type="submit">Speichern</UButton>
    </form>
</template>

<script lang="ts" setup>
    useSeoMeta({
        title: 'Einstellungen',
        description: 'Anpassen der Anwendungseinstellungen',
    })
    
    const settingsStore = useSettingsStore()
</script>

<style lang="sass" scoped>
</style>