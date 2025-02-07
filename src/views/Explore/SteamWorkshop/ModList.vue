<script lang='ts' setup>


import { computed } from 'vue';
const prop = defineProps<{
    mod: ISteamWorkshopItem
}>()

const { lazy_img, getNumber } = useMain()
// const steamWorkshop = useSteamWorkshop()

const time = computed(() => {
    // 时间戳 time_updated: 1710596138 转换为 2024-11-14 06:55:38
    return new Date(prop.mod.time_updated * 1000).toLocaleString()
})

function open() {
    window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${prop.mod.publishedfileid}`)
}

</script>
<template>
    <v-card class="mod">

        <!-- <router-link :to="{ name: 'SteamWorkshop', params: { workshopId: mod.publishedfileid } }" :title="mod.title">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="16 / 9"
                :src="`${mod.preview_url}?imw=200&imh=200&ima=fit&impolicy=Letterbox`"></v-img>
        </router-link> -->

        <a :href="`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.publishedfileid}`" target="_blank">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="16 / 9"
                :src="`${mod.preview_url}?imw=200&imh=200&ima=fit&impolicy=Letterbox`"></v-img>
        </a>

        <v-card-title :title="mod.title">
            <router-link :to="{ name: 'SteamWorkshop', params: { workshopId: mod.publishedfileid } }"
                :title="mod.title">
                {{ mod.title }}
            </router-link>
        </v-card-title>
        <v-card-subtitle>
            <v-row>
                <v-col cols="12" class="mod-data-time" :title="time">
                    <v-icon icon="mdi-clock-outline" /> {{ time }}
                </v-col>
                <v-col cols="4" :title="mod.subscriptions">
                    <v-icon icon="mdi-download-outline" /> {{ getNumber(mod.subscriptions) }}
                </v-col>
                <v-col cols="4" :title="mod.views">
                    <v-icon icon="mdi-eye-outline" /> {{ getNumber(mod.views) }}
                </v-col>
                <v-col cols="4" :title="mod.favorited">
                    <v-icon icon="mdi-heart-outline" /> {{ getNumber(mod.favorited) }}
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-actions class="flex-row-reverse">
            <!-- <ModIoDownloadBtn :mod="mod"></ModIoDownloadBtn> -->
            <v-btn @click="open">打开</v-btn>
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