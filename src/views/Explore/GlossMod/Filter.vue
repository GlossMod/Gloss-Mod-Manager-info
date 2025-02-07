<script lang='ts' setup>

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const explore = useExplore()
const settings = useSettings()
const { t } = useI18n()

if (settings.settings.managerGame) {
    explore.getGameType()
}

let original_filter = computed(() => [
    { text: t('All'), value: 0 },
    { text: t('Essence'), value: 4 },
    { text: t('Original'), value: 1 },
    { text: t('Fanworks'), value: 2 },
    { text: t('Translation'), value: 3 },
])
let time_filter = computed(() => [
    { text: t('All'), value: 0 },
    { text: t('Today'), value: 1 },
    { text: t('7 Days'), value: 2 },
    { text: t('30 Days'), value: 3 },
    { text: t('3 Months'), value: 4 },
])
let order_filter = computed(() => [
    { text: t('Default'), value: 0 },
    { text: t('Views'), value: 1 },
    { text: t('Downloads'), value: 2 },
    { text: t('Likes'), value: 3 },
    { text: t('Favorites'), value: 4 },
    { text: t('Newest'), value: 5 },
])

let mod_types = computed(() => {
    let list = [
        { text: t('All'), value: 0 },
        ...explore.gameTypeList
    ]
    return list
})

</script>
<template>
    <v-row class="filter">
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Type of creation')" v-model="explore.original"
                :items="original_filter" item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Update time')" v-model="explore.time" :items="time_filter"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Sort')" v-model="explore.order" :items="order_filter"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2" v-if="settings.settings.managerGame">
            <v-select hide-details="auto" :label="t('Game Type')" v-model="explore.gameType" :items="mod_types"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ExploreFilter',
}
</script>
<style lang='less' scoped></style>