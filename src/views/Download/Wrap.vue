<script lang='ts' setup>

import DownloadHeader from '@/views/Download/Header.vue'
import DownloadTasks from '@/views/Download/Tasks.vue'

import { computed } from "vue";
const download = useDownload()

let list = computed(() => {
    let tab = download.tab
    if (tab == "all") return download.downloadTaskList.filter(item => {
        return (item.name.includes(download.searchName))
    })
    return download.downloadTaskList.filter(item => {
        return (item.status == tab && item.name.includes(download.searchName))
    })
})

</script>
<template>
    <v-card>
        <v-card-text>
            <DownloadHeader></DownloadHeader>
            <v-row v-if="download.downloadTaskList.length > 0">
                <v-col cols="12" v-for="item in list" :key="item.gid">
                    <DownloadTasks :task="(item as IDownloadTask)"></DownloadTasks>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12" class="empty">
                    {{ $t('No download tasks available at the moment.') }}
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'DownloadWrap',
}
</script>
<style lang='less' scoped>
.empty {
    text-align: center;
    opacity: 0.7;
    display: flex;
    height: 400px;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 600;
}
</style>