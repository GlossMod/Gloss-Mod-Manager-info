<script lang='ts' setup>

import { computed } from "vue";


import ModIoDownloadBtn from "@/views/Explore/ModIo/DownloadBtn.vue"
const prop = defineProps<{
    mod: IModIo
}>()

const { lazy_img, getNumber } = useMain()

// date_updated:1699813646
// 格式化 为 2023-09-14 06:59:03
let time = computed(() => new Date(prop.mod.date_updated * 1000).toLocaleString())

</script>
<template>
    <v-card class="mod">

        <router-link :to="{ name: 'ModIoModsContent', params: { modId: mod.id } }" :title="mod.summary">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="16 / 9" :src="mod.logo.thumb_640x360"></v-img>
        </router-link>
        <v-card-title :title="mod.name">
            <router-link :to="{ name: 'ModIoModsContent', params: { modId: mod.id } }" :title="mod.summary">
                {{ mod.name }}
            </router-link>
        </v-card-title>
        <v-card-subtitle>
            <v-row>
                <v-col cols="12" class="mod-data-time" :title="mod.date_updated">
                    <v-icon icon="mdi-clock-outline" /> {{ time }}
                </v-col>
                <v-col cols="4" :title="mod.stats.downloads_total">
                    <v-icon icon="mdi-download-outline" /> {{ getNumber(mod.stats.downloads_total) }}
                </v-col>
                <v-col cols="4" :title="mod.stats.ratings_total">
                    <v-icon icon="mdi-thumb-up" /> {{ getNumber(mod.stats.ratings_total) }}
                </v-col>
                <v-col cols="4" :title="mod.stats.subscribers_total">
                    <v-icon icon="mdi-heart-outline" /> {{ getNumber(mod.stats.subscribers_total) }}
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-actions class="flex-row-reverse">
            <ModIoDownloadBtn :mod="mod"></ModIoDownloadBtn>
        </v-card-actions>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ModList',
}
</script>
<style lang='less' scoped>
.mod {
    a {
        text-decoration: none;
        color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));

        &:hover {
            opacity: .8;
        }
    }

    .mod-data-time {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>