<script lang='ts' setup>

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const nexusMods = useNexusMods()

let order_filter = computed(() => [
    { text: t('Default'), value: 'lastupdate' },
    { text: t('Downloads'), value: 'OLD_downloads' },
    { text: t('Likes'), value: 'OLD_endorsements' },
    { text: t('Newest'), value: 'date' },
])

let time_filter = computed(() => [
    { text: t('All'), value: null },
    { text: t('Today'), value: 1 },
    { text: t('7 Days'), value: 7 },
    { text: t('30 Days'), value: 30 },
    { text: t('3 Months'), value: 90 },
])
</script>
<template>
    <v-row class="filter">
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Update time')" v-model="nexusMods.time" :items="time_filter"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Sort')" v-model="nexusMods.sort_by" :items="order_filter"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'NexusModsFilter',
}
</script>
<style lang='less' scoped></style>