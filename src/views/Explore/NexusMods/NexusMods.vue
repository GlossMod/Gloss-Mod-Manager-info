<script lang='ts' setup>



import ModList from '@/views/Explore/NexusMods/ModList.vue'
import Filter from '@/views/Explore/NexusMods/Filter.vue'
import { watch } from "vue";
const nexusMods = useNexusMods()
const settings = useSettings()
const manager = useManager()

if (nexusMods.mods.length == 0) {
    nexusMods.GetModList()
}

watch([
    () => nexusMods.sort_by,
    () => nexusMods.time,
    () => settings.settings.managerGame?.gameName,
], () => {
    nexusMods.page = 1
    nexusMods.GetModList()
})

watch(() => nexusMods.page, () => {
    nexusMods.GetModList()
})

</script>
<template>
    <Search>
        <v-text-field v-model="nexusMods.searchText" class="search-input "
            :placeholder="$t('You can search for what you want here')" variant="underlined"
            @keydown.enter="nexusMods.search" append-inner-icon="mdi-magnify" @click:append-inner="nexusMods.search">
        </v-text-field>
    </Search>
    <Filter></Filter>
    <v-row v-if="!settings.settings.managerGame" class="empty">
        <div @click="manager.selectGameDialog = true" class="empty-hint">
            {{ $t('You have not selected a game yet. Please select a game first') }} <v-icon>mdi-plus</v-icon>
        </div>
    </v-row>
    <v-card class="mod-wrap" v-else-if="nexusMods.mods.length > 0">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in nexusMods.mods" :key="item.id">
                    <ModList :mod="item"></ModList>
                </v-col>
                <v-col cols="12" class="turn-page">
                    <v-pagination v-model="nexusMods.page" :length="nexusMods.pageLength"></v-pagination>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'NexusMods',
}
</script>
<style lang='less' scoped></style>