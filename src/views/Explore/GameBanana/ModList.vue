<script lang='ts' setup>

import { computed } from 'vue';
import DownloadBtn from '@/views/Explore/GameBanana/DownloadBtn.vue'
const props = defineProps<{
    mod: IGameBananaMod
}>()

const { lazy_img, getNumber } = useMain()

const logo = computed(() => {
    let { _sBaseUrl, _sFile530 } = props.mod._aPreviewMedia._aImages[0]

    return `${_sBaseUrl}/${_sFile530}`
})

</script>
<template>
    <v-card class="mod">
        <router-link :to="{ name: 'GameBananaContent', params: { GameBananaModId: mod._idRow } }">
            <v-img :class="{ vague: mod._sInitialVisibility != 'show' }" cover :lazy-src="lazy_img"
                :aspect-ratio="16 / 9" :src="logo"></v-img>
        </router-link>
        <v-card-title class="mod-title" :title="mod._sName">
            <router-link :to="{ name: 'GameBananaContent', params: { GameBananaModId: mod._idRow } }">
                {{ mod._sName }}
            </router-link>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="6" class="Submitter" :title="mod._aSubmitter._sName">
                    <a :href="mod._aSubmitter._sProfileUrl" target="_blank">
                        <v-avatar :image="mod._aSubmitter._sAvatarUrl" size="20"></v-avatar>
                        {{ mod._aSubmitter._sName }}
                    </a>
                </v-col>
                <v-col cols="6" class="Category" :title="mod._aRootCategory._sName">
                    <a :href="mod._aRootCategory._sProfileUrl" target="_blank">
                        <v-avatar :image="mod._aRootCategory._sIconUrl" size="20"></v-avatar>
                        {{ mod._aRootCategory._sName }}
                    </a>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
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

    .vague {
        filter: blur(5px);
    }

    .Submitter,
    .Category {
        // 禁用换行 多余内容...显示
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>