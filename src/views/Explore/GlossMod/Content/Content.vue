<script lang='ts' setup>
import { useRoute } from 'vue-router';
import ExploreContentHeader from "@/views/Explore/GlossMod/Content/Header.vue";
import Markdown from '@/components/Model/Markdown.vue'
const content = useContent()
const route = useRoute()

if (parseInt(route.params.modId as string) != content.modData?.id) {
    content.getModDataByID(parseInt(route.params.modId as string));
}

</script>
<template>
    <v-card v-if="content.modData" :loading="content.loading">
        <v-card-text>
            <ExploreContentHeader></ExploreContentHeader>
            <v-row>
                <v-col cols="12">
                    <Markdown :text="content.modData.mods_content"></Markdown>
                </v-col>
            </v-row>
            <div class="back-btn">
                <v-btn icon="mdi-arrow-u-left-top-bold" @click="$router.back"></v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ExploreContent',
}
</script>
<style lang='less' scoped></style>