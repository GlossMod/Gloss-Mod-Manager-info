<script lang='ts' setup>

import { computed } from "vue";
import ExploreContentCarousel from "@/views/Explore/GlossMod/Content/Carousel.vue";
import ExploreContentInfo from "@/views/Explore/GlossMod/Content/Info.vue";
import Breadcrumbs from "@/components/Model/Breadcrumbs.vue"
const content = useContent()

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
        text: content.modData?.mods_title || "",
        href: { name: 'GlossModContent', params: { modId: content.modData?.id } },
        disabled: true
    },
])

</script>
<template>
    <v-row>
        <Breadcrumbs :items="items"></Breadcrumbs>
        <v-col cols="12" class="title">
            <h1>{{ content.modData?.mods_title }}</h1>
        </v-col>
        <v-col cols="12" md="6">
            <ExploreContentCarousel></ExploreContentCarousel>
        </v-col>
        <v-col cols="12" md="6">
            <ExploreContentInfo></ExploreContentInfo>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ExploreContentHeader',
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