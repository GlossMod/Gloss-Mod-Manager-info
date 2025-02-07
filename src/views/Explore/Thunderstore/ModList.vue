<script lang='ts' setup>

import { computed } from "vue";
import ThunderstoreDownloadBtn from '@/views/Explore/Thunderstore/DownloadBtn.vue'
const props = defineProps<{
    mod: IThunderstoreMod
}>()

const { lazy_img } = useMain()

// mod.date_updated = 2023-09-14T06:59:03.293588Z
// 格式化 为 2023-09-14 06:59:03
let time = props.mod.date_updated.split('T')[0] + ' ' + props.mod.date_updated.split('T')[1].split('.')[0]

const to = computed(() => {
    return {
        name: 'ThunderstoreModsContent',
        params: {
            namespace: props.mod.owner,
            name: props.mod.name,
            version: props.mod.versions[0].version_number
        }
    }
})

</script>
<template>
    <v-card class="mod" v-if="mod">
        <RouterLink :to="to">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="1 / 1" :src="mod.versions[0].icon"></v-img>
        </RouterLink>
        <v-card-title :title="mod.name">
            <RouterLink :to="to">
                {{ mod.name }}
            </RouterLink>
        </v-card-title>
        <v-card-subtitle>
            <v-row>
                <v-col cols="12" class="mod-data-time" :title="mod.date_updated">
                    <v-icon icon="mdi-clock-outline" /> {{ time }}
                </v-col>
                <v-col cols="6">
                    <v-icon icon="mdi-download-outline" /> {{ mod.versions[0].downloads }}
                </v-col>
                <v-col cols="6">
                    <v-icon icon="mdi-thumb-up" /> {{ mod.rating_score }}
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-actions class="flex-row-reverse">
            <ThunderstoreDownloadBtn :mod="mod"></ThunderstoreDownloadBtn>
        </v-card-actions>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ThunderstoreModList',
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