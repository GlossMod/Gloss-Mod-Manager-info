<script lang='ts' setup>


import DownloadBtn from '@/views/Explore/CurseForge/DownloadBtn.vue'
const props = defineProps<{
    mod: ICurseForgeMod
}>()

const { lazy_img, getNumber } = useMain()

</script>
<template>
    <v-card class="mod">
        <router-link :to="{ name: 'CurseForgeContent', params: { CurseForgeModId: mod.id } }">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="1 / 1" :src="mod.logo.thumbnailUrl"></v-img>
        </router-link>

        <v-card-title class="mod-title">
            <router-link :to="{ name: 'CurseForgeContent', params: { CurseForgeModId: mod.id } }">
                {{ mod.name }}
            </router-link>
        </v-card-title>
        <v-card-text>
            <v-row class="mod-data">
                <v-col cols="8" :title="mod.dateModified">
                    <v-icon icon="mdi-clock-outline" /> {{ new Date(mod.dateModified).toLocaleString() }}
                </v-col>
                <v-col cols="4" :title="mod.downloadCount">
                    <v-icon icon="mdi-download-outline" /> {{ getNumber(mod.downloadCount) }}
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="mod-download">
            <DownloadBtn :mod="mod"></DownloadBtn>
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

    .mod-title {
        font-size: 1rem;
    }

    .mod-data {
        opacity: 0.7;
        font-size: 0.6rem;
    }

    .mod-download {
        justify-content: flex-end;
    }
}
</style>