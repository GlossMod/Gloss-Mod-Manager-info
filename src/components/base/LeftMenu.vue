<script lang='ts' setup>

import { useI18n } from "vue-i18n";
import { computed } from "vue";
import AutoUpdate from "@/components/AutoUpdate/AutoUpdate.vue"
import BaseUser from "@/components/base/User.vue"
const { t } = useI18n()

let lists = computed(() => [
    {
        title: t("Home"),
        icon: "mdi-home",
        path: '/'
    },
    {
        title: t("Games"),
        icon: "mdi-gamepad-variant",
        path: '/Games'
    },
    {
        title: t("Manager"),
        icon: "mdi-select-group",
        path: '/Manager'
    },
    {
        title: t("Tour"),
        icon: "mdi-gamepad-circle",
        path: "/Explore"
    },
    {
        title: t("Download"),
        icon: "mdi-download",
        path: "/Download"
    },
    {
        title: t("Backup"),
        icon: "mdi-file-star-outline",
        path: '/Backup'
    },
    {
        title: t("Settings"),
        icon: "mdi-cog",
        path: '/Settings'
    },
    {
        title: t("About"),
        icon: "mdi-information-slab-circle-outline",
        path: '/about'
    },
])

const main = useMain()
const settings = useSettings()

function toTop() {
    // 返回顶部
    const currentScrollTop = document.documentElement.scrollTop;
    if (currentScrollTop > 0) {
        window.requestAnimationFrame(toTop);
        document.documentElement.scrollTop -= currentScrollTop / 8;
    }
}

function toBottom() {
    // 前往底部
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    document.documentElement.scrollTop = scrollHeight - clientHeight;

}

</script>
<template>
    <v-navigation-drawer v-model="main.leftMenu" :rail="settings.settings.leftMenuRail" permanent width="200"
        class="list">
        <v-list>
            <v-list-item v-for="item in lists" :key="item.path" :to="item.path" :prepend-icon="item.icon"
                :title="item.title">
            </v-list-item>
            <BaseUser></BaseUser>
        </v-list>
        <template v-slot:append>
            <v-list>
                <AutoUpdate></AutoUpdate>
                <v-list-item @click="toTop" prepend-icon="mdi-arrow-up-bold"></v-list-item>
                <v-list-item @click="toBottom" prepend-icon="mdi-arrow-down-bold"></v-list-item>
                <v-list-item @click="settings.settings.leftMenuRail = !settings.settings.leftMenuRail"
                    :prepend-icon="settings.settings.leftMenuRail ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'">
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>
<script lang='ts'>

export default {
    name: 'LeftMenu',
}
</script>
<style lang='less' scoped>
.list {
    overflow: hidden;
}
</style>