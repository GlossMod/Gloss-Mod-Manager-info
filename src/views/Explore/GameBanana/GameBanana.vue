<script lang='ts' setup>


import Filter from '@/views/Explore/GameBanana/Filter.vue'
import ModList from '@/views/Explore/GameBanana/ModList.vue'
const gamebanana = useGameBanana()
gamebanana.GetModList()

function search() {
    gamebanana._nPage = 1
    gamebanana.GetModList()
}

</script>
<template>
    <Search>
        <v-text-field v-model="gamebanana._sName" class="search-input "
            :placeholder="$t('You can search for what you want here')" variant="underlined" @keydown.enter="search"
            append-inner-icon="mdi-magnify" @click:append-inner="search">
        </v-text-field>
    </Search>
    <Filter></Filter>
    <v-card :loading="gamebanana.loading">
        <v-card-text>
            <v-row v-if="gamebanana.mods.length > 0 && !gamebanana.loading">
                <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in gamebanana.mods"
                    :key="item._idRow">
                    <ModList :mod="item"></ModList>
                </v-col>
                <v-col cols="12">
                    <v-pagination v-model="gamebanana._nPage" :length="gamebanana.totalPage"
                        @update:modelValue="gamebanana.GetModList" class="d-flex justify-center"></v-pagination>
                </v-col>
            </v-row>
            <v-row v-else-if="!gamebanana.loading">
                <v-col cols="12">
                    <el-empty :description="$t('No content yet~')" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'GameBanana',
}
</script>
<style lang='less' scoped></style>