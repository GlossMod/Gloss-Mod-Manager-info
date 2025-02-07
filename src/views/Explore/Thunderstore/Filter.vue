<script lang='ts' setup>

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const thunderstore = useThunderstore()
const { t } = useI18n()

let order_filter = computed(() => [
    { text: t('Default'), value: 'Default' },
    { text: t('Lastupdate'), value: 'lastupdate' },
    { text: t('Downloads'), value: 'downloads' },
    { text: t('Likes'), value: 'Likes' },
])

let time_filter = computed(() => [
    { text: t('All'), value: 'All' },
    { text: t('Today'), value: 'Today' },
    { text: t('7 Days'), value: '7Today' },
    { text: t('30 Days'), value: '30Today' },
    { text: t('3 Months'), value: '90Today' },
])

// console.log(thunderstore.categories);

</script>
<template>
    <v-row class="filter">
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Update time')" v-model="thunderstore.filter.time"
                :items="time_filter" item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Sort')" v-model="thunderstore.filter.sort_by" :items="order_filter"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Categories')" v-model="thunderstore.filter.categories"
                :items="['All', ...thunderstore.categories]" variant="solo"></v-select>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ThunderstoreFilter',
}
</script>
<style lang='less' scoped></style>