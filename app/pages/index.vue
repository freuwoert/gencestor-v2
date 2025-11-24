<template>
    <div class="p-8">
        <h1 class="text-4xl font-bold">Willkommen zurück!</h1>
        <p class="text-lg mt-2">Schön, dich wiederzusehen.</p>
        {{ animal }}
        <AppAnimalSelect @select="animal = $event">
            <UButton label="Open" color="neutral" variant="subtle" />
        </AppAnimalSelect>
    </div>
</template>

<script lang="ts" setup>
    useSeoMeta({
        title: 'Übersicht',
        description: 'Übersicht und Schnellzugriffe',
    })

    const animal = ref()
</script>

<style lang="sass" scoped>
</style>