<script lang='ts' setup>


import DownloadBtn from '@/views/Explore/NexusMods/DownloadBtn.vue'
const props = defineProps<{
    mod: IMod
}>()
const { lazy_img } = useMain()
const settings = useSettings()

let url = `https://www.nexusmods.com/${settings.settings.managerGame?.NexusMods?.game_domain_name}/mods/${props.mod.id}`

</script>
<template>
    <v-card class="mod">
        <a :href="url" :title="mod.mods_desc">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="100 / 56" :src="mod.mods_image_url"></v-img>
        </a>
        <v-card-title :title="mod.mods_title">
            <a :href="url">
                {{ mod.mods_title }}
            </a>
        </v-card-title>
        <v-card-subtitle>
            <v-row class="mod-data">
                <v-col cols="8" class="mod-data-time" :title="mod.mods_updateTime">
                    <v-icon icon="mdi-clock-outline" /> {{ mod.mods_updateTime }}
                </v-col>
                <v-col cols="4" class="mod-data-info">
                    <!-- <span v-if="explore.order == 2">
                        <v-icon icon="mdi-download" /> {{ getNumber(mod.mods_download_cnt) }}
                    </span>
                    <span v-else-if="explore.order == 3">
                        <v-icon icon="mdi-thumb-up-outline" /> {{ getNumber(mod.mods_mark_cnt) }}
                    </span> -->
                    <span>
                        <v-icon icon="mdi-eye-outline" /> {{ mod.mods_click_cnt }}
                    </span>
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-actions class="flex-row-reverse">
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
    position: relative;

    .vague {
        // 高斯模糊
        -webkit-filter: blur(10px);
        /* Chrome, Opera */
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
    }

    a {
        text-decoration: none;
        color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));

        &:hover {
            opacity: .8;
        }
    }

    .mod-user {
        position: relative;

        .mod-user-avatar {
            position: absolute;
            right: 15px;
            top: -25px;
            padding: 0.5rem;
            background: rgb(var(--v-theme-background));
            border-radius: 50%;
        }
    }

    .mod-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mod-game {
        display: flex;
        align-items: center;
        font-size: 0.8rem;

        .mod-game-name {
            max-width: 60%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .mdi {
            margin-right: .5rem;
        }

        span {
            margin: 0 .5rem;
        }
    }

    .mod-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.6rem;

        .mod-data-info {
            display: flex;
            align-items: center;
            justify-content: space-around;
        }

        .mod-data-time {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

}
</style>