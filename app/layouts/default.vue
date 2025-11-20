<template>
    <div class="h-full flex flex-col p-1">
        <div class="flex items-center px-4 gap-2 h-14">
            <AppNavButton to="/" icon="i-lucide-layout-dashboard" tooltip="Übersicht" />
            <AppNavButton to="/animals" icon="i-lucide-dog" tooltip="Tiere" />
            <AppNavButton to="/pedigrees" icon="i-lucide-book-open" tooltip="Ahnentafeln" />
            <div class="flex-1"></div>
            <UColorModeSwitch />
            <AppNavButton to="/settings" icon="i-lucide-settings" tooltip="Einstellungen" />
        </div>
        <div class="flex-1 bg-default rounded-lg overflow-auto">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="sass" scoped>
</style>