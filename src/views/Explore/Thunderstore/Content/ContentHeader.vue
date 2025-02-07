<script lang='ts' setup>
import { computed } from 'vue'
import Breadcrumbs from "@/components/Model/Breadcrumbs.vue"
import ContentInfo from "@/views/Explore/Thunderstore/Content/ContentInfo.vue"
const thunderstore = useThunderstore()
const { lazy_img } = useMain()

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
        text: thunderstore.selected.data?.name || "",
        href: {
            name: 'ThunderstoreModsContent',
            params: {
                namespace: thunderstore.selected.data?.owner ?? "",
                name: thunderstore.selected.data?.name ?? "",
                version: thunderstore.selected.data?.latest?.version_number ?? "1.0"
            }
        },
        disabled: true
    },
])

</script>
<template>
    <v-row v-if="thunderstore.selected.data">
        <Breadcrumbs :items="items"></Breadcrumbs>
        <v-col cols="12" class="title">
            <h1>{{ thunderstore.selected.data.name }}</h1>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-img :lazy-src="lazy_img" :src="thunderstore.selected.data.latest?.icon"></v-img>
        </v-col>
        <v-col cols="12" sm="6" md="9">
            <ContentInfo></ContentInfo>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'ContentHeader',
}
</script>
<style lang='less' scoped></style>