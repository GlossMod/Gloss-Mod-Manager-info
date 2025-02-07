<script lang='ts' setup>
import AppHeader from '@/components/base/AppHeader.vue'
import LeftMenu from '@/components/base/LeftMenu.vue'
import Global from '@/components/base/Global.vue'
</script>
<template>
    <v-card>
        <v-layout>
            <Global></Global>
            <AppHeader></AppHeader>
            <LeftMenu></LeftMenu>
            <v-main style="min-height: 100vh;">
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang='ts'>

export default {
    name: 'App',
}
</script>
<style lang='less' scoped>
.common-layout {
    .main {
        margin-top: 40px;
        max-height: calc(100vh - 50px);
        overflow: hidden;
    }
}
</style>