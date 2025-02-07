<script lang='ts' setup>



import ModList from '@/views/Explore/CurseForge/ModList.vue'
import Filter from '@/views/Explore/CurseForge/Filter.vue'
const curseforge = useCurseForge()

if (curseforge.mods.length == 0) {
    curseforge.GetModList()
}

function search() {
    curseforge.page = 1
    curseforge.GetModList()
}

</script>
<template>
    <Search>
        <v-text-field v-model="curseforge.searchFilter" class="search-input "
            :placeholder="$t('You can search for what you want here')" variant="underlined" @keydown.enter="search"
            append-inner-icon="mdi-magnify" @click:append-inner="search">
        </v-text-field>
    </Search>
    <Filter></Filter>
    <v-card :loading="curseforge.loading">
        <v-card-text>
            <v-row v-if="curseforge.mods.length > 0 && !curseforge.loading">
                <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in curseforge.mods" :key="item.id">
                    <ModList :mod="item"></ModList>
                </v-col>
                <v-col cols="12">
                    <v-pagination v-model="curseforge.page" :length="curseforge.totalPage"
                        @update:modelValue="curseforge.GetModList" class="d-flex justify-center"></v-pagination>
                </v-col>
            </v-row>
            <v-row v-else-if="!curseforge.loading">
                <v-col cols="12">
                    <el-empty :description="$t('No content yet~')" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>
<script lang='ts'>

export default {
    name: 'CurseForge',
}
</script>
<style lang='less' scoped></style>