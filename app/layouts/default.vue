<template>
    <div class="h-full flex items-stretch gap-1 p-1">
        <div class="flex-1 flex flex-col">
            <div class="flex items-center px-4 gap-2">
                <AppNavButton to="/" icon="i-lucide-layout-dashboard" label="Übersicht" />
                <AppNavButton to="/animals" icon="i-lucide-dog" label="Tiere" />
                <AppNavButton to="/pedigrees" icon="i-lucide-book-open" label="Ahnentafeln" />
                <div class="flex-1"></div>
                <AppNavButton to="/settings" icon="i-lucide-settings" label="Einstellungen" />
            </div>
            <div class="flex-1 bg-default rounded-xl overflow-hidden">
                <slot></slot>
            </div>
        </div>
        <div class="w-[600px] flex flex-col">
            <div class="flex items-center px-4 gap-2">
                <span>AAAAAAAA</span>
            </div>
            <div class="flex-1 bg-default rounded-xl overflow-hidden">
                <slot name="popup"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="sass" scoped>
</style>