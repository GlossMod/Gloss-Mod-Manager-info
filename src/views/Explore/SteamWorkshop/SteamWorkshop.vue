<script lang='ts' setup>





import ModList from "@/views/Explore/SteamWorkshop/ModList.vue";
const steamWorkshop = useSteamWorkshop()
const settings = useSettings()
const explore = useExplore()

if (steamWorkshop.modList.length == 0) {
    steamWorkshop.getModList()
}

</script>
<template>
    <Search>
        <v-text-field v-model="steamWorkshop.filter.searchText" class="search-input"
            :placeholder="$t('You can search for what you want here')" variant="underlined"
            append-inner-icon="mdi-magnify" @keydown.enter="steamWorkshop.search"
            @click:append-inner="steamWorkshop.search">
        </v-text-field>
    </Search>
    <v-row v-if="!settings.settings.managerGame && settings.settings.tourGameList.length == 0" class="empty">
        <div @click="explore.showTourGameListDialog = true" class="empty-hint">
            {{ $t('Please select a game first') }} <v-icon>mdi-plus</v-icon>
        </div>
    </v-row>
    <v-row class="mod-wrap" v-else-if="steamWorkshop.modList.length > 0">
        <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in steamWorkshop.modList"
            :key="item.publishedfileid">
            <ModList :mod="item"></ModList>
        </v-col>
        <v-col cols="12" class="turn-page">
            <v-pagination v-model="steamWorkshop.page" :length="steamWorkshop.pageLength"
                @update:modelValue="steamWorkshop.getModList()"></v-pagination>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'SteamWorkshop',
}
</script>
<style lang='less' scoped></style>