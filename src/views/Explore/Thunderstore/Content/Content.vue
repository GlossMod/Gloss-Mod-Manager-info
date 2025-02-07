<script lang='ts' setup>
import { useRoute } from 'vue-router'
import ContentHeader from "@/views/Explore/Thunderstore/Content/ContentHeader.vue"
import Markdown from '@/components/Model/Markdown.vue'
const route = useRoute()

const thunderstore = useThunderstore()

let { namespace, name, version } = route.params

async function GetData() {
    // 获取数据
    thunderstore.selected.data = await thunderstore.getModData(namespace as string, name as string)
    // 获取说明
    thunderstore.getReadme(namespace as string, name as string, version as string)
}
GetData()

</script>
<template>
    <v-card :loading="!thunderstore.selected.data">
        <v-card-text v-if="thunderstore.selected.data">
            <ContentHeader></ContentHeader>
            <v-card>
                <v-card-title>Readme</v-card-title>
                <v-card-text>
                    <Markdown :text="thunderstore.selected.readme"></Markdown>
                </v-card-text>
            </v-card>
            <div class="back-btn">
                <v-btn icon="mdi-arrow-u-left-top-bold" @click="$router.back"></v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'Content',
}
</script>
<style lang='less' scoped></style>