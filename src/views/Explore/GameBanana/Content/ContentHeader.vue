<script lang='ts' setup>
import Breadcrumbs from "@/components/Model/Breadcrumbs.vue"
import { computed, ref } from "vue";
import ContentInfo from '@/views/Explore/GameBanana/Content/ContentInfo.vue'
const gamebanana = useGameBanana()
const imgViewerVisible = ref(false)
const viewer_index = ref(0)

const items = computed(() => [
    {
        text: 'Home',
        href: '/',
    },
    {
        text: 'Tour',
        href: '/explore',
    },
    {
        text: gamebanana.modData?._sName || '',
        href: { name: 'GameBananaContent', params: { GameBananaModId: gamebanana.modData?._idRow || 0 } },
        disabled: true
    },
])

const images = computed(() => {
    if (gamebanana.modData) {
        return gamebanana.modData._aPreviewMedia._aImages.map((item) => `${item._sBaseUrl}/${item._sFile}`)
        // return images ? [logo, ...images] : [logo]
    } else {
        return []
    }
})

function viewer(index: number) {
    imgViewerVisible.value = true
    viewer_index.value = index
}

</script>
<template>
    <v-row>
        <Breadcrumbs :items="items"></Breadcrumbs>
        <v-col cols="12">
            <h1 class="title">{{ gamebanana.modData?._sName }}</h1>
        </v-col>
        <v-col cols="12" md="6">
            <v-carousel cycle height="290" hide-delimiter-background show-arrows="hover" interval="2000">
                <v-carousel-item v-for="(item, index) in images" :key="index" cover :src="item" @click="viewer(index)">
                </v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col cols="12" md="6">
            <ContentInfo></ContentInfo>
        </v-col>
        <Teleport to="#app">
            <el-image-viewer v-if="imgViewerVisible" :url-list="images" :initial-index="viewer_index"
                @close="imgViewerVisible = false"></el-image-viewer>
        </Teleport>

    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ContentHeader',
}
</script>
<style lang='less' scoped>
.title {
    text-align: center;
}
</style>