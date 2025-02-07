<script lang='ts' setup>

import { useRoute } from 'vue-router';
import ContentHeader from '@/views/Explore/GameBanana/Content/ContentHeader.vue'
import { computed } from 'vue';
import Markdown from '@/components/Model/Markdown.vue'
const gamebanana = useGameBanana()
const route = useRoute()

const id = computed<string>(() => {
    return route.params.GameBananaModId as string
})

gamebanana.GetModData(id.value)

</script>
<template>
    <v-card>
        <v-card-text v-if="gamebanana.modData">
            <ContentHeader></ContentHeader>
            <v-card>
                <v-card-title>{{ $t('Summary') }}</v-card-title>
                <v-card-text>
                    <Markdown :text="gamebanana.modData._sText || ''"></Markdown>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'Content',
}
</script>
<style lang='less' scoped></style>