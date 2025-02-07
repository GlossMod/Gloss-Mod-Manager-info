<script lang='ts' setup>

import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const curseForge = useCurseForge()
const { t } = useI18n()

/**
 * 1=Featured
2=Popularity
3=LastUpdated
4=Name
5=Author
6=TotalDownloads
7=Category
8=GameVersion
9=EarlyAccess
10=FeaturedReleased
11=ReleasedDate
12=Rating
 */
const order_filter = computed(() => [
    { text: t('Featured'), value: 1 },
    { text: t('Popularity'), value: 2 },
    { text: t('Update time'), value: 3 },
    { text: t('Name'), value: 4 },
    { text: t('Author'), value: 5 },
    { text: t('Download count'), value: 6 },
    { text: t('Category'), value: 7 },
    { text: t('GameVersion'), value: 8 },
    { text: t('EarlyAccess'), value: 9 },
    { text: t('FeaturedReleased'), value: 10 },
    { text: t('Release time'), value: 11 },
    { text: t('Rating'), value: 12 },
])

function GetFilter() {
    curseForge.page = 1
    curseForge.GetModList()
}

</script>
<template>
    <v-row class="filter">
        <v-col cols="12" md="3">
            <v-select hide-details="auto" :label="t('Sort')" v-model="curseForge.sortField" :items="order_filter"
                @update:modelValue="GetFilter" item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'Filter',
}
</script>
<style lang='less' scoped></style>