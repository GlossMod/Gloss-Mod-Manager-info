<script lang='ts' setup>

import CollectList from '@/views/User/CollectList.vue'
const user = useUser()

user.getCollectList()

</script>
<template>
    <v-card>
        <v-card-title class="title">收藏列表 <small>({{ user.collect.count }})</small> </v-card-title>
        <v-card-text class="collect">
            <v-row v-if="user.collect.list.length > 0">
                <v-col cols="12" v-for="item in user.collect.list">
                    <CollectList :item="item"></CollectList>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-row>
                <v-col>
                    <v-pagination v-model="user.collect.page" :length="user.collectLength"
                        @update:model-value="user.getCollectList"></v-pagination>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'UserCollect',
}
</script>
<style lang='less' scoped>
.title {
    small {
        opacity: .5;
    }
}

.collect {
    // 添加滚动条
    overflow-y: auto;
    height: calc(100vh - 220px)
}
</style>