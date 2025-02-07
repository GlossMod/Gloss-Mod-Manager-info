<script lang='ts' setup>

import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import ContentHeader from '@/views/Explore/CurseForge/Content/ContentHeader.vue'
import Markdown from '@/components/Model/Markdown.vue'
const route = useRoute()
const curseforge = useCurseForge()

const CurseForgeModId = computed(() => {
    return route.params.CurseForgeModId
})

curseforge.GetModDataById(CurseForgeModId.value as string)

const Description = ref('')

async function getDescription() {
    Description.value = await curseforge.GetModDescription(CurseForgeModId.value as string)
}

getDescription()

</script>
<template>
    <v-card>
        <v-card-text v-if="curseforge.modData">
            <ContentHeader></ContentHeader>

            <v-card>
                <v-card-title>{{ $t('Summary') }}</v-card-title>
                <v-card-text>
                    <Markdown :text="curseforge.modData.summary"></Markdown>
                </v-card-text>
            </v-card>
            <v-card>
                <v-card-title>{{ $t('Description') }}</v-card-title>
                <v-card-text>
                    <Markdown :text="Description"></Markdown>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
    <div class="back-btn">
        <v-btn icon="mdi-arrow-u-left-top-bold" @click="$router.back"></v-btn>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'Content',
}
</script>
<style lang='less' scoped></style>