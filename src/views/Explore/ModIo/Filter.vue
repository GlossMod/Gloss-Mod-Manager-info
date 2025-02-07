<script lang='ts' setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';


const modio = useModIo()
const { t } = useI18n()

let order_filter = computed(() => [
    { text: t('Subscribers'), value: 'subscribers' },
    { text: t('Rating'), value: 'rating' },
    { text: t('Downloads'), value: 'downloads' },
    { text: t('Likes'), value: 'popular' },
])

if (modio.gameTags.length === 0) {
    modio.getGameTags()
}

const gameTags = computed(() => {
    // console.log(modio.gameTags);

    let tags = modio.gameTags.map((item: any) => {
        return {
            text: t(item),
            value: item,
        }
    })

    return [{ text: t('All'), value: '' }, ...tags]
})

</script>
<template>
    <v-row class="filter">
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Sort')" v-model="modio.filter.sort_by" :items="order_filter"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
        <v-col cols="12" sm="4" md="2">
            <v-select hide-details="auto" :label="t('Game Type')" v-model="modio.filter.tags" :items="gameTags"
                item-title="text" item-value="value" variant="solo"></v-select>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'Filter',
}
</script>
<style lang='less' scoped></style>