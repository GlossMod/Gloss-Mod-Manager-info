<script lang='ts' setup>

import { watch } from "vue";
import ThunderstoreModList from '@/views/Explore/Thunderstore/ModList.vue'
import ThunderstoreFilter from '@/views/Explore/Thunderstore/Filter.vue'
const thunderstore = useThunderstore()
const settings = useSettings()

if (thunderstore.modList?.length == 0) {
    thunderstore.getModList()
}

watch(() => settings.settings.managerGame?.gameName, () => {
    thunderstore.getModList()

})

watch(() => thunderstore.page, () => {
    window.scrollTo(0, 0);
})

</script>
<template>
    <Search>
        <v-text-field v-model="thunderstore.filter.searchText" class="search-input "
            :placeholder="$t('You can search for what you want here')" variant="underlined"
            append-inner-icon="mdi-magnify">
        </v-text-field>
    </Search>
    <ThunderstoreFilter></ThunderstoreFilter>
    <v-card :loading="thunderstore.loading">
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="6" md="3" xl="2" class="mod-list" v-for="item in thunderstore.modListFilter"
                    :key="item.uuid4">
                    <ThunderstoreModList :mod="item"> </ThunderstoreModList>
                </v-col>
                <v-col cols="12" class="turn-page">
                    <v-pagination v-model="thunderstore.page" :length="thunderstore.pageLength"></v-pagination>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'Thunderstore',
}
</script>
<style lang='less' scoped></style>