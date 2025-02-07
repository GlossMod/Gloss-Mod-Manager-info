<script lang='ts' setup>

import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";


import ModList from '@/views/Explore/GlossMod/ModList.vue'
import Filter from '@/views/Explore/GlossMod/Filter.vue'
import TurnPage from "@/views/Explore/GlossMod/TurnPage.vue";
const explore = useExplore()

if (explore.mods.length == 0) {
    explore.GetModList()
}

const settings = useSettings()

// console.log(settings.settings.tourGameList.length);


watch([
    () => explore.order,
    () => explore.original,
    () => explore.time,
    () => settings.settings.managerGame?.gameName,
    () => explore.gameType,
    () => explore.gameId,
], () => {
    explore.page = 1
    explore.GetModList()
})

watch(() => explore.page, () => {
    explore.GetModList()
})

</script>
<template>
    <Search>
        <v-text-field v-model="explore.searchText" class="search-input "
            :placeholder="$t('You can search for what you want here')" variant="underlined"
            @keydown.enter="explore.search" append-inner-icon="mdi-magnify" @click:append-inner="explore.search">
        </v-text-field>
    </Search>
    <Filter></Filter>
    <v-card :loading="explore.loading">
        <v-card-text>
            <v-row v-if="!settings.settings.managerGame && settings.settings.tourGameList.length == 0" class="empty">
                <div @click="explore.showTourGameListDialog = true" class="empty-hint">
                    {{ $t('Please select a game first') }} <v-icon>mdi-plus</v-icon>
                </div>
            </v-row>
            <v-row class="mod-wrap" v-else-if="explore.mods.length > 0 && !explore.loading">
                <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in explore.mods" :key="item.id">
                    <ModList :mod="item"></ModList>
                </v-col>
                <TurnPage></TurnPage>
            </v-row>
            <v-col cols="12" v-else-if="!explore.loading">
                <el-empty :description="$t('No content yet~')" />
            </v-col>
        </v-card-text>
    </v-card>

</template>
<script lang='ts'>

export default {
    name: 'GlossMod',
}
</script>
<style lang='less' scoped></style>