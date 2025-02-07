<script lang='ts' setup>

import { ElMessageBox, ElSwitch } from 'element-plus';
import { h, ref } from 'vue'


import DownloadAddTask from '@/views/Download/AddTask/AddTask.vue'
const download = useDownload()
const settings = useSettings()
const manager = useManager()

let delFile = ref(true)

function allDel() {
    ElMessageBox({
        title: '删除任务?',
        // Should pass a function if VNode contains dynamic props
        message: () => h(ElSwitch, {
            modelValue: delFile.value,
            'onUpdate:modelValue': (val: boolean | string | number) => {
                delFile.value = val as boolean
            },
            'inactive-text': '同时删除本地文件'
        }),
    }).then(() => {
        if (delFile.value) {
            const modStorage = `${settings.settings.modStorageLocation}\\cache`
            FileHandler.deleteFolder(modStorage)
        }
        download.downloadTaskList = []
    }).catch(() => { })
}

function openFolder() {
    const modStorage = `${settings.settings.modStorageLocation}\\cache`
    FileHandler.openFolder(modStorage)
}

function allInstell() {
    download.downloadTaskList.forEach(item => {
        manager.addModByTask(item)
    })
}

</script>
<template>
    <v-app-bar :elevation="0">
        <v-container fluid>
            <v-row>
                <v-col cols="12" class="top">
                    <div class="left">
                        <h1>
                            {{ $t('Download Manager') }}
                            <small>({{ $t('{0} tasks', [download.downloadTaskList.length]) }})</small>
                        </h1>
                    </div>
                    <div class="right">
                        <v-text-field density="compact" variant="solo" :label="$t('Search task')"
                            append-inner-icon="mdi-magnify" single-line hide-details
                            v-model="download.searchName"></v-text-field>
                        <DownloadAddTask></DownloadAddTask>
                        <v-menu open-on-hover>
                            <template v-slot:activator="{ props }">
                                <v-btn variant="text" v-bind="props">
                                    <v-icon>mdi-menu</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item append-icon="mdi-folder-open-outline" @click="openFolder"
                                    :title="$t('Open Folder')"></v-list-item>
                                <v-list-item append-icon="mdi-download" @click="allInstell"
                                    :title="$t('Add All')"></v-list-item>
                                <v-list-item append-icon="mdi-trash-can-outline" @click="allDel"
                                    :title="$t('Delete All')"></v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
    <v-app-bar :elevation="0">
        <v-container fluid>
            <v-row class="header">
                <v-col cols="12">
                    <v-chip-group v-model="download.tab" mandatory>
                        <v-chip label variant="text" :value="'all'">{{ $t('All') }}</v-chip>
                        <v-chip label variant="text" :value="'active'">{{ $t('Downloading') }}</v-chip>
                        <v-chip label variant="text" :value="'paused'">{{ $t('Paused') }}</v-chip>
                        <v-chip label variant="text" :value="'complete'">{{ $t('Completed') }}</v-chip>
                        <v-chip label variant="text" :value="'error'">{{ $t('Waiting/Failure') }}</v-chip>
                    </v-chip-group>
                    <!-- <v-chip label variant="text" @click="test">测试</v-chip> -->
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script lang='ts'>

export default {
    name: 'DownloadHeader',
}
</script>
<style lang='less' scoped>
.top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
        h1 {
            font-size: 1.2rem;

            small {
                opacity: 0.7;
            }
        }
    }

    .right {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
    }

}
</style>