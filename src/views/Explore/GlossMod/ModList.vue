<script lang='ts' setup>
import { ref, computed } from "vue";


import DownloadBtn from "@/views/Explore/GlossMod/DownloadBtn.vue"
const props = defineProps<{
    mod: IMod
}>()
const explore = useExplore()
const { getNumber, lazy_img, host } = useMain()

let mod = ref<IMod>(props.mod);

// console.log('mod', mod.value);

let mod_img = computed(() => {
    let img = ''
    if (mod.value.mods_image_url) {
        img = host + mod.value.mods_image_url
    } else {
        img = host + mod.value.game_imgUrl
    }
    return img
})

</script>
<template>
    <v-card class="mod">
        <router-link :to="{ name: 'GlossModContent', params: { modId: mod.id } }" :title="mod.mods_desc">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="100 / 56" :src="mod_img"></v-img>
        </router-link>
        <!-- <a :href="`https://mod.3dmgame.com/mod/${mod.id}`" :title="mod.mods_desc">
            <v-img cover :lazy-src="lazy_img" :aspect-ratio="100 / 56" :src="mod_img"></v-img>
        </a> -->
        <v-card-title :title="mod.mods_title">
            <router-link :to="{ name: 'GlossModContent', params: { modId: mod.id } }" :title="mod.mods_desc">
                {{ mod.mods_title }}
            </router-link>
            <!-- <a :href="`https://mod.3dmgame.com/mod/${mod.id}`">{{ mod.mods_title }}</a> -->
        </v-card-title>
        <v-card-subtitle>
            <v-icon icon="mdi-microsoft-xbox-controller"></v-icon>
            <a :href="`https://mod.3dmgame.com/${mod.game_path}`" class="mod-game-name">
                {{ mod.game_name }}
            </a>
            <span> > </span>
            <a :href="`https://mod.3dmgame.com/${mod.game_path}/${mod.mods_type_id}`">
                {{ mod.mods_type_name }}
            </a>
        </v-card-subtitle>
        <v-card-subtitle>
            <v-row class="mod-data">
                <v-col cols="8" class="mod-data-time" :title="mod.mods_updateTime">
                    <v-icon icon="mdi-clock-outline" /> {{ mod.mods_updateTime }}
                </v-col>
                <v-col cols="4" class="mod-data-info">
                    <span v-if="explore.order == 2">
                        <v-icon icon="mdi-download" /> {{ getNumber(mod.mods_download_cnt) }}
                    </span>
                    <span v-else-if="explore.order == 3">
                        <v-icon icon="mdi-thumb-up-outline" /> {{ getNumber(mod.mods_mark_cnt) }}
                    </span>
                    <span v-else>
                        <v-icon icon="mdi-eye-outline" /> {{ getNumber(mod.mods_click_cnt) }}
                    </span>
                </v-col>
            </v-row>
        </v-card-subtitle>
        <v-card-actions class="flex-row-reverse">
            <DownloadBtn :id="mod.id" :size="mod.mods_resource_size"></DownloadBtn>
        </v-card-actions>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'ExploreModList',
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