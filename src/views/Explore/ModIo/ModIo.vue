<script lang='ts' setup>
import { watch } from "vue";



import Filter from '@/views/Explore/ModIo/Filter.vue'
import ModList from '@/views/Explore/ModIo/ModList.vue'
import TurnPage from "@/views/Explore/ModIo/TurnPage.vue";
const modio = useModIo()
const settings = useSettings()
const explore = useExplore()

if (modio.modList.length == 0) {
    modio.getModList()
}

watch([
    () => modio.filter.sort_by,
    () => modio.filter.tags
]
    , () => {
        modio.search()
    })

watch(() => modio.page, () => {
    modio.getModList()
})

</script>
<template>
    <Search>
        <v-text-field v-model="modio.filter.searchText" class="search-input"
            :placeholder="$t('You can search for what you want here')" variant="underlined"
            append-inner-icon="mdi-magnify" @keydown.enter="modio.search" @click:append-inner="modio.search">
        </v-text-field>
    </Search>
    <Filter></Filter>
    <v-card :loading="modio.loading">
        <v-card-text>
            <v-row v-if="!settings.settings.managerGame && settings.settings.tourGameList.length == 0" class="empty">
                <div @click="explore.showTourGameListDialog = true" class="empty-hint">
                    {{ $t('Please select a game first') }} <v-icon>mdi-plus</v-icon>
                </div>
            </v-row>
            <v-row class="mod-wrap" v-else-if="modio.modList.length > 0 && !modio.loading">
                <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in modio.modList" :key="item.id">
                    <ModList :mod="item"></ModList>
                </v-col>
                <TurnPage></TurnPage>
            </v-row>
            <v-row v-else-if="!modio.loading">
                <v-col cols="12">
                    <el-empty :description="$t('No content yet~')" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>
<script lang='ts'>

export default {
    name: 'ModIo',
}
</script>
<style lang='less' scoped></style>