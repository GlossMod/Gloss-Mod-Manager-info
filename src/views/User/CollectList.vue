<script lang='ts' setup>

import { computed } from 'vue';
const props = defineProps<{
    item: IMod,
}>()

let image = computed(() => {
    if (props.item.mods_image_url) return `https://mod.3dmgame.com${props.item.mods_image_url}`
    else return `https://mod.3dmgame.com${props.item.game_imgUrl}`
})

</script>
<template>
    <v-row>
        <v-col cols="4">
            <router-link :to="`/Explore/GlossMod/${props.item.id}`">
                <v-img :src="image"></v-img>
            </router-link>
        </v-col>
        <v-col cols="8">
            <v-row dense>
                <v-col cols="12" class="title"> <router-link :to="`/Explore/GlossMod/${props.item.id}`">
                        {{ props.item.mods_title }}</router-link></v-col>
                <v-col cols="12" class="desc">{{ props.item.mods_desc ?? "暂无介绍" }}</v-col>
                <v-col cols="12">{{ `${props.item.game_name}->${props.item.mods_type_name}` }}</v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'CollectList',
}
</script>
<style lang='less' scoped>
.title {
    // 显示1行 溢出显示省略号
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    a {
        // 移除下划线
        text-decoration: none;
        color: unset;

        &:hover {
            opacity: .7;
        }
    }
}

.desc {
    opacity: 0.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

}
</style>