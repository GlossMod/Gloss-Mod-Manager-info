<script lang='ts' setup>

import { computed } from 'vue';
import ContentInfo from "@/views/Explore/ModIo/Content/ContentInfo.vue"
import Breadcrumbs from "@/components/Model/Breadcrumbs.vue"
const modio = useModIo()

let items = computed(() => [
    {
        text: 'Home',
        href: '/',
    },
    {
        text: 'Tour',
        href: '/explore',
    },
    {
        text: modio.selected.data?.name || "",
        href: { name: 'ModIoModsContent', params: { modId: modio.selected.data?.id || 0 } },
        disabled: true
    },
])

let images = computed(() => {
    let images = modio.selected.data?.media.images

    let logo = modio.selected.data?.logo

    return images ? [logo, ...images] : [logo]
})

</script>
<template>
    <v-row>
        <Breadcrumbs :items="items"></Breadcrumbs>
        <v-col cols="12" class="title">
            <h1>{{ modio.selected.data?.name }}</h1>
        </v-col>
        <v-col cols="12" md="6">
            <v-carousel cycle height="290" hide-delimiter-background show-arrows="hover" interval="2000">
                <v-carousel-item v-for="item in images" :key="item?.filename" cover
                    :src="item?.thumb_1280x720"></v-carousel-item>
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
    h1 {
        font-size: 1.4rem;
        text-align: center;
    }
}
</style>