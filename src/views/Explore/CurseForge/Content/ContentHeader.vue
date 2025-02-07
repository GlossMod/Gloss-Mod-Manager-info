<script lang='ts' setup>
import Breadcrumbs from "@/components/Model/Breadcrumbs.vue"
import { computed } from "vue";
import ContentInfo from '@/views/Explore/CurseForge/Content/ContentInfo.vue'
const curseforge = useCurseForge()

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
        text: curseforge.modData?.name || '',
        href: { name: 'CurseForgeContent', params: { CurseForgeModId: curseforge.modData?.id || 0 } },
        disabled: true
    },
])

const images = computed(() => {
    if (curseforge.modData) {
        let images = curseforge.modData.screenshots

        let logo = curseforge.modData.logo

        return images ? [logo, ...images] : [logo]
    } else {
        return []
    }

})

</script>
<template>
    <v-row>
        <Breadcrumbs :items="items"></Breadcrumbs>
        <v-col cols="12">
            <h1 class="title">{{ curseforge.modData?.name }}</h1>
        </v-col>
        <v-col cols="12" md="6">
            <v-carousel cycle height="290" hide-delimiter-background show-arrows="hover" interval="2000">
                <v-carousel-item v-for="item in images" :key="item.id" cover :src="item.url"></v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col cols="12" md="6">
            <ContentInfo></ContentInfo>
        </v-col>
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